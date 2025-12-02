import React from 'react';
import type { ScamAnalysis } from '../types';
import Feedback from './Feedback';

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

const getVerdictStyles = (verdict: ScamAnalysis['verdict']): { bg: string, text: string, border: string } => {
  switch (verdict) {
    case 'LIKELY_SCAM': return { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-800' };
    case 'POTENTIAL_SCAM': return { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-800' };
    case 'UNLIKELY_SCAM': return { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-800' };
    default: return { bg: 'bg-gray-800', text: 'text-gray-300', border: 'border-gray-600' };
  }
};

const ScamAnalysisResult: React.FC<{ result: ScamAnalysis }> = ({ result }) => {
  const verdictStyles = getVerdictStyles(result.verdict);
  const verdictText = result.verdict.replace('_', ' ');

  return (
    <div className="bg-[#10111a] rounded-xl shadow-lg p-6 border border-white/10">
      <Section title="Scam Analysis">
        <div className={`inline-block px-4 py-2 rounded-full border text-lg font-bold ${verdictStyles.bg} ${verdictStyles.text} ${verdictStyles.border}`}>
          {verdictText}
        </div>
      </Section>

      <Section title={`Confidence: ${result.confidenceScore}%`}>
        <ConfidenceBar score={result.confidenceScore} colorClass={verdictStyles.bg.includes('green') ? 'bg-green-500' : verdictStyles.bg.includes('red') ? 'bg-red-500' : 'bg-yellow-500'} />
      </Section>

      <Section title="Summary">
        <p className="text-gray-300 text-base leading-relaxed">{result.summary}</p>
      </Section>
      
      {result.identifiedTactics.length > 0 && (
        <Section title="Identified Red Flags">
            <div className="space-y-4">
                {result.identifiedTactics.map((tactic, index) => (
                    <div key={index} className="bg-red-900/20 border border-red-800/50 p-4 rounded-lg">
                        <h3 className="text-md font-semibold text-red-300 mb-2">{tactic.tactic}</h3>
                        <blockquote className="border-l-4 border-red-800/50 pl-4 italic text-red-200 my-2">
                            "{tactic.excerpt}"
                        </blockquote>
                        <p className="text-red-200 text-sm">{tactic.explanation}</p>
                    </div>
                ))}
            </div>
        </Section>
      )}

      <Feedback source="Scam Analysis" />
    </div>
  );
};

export default ScamAnalysisResult;