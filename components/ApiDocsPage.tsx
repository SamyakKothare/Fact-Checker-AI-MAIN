import React from 'react';

interface ApiDocsPageProps {
  onBack: () => void;
}

const ApiDocsPage: React.FC<ApiDocsPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">API Documentation</h1>
             <p className="text-gray-500 mt-1">Integrate Fact Checker AI into your own applications.</p>
           </div>
        </header>

        <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar Nav */}
            <div className="hidden md:block col-span-1 space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Getting Started</p>
                <a href="#" className="block px-3 py-2 bg-[#f5c14b]/10 text-[#f5c14b] rounded-lg font-medium">Introduction</a>
                <a href="#" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Authentication</a>
                <a href="#" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Rate Limits</a>
                
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-6 mb-2">Endpoints</p>
                <a href="#" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">POST /fact-check</a>
                <a href="#" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">POST /analyze-image</a>
                <a href="#" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">POST /trace-source</a>
            </div>

            {/* Main Content */}
            <div className="col-span-3 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                    <p className="text-gray-400 leading-relaxed">
                        The Fact Checker API provides programmatic access to our multi-modal verification engine. 
                        It allows developers to submit text, audio, or images and receive detailed verdicts, confidence scores, and source traces.
                        Current version: <span className="font-mono bg-white/10 px-1 rounded text-gray-300">v1.0.2-beta</span>
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Authentication</h2>
                    <p className="text-gray-400 mb-4">
                        All API requests must include your API key in the <code className="text-red-400">Authorization</code> header.
                    </p>
                    <div className="bg-[#10111a] border border-white/10 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <span className="text-purple-400">Authorization:</span> Bearer fc_live_xxxxxxxxxxxxxxxxxxxx
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">Endpoint: Check Fact</h2>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded font-mono font-bold text-sm">POST</span>
                        <code className="text-gray-300 font-mono">https://api.factchecker.ai/v1/check</code>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">Request Body</h3>
                    <div className="bg-[#10111a] border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
<pre>{`{
  "query": "The Eiffel Tower was built in 1889.",
  "include_sources": true,
  "strict_mode": false
}`}</pre>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-300 mt-6 mb-2">Response</h3>
                    <div className="bg-[#10111a] border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
<pre>{`{
  "verdict": "TRUE",
  "confidence": 98.5,
  "sources": [
    {
      "title": "Eiffel Tower History",
      "url": "https://www.toureiffel.paris/en/the-monument/history"
    }
  ]
}`}</pre>
                    </div>
                </section>

                <div className="p-6 bg-yellow-900/10 border border-yellow-700/30 rounded-xl">
                    <h3 className="text-yellow-500 font-bold mb-2">Need an API Key?</h3>
                    <p className="text-gray-400 mb-4">
                        We are currently in private beta. API keys are issued on a case-by-case basis to researchers and developers.
                    </p>
                    <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded transition-colors">
                        Request Access
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPage;