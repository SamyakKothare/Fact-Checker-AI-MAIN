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
             <h1 className="text-3xl font-bold text-gray-100">Technology Stack</h1>
             <p className="text-gray-500 mt-1">Under the hood of the Fact Checker AI engine.</p>
           </div>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-2xl font-bold text-[#f5c14b] mb-6">Core Architecture</h2>
                <div className="space-y-8">
                    <div className="relative pl-8 border-l border-gray-800">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-[#f5c14b] rounded-full"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Input Processing Layer</h3>
                        <p className="text-gray-400">
                            Whether input is text, audio, or image, our edge-run processors normalize the data. We use the Web Audio API for real-time PCM stream conversion and HTML5 Canvas for image pre-processing before API transmission.
                        </p>
                    </div>
                    <div className="relative pl-8 border-l border-gray-800">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Multi-Modal Reasoning</h3>
                        <p className="text-gray-400">
                            The heart of the system is the <strong>Gemini 2.5 Flash</strong> model. Its 1M+ token context window allows us to feed extensive grounding data, system instructions, and history in a single shot, enabling complex cross-modal reasoning (e.g., finding contradictions between an image's metadata and its caption).
                        </p>
                    </div>
                    <div className="relative pl-8 border-l border-gray-800">
                        <div className="absolute -left-1.5 top-0 w-3 h-3 bg-purple-500 rounded-full"></div>
                        <h3 className="text-lg font-bold text-white mb-2">Grounding & Verification</h3>
                        <p className="text-gray-400">
                            We don't rely on the model's training data alone. We utilize dynamic retrieval tools (Google Search Grounding) to fetch real-time data from our Allow-Listed domains (NASA, Reuters, etc.). The model then synthesizes this live data to form a verdict.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-[#10111a] p-8 rounded-2xl border border-white/10 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Tech Stack Highlights</h3>
                
                <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                        <div className="bg-blue-500/20 p-2 rounded text-blue-400 font-mono font-bold">React 19</div>
                        <div>
                            <p className="text-white font-medium">Frontend Framework</p>
                            <p className="text-xs text-gray-500">Utilizing the new compiler and transition APIs for buttery smooth UI.</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                        <div className="bg-yellow-500/20 p-2 rounded text-yellow-400 font-mono font-bold">Gemini API</div>
                        <div>
                            <p className="text-white font-medium">Generative Intelligence</p>
                            <p className="text-xs text-gray-500">Powered by the Gemini 2.5 Flash & Pro models.</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                        <div className="bg-green-500/20 p-2 rounded text-green-400 font-mono font-bold">Tailwind</div>
                        <div>
                            <p className="text-white font-medium">Styling Engine</p>
                            <p className="text-xs text-gray-500">Utility-first CSS for rapid, responsive design implementation.</p>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                        <div className="bg-red-500/20 p-2 rounded text-red-400 font-mono font-bold">WebSockets</div>
                        <div>
                            <p className="text-white font-medium">Live Transport</p>
                            <p className="text-xs text-gray-500">Low-latency bi-directional streams for voice analysis.</p>
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