export type Verdict = 'TRUE' | 'FAKE' | 'MISLEADING' | 'UNVERIFIABLE' | 'MIXED';

export interface FactCheckVerdict {
  verdict: Verdict;
  confidenceScore: number;
  confidenceReasoning: string;
  contextualDetails?: {
    when?: string;
    where?: string;
  };
  furtherExplanation: string;
}

export interface ImageAnalysis {
  isManipulated: boolean;
  manipulationConfidence: number;
  manipulationReasoning: string;
}

export interface FullFactCheckResponse {
  verdict: FactCheckVerdict;
  imageAnalysis?: ImageAnalysis;
}

export interface Fallacy {
  fallacyName: string;
  excerpt: string;
  explanation: string;
}

export interface GraphNode {
  id: string;
  type: 'Origin' | 'Amplifier' | 'Source';
  label: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
}

export interface SourceTrace {
  narrativeSummary: string;
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface Source {
  uri: string;
  title: string;
}

export interface ScamTactic {
  tactic: string;
  excerpt: string;
  explanation: string;
}

export interface ScamAnalysis {
    verdict: 'LIKELY_SCAM' | 'POTENTIAL_SCAM' | 'UNLIKELY_SCAM';
    confidenceScore: number;
    summary: string;
    identifiedTactics: ScamTactic[];
}

export type Tool = 'fact-check' | 'image' | 'voice' | 'analyze' | 'trace' | 'scam';

export interface HistoryItem {
  id: string;
  tool: Tool;
  queryText: string;
  image?: { b64: string, mime: string } | null;
  timestamp: number;
  factCheckResult: FullFactCheckResponse | null;
  fallacyResult: Fallacy[] | null;
  traceResult: SourceTrace | null;
  scamResult: ScamAnalysis | null;
  sources: Source[];
}