import React, { useState, useMemo } from 'react';
import type { SourceTrace, Source, GraphNode, GraphLink } from '../types';
import SourceLink from './SourceLink';
import Feedback from './Feedback';
import DonutChart from './DonutChart';

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8 last:mb-0">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{title}</h2>
      {children}
    </div>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

const NodeCard: React.FC<{ node: GraphNode, isHighlighted: boolean, isDimmed: boolean }> = ({ node, isHighlighted, isDimmed }) => {
  let borderClass = '';
  let bgClass = '';
  let textClass = '';
  let icon = '';

  switch (node.type) {
    case 'Origin':
      borderClass = 'border-red-500/50';
      bgClass = 'bg-red-900/20';
      textClass = 'text-red-400';
      icon = '🚨';
      break;
    case 'Amplifier':
      borderClass = 'border-yellow-500/50';
      bgClass = 'bg-yellow-900/20';
      textClass = 'text-yellow-400';
      icon = '📢';
      break;
    case 'Source':
      borderClass = 'border-blue-500/50';
      bgClass = 'bg-blue-900/20';
      textClass = 'text-blue-400';
      icon = '🔗';
      break;
    default:
      borderClass = 'border-gray-500/50';
      bgClass = 'bg-gray-900/20';
      textClass = 'text-gray-400';
      icon = '📄';
  }

  const dimClass = isDimmed ? 'opacity-20 blur-[1px] grayscale' : 'opacity-100';
  const highlightClass = isHighlighted ? 'scale-105 shadow-md ring-1 ring-white/20' : '';

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${borderClass} ${bgClass} transition-all duration-300 ${dimClass} ${highlightClass}`}>
      <span className="text-xl select-none">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${textClass}`}>{node.type}</p>
        <p className="text-gray-200 font-medium text-sm truncate" title={node.label}>{node.label}</p>
      </div>
    </div>
  );
};

const LinkItem: React.FC<{ link: GraphLink; nodes: GraphNode[] }> = ({ link, nodes }) => {
  const sourceNode = nodes.find(n => n.id === link.source);
  const targetNode = nodes.find(n => n.id === link.target);

  if (!sourceNode || !targetNode) return null;

  return (
    <div className="flex items-center justify-between bg-[#050509] p-3 rounded-lg border border-white/10 text-sm hover:border-white/20 transition-colors">
      <div className="flex-1 min-w-0 pr-2">
         <span className="text-gray-300 font-medium truncate block" title={sourceNode.label}>{sourceNode.label}</span>
      </div>
      
      <div className="flex flex-col items-center px-2 min-w-[80px]">
        <span className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">{link.label}</span>
        <div className="w-full h-px bg-gray-600 relative opacity-50">
           <div className="absolute right-0 -top-[3px] w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-gray-600 border-b-[3px] border-b-transparent"></div>
        </div>
      </div>

      <div className="flex-1 min-w-0 pl-2 text-right">
        <span className="text-gray-300 font-medium truncate block" title={targetNode.label}>{targetNode.label}</span>
      </div>
    </div>
  );
};

const SourceTraceResult: React.FC<{ result: SourceTrace; sources: Source[] }> = ({ result, sources }) => {
  const [isNarrativeVisible, setIsNarrativeVisible] = useState(false);
  const [highlightedType, setHighlightedType] = useState<string | null>(null);

  // Group nodes for display
  const origins = result.nodes.filter(n => n.type === 'Origin');
  const amplifiers = result.nodes.filter(n => n.type === 'Amplifier');
  const otherSources = result.nodes.filter(n => n.type === 'Source');

  // Prepare Chart Data
  const chartData = useMemo(() => [
    { 
      id: 'Origin', 
      label: 'Origin', 
      value: origins.length, 
      color: '#f87171', // red-400 
      description: 'The initial point(s) where the claim or narrative first appeared.'
    },
    { 
      id: 'Amplifier', 
      label: 'Amplifiers', 
      value: amplifiers.length, 
      color: '#facc15', // yellow-400
      description: 'Key accounts or platforms that significantly boosted the spread.'
    },
    { 
      id: 'Source', 
      label: 'Sources', 
      value: otherSources.length, 
      color: '#60a5fa', // blue-400
      description: 'Entities reporting on, debunking, or verifying the claim.'
    }
  ].filter(d => d.value > 0), [origins.length, amplifiers.length, otherSources.length]);

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
      </Section>

      <Section title="Network Actors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Origins Column */}
            <div className="flex flex-col gap-3">
                <div className={`flex items-center justify-center gap-2 mb-2 pb-2 border-b border-red-900/30 transition-opacity duration-300 ${highlightedType && highlightedType !== 'Origin' ? 'opacity-30' : 'opacity-100'}`}>
                     <span className="text-red-400 font-bold text-xs uppercase">Origins</span>
                     <span className="bg-red-900/40 text-red-300 text-[10px] px-1.5 rounded-full">{origins.length}</span>
                </div>
                {origins.length > 0 ? origins.map(n => (
                    <NodeCard 
                        key={n.id} 
                        node={n} 
                        isHighlighted={highlightedType === 'Origin'} 
                        isDimmed={highlightedType !== null && highlightedType !== 'Origin'} 
                    />
                )) : <div className="text-gray-600 text-center text-xs italic py-8 bg-[#050509] rounded-lg border border-dashed border-gray-800">No origins identified</div>}
            </div>

            {/* Amplifiers Column */}
            <div className="flex flex-col gap-3">
                <div className={`flex items-center justify-center gap-2 mb-2 pb-2 border-b border-yellow-900/30 transition-opacity duration-300 ${highlightedType && highlightedType !== 'Amplifier' ? 'opacity-30' : 'opacity-100'}`}>
                     <span className="text-yellow-400 font-bold text-xs uppercase">Amplifiers</span>
                     <span className="bg-yellow-900/40 text-yellow-300 text-[10px] px-1.5 rounded-full">{amplifiers.length}</span>
                </div>
                {amplifiers.length > 0 ? amplifiers.map(n => (
                    <NodeCard 
                        key={n.id} 
                        node={n} 
                        isHighlighted={highlightedType === 'Amplifier'} 
                        isDimmed={highlightedType !== null && highlightedType !== 'Amplifier'} 
                    />
                )) : <div className="text-gray-600 text-center text-xs italic py-8 bg-[#050509] rounded-lg border border-dashed border-gray-800">No amplifiers identified</div>}
            </div>

            {/* Sources Column */}
            <div className="flex flex-col gap-3">
                <div className={`flex items-center justify-center gap-2 mb-2 pb-2 border-b border-blue-900/30 transition-opacity duration-300 ${highlightedType && highlightedType !== 'Source' ? 'opacity-30' : 'opacity-100'}`}>
                     <span className="text-blue-400 font-bold text-xs uppercase">Sources</span>
                     <span className="bg-blue-900/40 text-blue-300 text-[10px] px-1.5 rounded-full">{otherSources.length}</span>
                </div>
                {otherSources.length > 0 ? otherSources.map(n => (
                    <NodeCard 
                        key={n.id} 
                        node={n} 
                        isHighlighted={highlightedType === 'Source'} 
                        isDimmed={highlightedType !== null && highlightedType !== 'Source'} 
                    />
                )) : <div className="text-gray-600 text-center text-xs italic py-8 bg-[#050509] rounded-lg border border-dashed border-gray-800">No sources identified</div>}
            </div>
        </div>
      </Section>
      
       {result.links.length > 0 && (
         <Section title="Propagation Flow">
            <div className="flex flex-col gap-2">
                {result.links.map((link, i) => (
                    <LinkItem key={i} link={link} nodes={result.nodes} />
                ))}
            </div>
         </Section>
       )}

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
