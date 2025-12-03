import React from 'react';

interface TechnologyPageProps {
  onBack: () => void;
}

const TechnologyPage: React.FC<TechnologyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">Technology Architecture</h1>
             <p className="text-gray-500 mt-1">A high-level overview of our secure verification engine.</p>
           </div>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-2xl font-bold text-[#f5c14b] mb-6">System Design</h2>
                <div className="space-y-8">
                    <div className="relative pl-8 border-l border-gray-800">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-[#f5c14b] rounded-full"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Secure Data Ingestion</h3>
                        <p className="text-gray-400">
                            Our ingestion layer handles multi-modal inputs with strict sanitization protocols. Data is transiently processed in memory using secure encryption standards, ensuring user queries and uploads are never persisted on our edge nodes longer than necessary for analysis.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l border-gray-800">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Neural Analysis Engine</h3>
                        <p className="text-gray-400">
                            We utilize a proprietary ensemble of Large Language Models (LLMs) tuned for logical reasoning and pattern recognition. This engine employs chain-of-thought prompting to deconstruct complex claims into verifiable atomic facts before cross-referencing them.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l border-gray-800">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-purple-500 rounded-full"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Dynamic Verification Layer</h3>
                        <p className="text-gray-400">
                            Unlike static databases, our system performs real-time retrieval from a curated index of authoritative domains. The results are synthesized through a heuristic filter that prioritizes institutional credibility over popularity metrics.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-[#10111a] p-8 rounded-2xl border border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Platform Capabilities</h3>
                
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                        <div className="bg-blue-500/20 p-2 rounded text-blue-400 font-mono font-bold">Frontend</div>
                        <div>
                            <p className="text-white font-medium">High-Performance UI</p>
                            <p className="text-xs text-gray-500">Built on modern reactive frameworks for sub-second interaction latency.</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                        <div className="bg-yellow-500/20 p-2 rounded text-yellow-400 font-mono font-bold">AI Core</div>
                        <div>
                            <p className="text-white font-medium">Generative Intelligence</p>
                            <p className="text-xs text-gray-500">Advanced multi-modal models optimized for factuality and reduced hallucinations.</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                        <div className="bg-green-500/20 p-2 rounded text-green-400 font-mono font-bold">Security</div>
                        <div>
                            <p className="text-white font-medium">Privacy-First Architecture</p>
                            <p className="text-xs text-gray-500">Transient processing pipeline with no permanent user data storage.</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                        <div className="bg-red-500/20 p-2 rounded text-red-400 font-mono font-bold">Network</div>
                        <div>
                            <p className="text-white font-medium">Real-Time Streams</p>
                            <p className="text-xs text-gray-500">Encrypted WebSocket transport for secure live voice and data analysis.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;