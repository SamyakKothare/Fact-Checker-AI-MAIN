import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { FullFactCheckResponse, Fallacy, SourceTrace, Source, ScamAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TRUSTED_SOURCES_LIST = `
General Fact-Checking:
- snopes.com
- politifact.com
- factcheck.org
- apnews.com/hub/ap-fact-check
- reuters.com/fact-check
- factcheck.afp.com
- washingtonpost.com/news/fact-checker

Science & Health:
- sciencefeedback.co
- cochrane.org
- pubmed.ncbi.nlm.nih.gov
- who.int

Reference & News:
- wikipedia.org
- wikidata.org
- britannica.com
- scholar.google.com
- crossref.org
- apnews.com
- reuters.com
- bbc.com
- nytimes.com
- theguardian.com
`;

async function parseJsonResponse<T>(response: GenerateContentResponse): Promise<T> {
  let jsonString = response.text.trim();
  const match = jsonString.match(/```(json)?\s*([\s\S]*?)\s*```/);
  if (match && match[2]) {
    jsonString = match[2].trim();
  }

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Failed to parse JSON:", jsonString);
    throw new Error("The AI returned an invalid analysis. Please try a different query.");
  }
}

function getSources(response: GenerateContentResponse): Source[] {
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  const sources: Source[] = groundingChunks
    .map((chunk: any) => ({
      uri: chunk.web?.uri ?? '',
      title: chunk.web?.title ?? 'Untitled',
    }))
    .filter((source: Source) => source.uri);
  
  return Array.from(new Map(sources.map(s => [s.uri, s])).values());
}

export const checkFact = async (claim: string, image: {b64: string, mime: string} | null): Promise<{ response: FullFactCheckResponse, sources: Source[] }> => {
  const imagePart = image ? {
    inlineData: {
      mimeType: image.mime,
      data: image.b64
    }
  } : null;

  const textPart = {
    text: `You are a fact-checking expert. Verify the user's claim${image ? ' and the provided image' : ''}.

STRICT SEARCH PROTOCOL:
1. FIRST, search for this claim specifically within these trusted databases:
${TRUSTED_SOURCES_LIST}
2. If information is found in the sources above, base your verdict primarily on them.
3. ONLY if the provided sources do not contain the answer, perform a general Google Search to verify the claim.

Respond with ONLY a valid JSON object matching this structure:
{
  "verdict": {
    "verdict": "'TRUE', 'FAKE', 'MISLEADING', 'UNVERIFIABLE', or 'MIXED'",
    "confidenceScore": "A number 0-100 indicating your confidence.",
    "confidenceReasoning": "A brief explanation for the confidence score, explicitly mentioning if trusted sources were found.",
    "contextualDetails": { "when": "When is this true?", "where": "Where is this true?" },
    "furtherExplanation": "A neutral, encyclopedic overview of the topic."
  }${image ? `,
  "imageAnalysis": {
    "isManipulated": "boolean, true if the image appears digitally altered or AI-generated.",
    "manipulationConfidence": "A number 0-100.",
    "manipulationReasoning": "A brief explanation for the image analysis."
  }` : ''}
}
Do not include markdown.

Claim: "${claim}"`
  };

  const parts = imagePart ? [imagePart, textPart] : [textPart];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: { parts },
    config: {
      tools: image ? undefined : [{ googleSearch: {} }],
      temperature: 0.1,
    },
  });

  const parsedResponse = await parseJsonResponse<FullFactCheckResponse>(response);
  const sources = getSources(response);
  return { response: parsedResponse, sources };
};

export const analyzeFallacies = async (text: string): Promise<Fallacy[]> => {
    const prompt = `You are an expert in logic and rhetoric. Analyze the following text for logical fallacies.
Respond with ONLY a valid JSON array, where each object has three keys: "fallacyName", "excerpt", and "explanation".
- "fallacyName": The name of the fallacy (e.g., "Ad Hominem").
- "excerpt": The specific text where the fallacy occurs.
- "explanation": A brief explanation of why it's a fallacy.

Do not include markdown or any other text outside the JSON array. If no fallacies are found, return an empty array.

Text to analyze: "${text}"`;
  
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: { temperature: 0.1 }
    });
  
    return parseJsonResponse<Fallacy[]>(response);
};

export const traceMisinformation = async (claim: string): Promise<{response: SourceTrace, sources: Source[]}> => {
    const prompt = `You are a misinformation analyst. Trace the likely origin and spread of the following claim using Google Search.

STRICT SEARCH PROTOCOL:
1. Prioritize findings from these trusted fact-checking and news authorities to identify the origin:
${TRUSTED_SOURCES_LIST}
2. Use these sources to confirm who started it (Origin), who spread it (Amplifiers), and who is debunking or reporting on it (Source).
3. If no specific trace is found in these distinct sources, broaden to general search.

Respond with ONLY a valid JSON object with three keys: "narrativeSummary", "nodes", and "links".
- "narrativeSummary": A brief story of how the claim likely originated and spread.
- "nodes": An array of objects, each with "id", "type" ('Origin', 'Amplifier', 'Source'), "label", and "stance" ('Supporting', 'Disputing', 'Mixed', 'Inconclusive').
- "links": An array of objects representing connections, each with "source" (id), "target" (id), and "label" (e.g., "cited by").

Do not include markdown.

Claim: "${claim}"`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
            temperature: 0.2,
        },
    });

    const parsedResponse = await parseJsonResponse<SourceTrace>(response);
    const sources = getSources(response);
    return { response: parsedResponse, sources };
};

export const detectScam = async (text: string): Promise<ScamAnalysis> => {
    const prompt = `You are a scam detection expert. Analyze the following text for common scam tactics (e.g., sense of urgency, suspicious links, emotional manipulation, unprofessional language).
Respond with ONLY a valid JSON object matching this structure:
{
  "verdict": "'LIKELY_SCAM', 'POTENTIAL_SCAM', or 'UNLIKELY_SCAM'",
  "confidenceScore": "A number 0-100 indicating your confidence.",
  "summary": "A brief summary of your findings.",
  "identifiedTactics": [
    {
      "tactic": "Name of the tactic (e.g., 'Sense of Urgency').",
      "excerpt": "The specific text where the tactic appears.",
      "explanation": "Why this text is a red flag."
    }
  ]
}
If no tactics are found, return an empty array for "identifiedTactics". Do not include markdown.

Text to analyze: "${text}"`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { temperature: 0.1 },
    });

    return parseJsonResponse<ScamAnalysis>(response);
};