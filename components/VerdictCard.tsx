import React, { useState } from 'react';
import type { FullFactCheckResponse, Source, Verdict } from '../types';
import SourceLink from './SourceLink';
import Feedback from './Feedback';
import TextToSpeechButton from './TextToSpeechButton';

interface VerdictCardProps {
  result: FullFactCheckResponse;
  sources: Source[];
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const getVerdictStyles = (verdict: Verdict): { bg: string, text: string, border: string } => {
  switch (verdict) {
    case 'TRUE': return { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-800' };
    case 'FAKE': return { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-800' };
    case 'MISLEADING': return { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-800' };
    case 'MIXED': return { bg: 'bg-orange-900/30', text: 'text-orange-400', border: 'border-orange-800' };
    case 'UNVERIFIABLE': return { bg: 'bg-gray-800', text: 'text-gray-300', border: 'border-gray-600' };
    default: return { bg: 'bg-gray-800', text: 'text-gray-300', border: 'border-gray-600' };
  }
};

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6 last:mb-0">
    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</h2>
    {children}
  </div>
);

const ConfidenceBar: React.FC<{ score: number, colorClass: string }> = ({ score, colorClass }) => (
    <div className="w-full bg-gray-800 rounded-full h-2.5 border border-gray-700">
        <div className={`h-2.5 rounded-full ${colorClass}`} style={{ width: `${score}%` }}></div>
    </div>
);

const VerdictCard: React.FC<VerdictCardProps> = ({ result, sources }) => {
  const { verdict, imageAnalysis } = result;
  const verdictStyles = getVerdictStyles(verdict.verdict);
  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  return (
    <div className="bg-[#10111a] rounded-xl shadow-lg p-6 border border-white/10">
      <Section title="Verdict">
        <div className={`inline-block px-4 py-2 rounded-full border text-lg font-bold ${verdictStyles.bg} ${verdictStyles.text} ${verdictStyles.border}`}>
          {verdict.verdict}
        </div>
      </Section>
      
      <Section title={`Confidence: ${verdict.confidenceScore}%`}>
        <ConfidenceBar score={verdict.confidenceScore} colorClass={verdictStyles.bg.includes('green') ? 'bg-green-500' : verdictStyles.bg.includes('red') ? 'bg-red-500' : 'bg-yellow-500'} />
        <p className="text-gray-400 text-sm mt-2 italic">{verdict.confidenceReasoning}</p>
      </Section>
      
      {verdict.contextualDetails && (verdict.contextualDetails.when || verdict.contextualDetails.where) && (
        <Section title="Context">
          <div className="text-gray-200 text-base leading-relaxed bg-[#050509] p-4 rounded-md border border-white/10">
            {verdict.contextualDetails.when && <p><strong>When:</strong> {verdict.contextualDetails.when}</p>}
            {verdict.contextualDetails.where && <p><strong>Where:</strong> {verdict.contextualDetails.where}</p>}
          </div>
        </Section>
      )}

      <div className="mb-6 last:mb-0">
        <div className="flex items-center justify-between mb-3">
            <button 
              onClick={() => setIsExplanationVisible(!isExplanationVisible)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider hover:text-white transition-colors focus:outline-none"
            >
              Further Explanation
              <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isExplanationVisible ? 'rotate-180' : ''}`} />
            </button>
            <TextToSpeechButton text={verdict.furtherExplanation} />
        </div>
        
        {isExplanationVisible && (
          <p className="text-gray-300 text-base leading-relaxed animate-fade-in">{verdict.furtherExplanation}</p>
        )}
      </div>

      {imageAnalysis && (
        <Section title="Image Analysis">
           <div className={`p-4 rounded-lg border ${imageAnalysis.isManipulated ? 'border-yellow-800/50 bg-yellow-900/10' : 'border-white/10 bg-[#050509]'}`}>
                <p className="font-bold text-lg mb-2 text-gray-200">{imageAnalysis.isManipulated ? 'Likely Manipulated / AI-Generated' : 'Appears Authentic'}</p>
                <p className="text-sm text-gray-400 mb-3 italic">{imageAnalysis.manipulationReasoning}</p>
                <ConfidenceBar score={imageAnalysis.manipulationConfidence} colorClass={imageAnalysis.isManipulated ? 'bg-yellow-500' : 'bg-green-500'} />
                <p className="text-right text-xs mt-1 text-gray-500">{imageAnalysis.manipulationConfidence}% Confidence</p>
           </div>
        </Section>
      )}

      {sources.length > 0 && (
        <Section title="Verifiable Sources">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((source, index) => <SourceLink key={index} source={source} />)}
          </div>
        </Section>
      )}

      <Feedback source="Fact Check" />
    </div>
  );
};

export default VerdictCard;
