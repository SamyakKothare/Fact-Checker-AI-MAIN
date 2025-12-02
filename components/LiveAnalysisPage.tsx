import React from 'react';

interface LiveAnalysisPageProps {
  onBack: () => void;
}

const LiveAnalysisPage: React.FC<LiveAnalysisPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">Live Analysis Engine</h1>
             <p className="text-gray-500 mt-1">Real-time verification for the streaming era.</p>
           </div>
        </header>

        <section className="mb-16">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#10111a] aspect-video flex items-center justify-center">
                {/* Abstract visualization of live stream */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-20">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-2 bg-[#f5c14b]" style={{ 
                            height: `${Math.random() * 80 + 20}%`,
                            animation: `pulse 1s infinite ${Math.random()}s`
                        }}></div>
                    ))}
                </div>
                <div className="z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span> Live Feed
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Instant Voice Verification</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Monitor debates, podcasts, or live broadcasts. Our engine transcribes and fact-checks spoken claims in under 500ms.
                    </p>
                </div>
            </div>
        </section>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#10111a] rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Seamless Integration</h3>
                <p className="text-gray-400 text-sm">
                    Works directly in the browser via WebSockets. No plugins or heavy software installation required. Just click the microphone icon and start speaking.
                </p>
            </div>
            <div className="p-6 bg-[#10111a] rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Context Aware</h3>
                <p className="text-gray-400 text-sm">
                    The AI doesn't just hear words; it understands context. It distinguishes between opinions, hyperbole, and factual claims that need verification.
                </p>
            </div>
            <div className="p-6 bg-[#10111a] rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Active Citations</h3>
                <p className="text-gray-400 text-sm">
                    As you speak, sources are fetched in the background. If a false claim is detected, the correct information pops up instantly.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysisPage;