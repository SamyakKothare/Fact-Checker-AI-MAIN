import React from 'react';

interface CareersPageProps {
  onBack: () => void;
}

const CareersPage: React.FC<CareersPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button 
             onClick={onBack} 
             className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group"
             aria-label="Back"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">Careers</h1>
             <p className="text-gray-500 mt-1">Join the mission to restore trust in the digital world.</p>
           </div>
        </header>

        <section className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Build the Future of Truth</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
                We are a team of engineers, researchers, and ethicists dedicated to fighting misinformation with cutting-edge AI. We don't just build software; we build the infrastructure for objective reality.
            </p>
        </section>

        <div className="grid gap-6">
            <h3 className="text-xl font-semibold text-[#f5c14b] uppercase tracking-wider mb-2">Open Positions</h3>
            
            {/* Position 1 */}
            <div className="bg-[#10111a] p-6 rounded-xl border border-white/10 hover:border-[#f5c14b]/50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-[#f5c14b] transition-colors">Senior AI Research Scientist (LLM)</h4>
                        <p className="text-gray-500 text-sm">Remote (Global) • Full-time</p>
                    </div>
                    <span className="bg-[#f5c14b]/10 text-[#f5c14b] px-3 py-1 rounded-full text-xs font-bold">Engineering</span>
                </div>
                <p className="text-gray-400 mb-4">
                    Lead research into hallucination mitigation and multi-hop reasoning for fact-checking pipelines. Experience with RAG architectures and vector databases required.
                </p>
                <div className="flex gap-2">
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">Python</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">PyTorch</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">Gemini API</span>
                </div>
            </div>

            {/* Position 2 */}
            <div className="bg-[#10111a] p-6 rounded-xl border border-white/10 hover:border-[#f5c14b]/50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-[#f5c14b] transition-colors">Lead Frontend Engineer</h4>
                        <p className="text-gray-500 text-sm">London / Remote • Full-time</p>
                    </div>
                    <span className="bg-[#f5c14b]/10 text-[#f5c14b] px-3 py-1 rounded-full text-xs font-bold">Product</span>
                </div>
                <p className="text-gray-400 mb-4">
                    Architect high-performance interfaces for real-time data visualization. You will build complex graph visualizations and low-latency audio components using React 19.
                </p>
                <div className="flex gap-2">
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">React</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">TypeScript</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">D3.js</span>
                </div>
            </div>

            {/* Position 3 */}
            <div className="bg-[#10111a] p-6 rounded-xl border border-white/10 hover:border-[#f5c14b]/50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-[#f5c14b] transition-colors">Head of Trust & Safety</h4>
                        <p className="text-gray-500 text-sm">New York / Remote • Full-time</p>
                    </div>
                    <span className="bg-[#f5c14b]/10 text-[#f5c14b] px-3 py-1 rounded-full text-xs font-bold">Policy</span>
                </div>
                <p className="text-gray-400 mb-4">
                    Define the ethical guidelines for our AI. You will work with governments and NGOs to ensure our tools are used responsibly and effectively against disinformation campaigns.
                </p>
                <div className="flex gap-2">
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">Policy</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">Ethics</span>
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">International Relations</span>
                </div>
            </div>
        </div>

        <div className="mt-12 p-8 bg-blue-900/10 border border-blue-900/30 rounded-xl text-center">
            <h3 className="text-xl font-bold text-blue-400 mb-2">Don't see a role for you?</h3>
            <p className="text-gray-400 mb-6">
                We are always looking for exceptional talent. If you are passionate about the future of information, we want to hear from you.
            </p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors">
                Email General Application
            </button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;