import React, { useState, useMemo } from 'react';
import type { SourceTrace, Source } from '../types';
import SourceLink from './SourceLink';
import Feedback from './Feedback';
import DonutChart from './DonutChart';
import PropagationGraph from './PropagationGraph';

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8 last:mb-0">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{title}</h2>
      {children}
    </div>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const SourceTraceResult: React.FC<{ result: SourceTrace; sources: Source[] }> = ({ result, sources }) => {
  const [isNarrativeVisible, setIsNarrativeVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [highlightedType, setHighlightedType] = useState<string | null>(null);

  // Group nodes for display
  const origins = result.nodes.filter(n => n.type === 'Origin');
  const amplifiers = result.nodes.filter(n => n.type === 'Amplifier');
  const debunkers = result.nodes.filter(n => n.type === 'Debunker' || n.type === 'Source');

  // Prepare Chart Data
  const chartData = useMemo(() => [
    { 
      id: 'Origin', 
      label: 'Origin', 
      value: origins.length, 
      color: '#ef4444', // red-500
      description: 'Where the story or claim originally started.'
    },
    { 
      id: 'Amplifier', 
      label: 'Amplifiers', 
      value: amplifiers.length, 
      color: '#facc15', // yellow-400
      description: 'People or platforms who shared and spread the claim.'
    },
    { 
      id: 'Debunker', 
      label: 'Debunkers', 
      value: debunkers.length, 
      color: '#22c55e', // green-500
      description: 'Fact-checkers or experts who verified or proved it wrong.'
    }
  ].filter(d => d.value > 0), [origins.length, amplifiers.length, debunkers.length]);

  return (
    <div className="bg-[#10111a] rounded-xl shadow-lg p-6 border border-white/10">
      <div className="mb-8 last:mb-0">
        <button 
          onClick={() => setIsNarrativeVisible(!isNarrativeVisible)}
          className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2 w-full hover:text-white transition-colors focus:outline-none"
        >
          Narrative Summary
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isNarrativeVisible ? 'rotate-180' : ''}`} />
        </button>
        
        {isNarrativeVisible && (
          <div className="bg-[#050509] p-4 rounded-lg border border-white/10 animate-fade-in">
              <p className="text-gray-300 text-base leading-relaxed">{result.narrativeSummary}</p>
          </div>
        )}
      </div>

      <Section title="Network Visualization">
         <DonutChart data={chartData} onHover={setHighlightedType} />
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-red-900/10 border border-red-900/30 p-3 rounded-lg">
               <span className="text-red-400 font-bold text-xs uppercase tracking-wider block mb-1">Origin</span>
               <p className="text-gray-400 text-xs leading-relaxed">The initial source where the claim or narrative was first created or posted.</p>
            </div>
            <div className="bg-yellow-900/10 border border-yellow-900/30 p-3 rounded-lg">
               <span className="text-yellow-400 font-bold text-xs uppercase tracking-wider block mb-1">Amplifiers</span>
               <p className="text-gray-400 text-xs leading-relaxed">Accounts, groups, or media outlets that significantly boosted the spread of the claim.</p>
            </div>
            <div className="bg-green-900/10 border border-green-900/30 p-3 rounded-lg">
               <span className="text-green-400 font-bold text-xs uppercase tracking-wider block mb-1">Debunkers</span>
               <p className="text-gray-400 text-xs leading-relaxed">Trusted sources or fact-checkers who have investigated and verified the truth.</p>
            </div>
         </div>
      </Section>

      <Section title="Propagation Flow">
        <PropagationGraph nodes={result.nodes} links={result.links} />
      </Section>

      {sources.length > 0 && (
        <Section title="Verified References">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sources.map((source, index) => (
              <SourceLink key={index} source={source} />
            ))}
          </div>
        </Section>
      )}

      <Feedback source="Source Trace" />
    </div>
  );
};

export default SourceTraceResult;