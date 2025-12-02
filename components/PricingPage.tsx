import React from 'react';

interface PricingPageProps {
  onBack: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex items-center gap-4 mb-12">
           <button 
             onClick={onBack} 
             className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group"
             aria-label="Back"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">Pricing & Sustainability</h1>
             <p className="text-gray-500 mt-1">Our philosophy on open access and the future of digital truth.</p>
           </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Section 1: Why it is free */}
          <div className="bg-[#10111a] rounded-xl border border-white/10 p-8 shadow-lg">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-800/30 text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Why Fact Checker AI is Currently Free</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            At Fact Checker AI, we believe that access to verified, truthful information is a fundamental right, not a luxury. In an era where misinformation spreads six times faster than the truth, creating paywalls around verification tools typically excludes those who need them most—students, independent researchers, and the general public.
                        </p>
                        <p>
                            <strong>Technological Efficiency:</strong> We are currently leveraging the advanced efficiency of the Google Gemini API. This allows us to process multi-modal inputs (text, audio, images) with incredible speed and relatively low computational overhead compared to legacy models. By optimizing our prompt engineering and reducing token waste, we have managed to keep operational costs within a manageable range for a public beta.
                        </p>
                        <p>
                            <strong>Community-First Approach:</strong> Our primary goal right now is data refinement and usability testing. By keeping the platform free, we encourage a diverse range of queries—from political fact-checking to scam detection. This usage data helps us fine-tune our detection algorithms and understand the evolving landscape of digital misinformation.
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* Section 2: Future Sustainability */}
          <div className="bg-[#10111a] rounded-xl border border-white/10 p-8 shadow-lg">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-[#f5c14b]/10 rounded-lg border border-[#f5c14b]/30 text-[#f5c14b]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">The Need for Future Subscriptions</h2>
                    <div className="space-y-4 text-gray-400 leading-relaxed">
                        <p>
                            While we are committed to maintaining a robust free tier, the exquisite demands of the market and the escalating complexity of AI-generated misinformation will eventually necessitate a paid subscription model for power users and enterprise clients.
                        </p>
                        <p>
                            <strong>Scaling Infrastructure:</strong> As our user base grows, so does the demand on our servers. Processing high-resolution video forensics and real-time voice analysis requires significant GPU compute power. To ensure low latency and high availability without rate-limiting our users, we will need to invest in dedicated infrastructure.
                        </p>
                        <p>
                            <strong>Advanced Models & API Costs:</strong> We plan to integrate even more powerful models (such as Gemini 1.5 Pro/Ultra) for deep-dive investigations that require analyzing hours of audio or parsing thousands of pages of documents. These premium models come with substantial API costs that cannot be sustained solely through a free model.
                        </p>
                        <p>
                            <strong>Continuous Development:</strong> The "arms race" against deepfakes is never-ending. A subscription model ensures we can hire dedicated security researchers and developers to update our detection vectors daily, keeping you ahead of the latest scam tactics and propaganda techniques.
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* Section 3: Contribute */}
          <div className="bg-[#10111a] rounded-xl border border-white/10 p-8 shadow-lg hover:border-blue-500/30 transition-colors">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Contribute to Development</h2>
                    <p className="text-gray-400 mb-6">
                        This is an open initiative driven by passion for truth. If you are a developer, researcher, or just someone who wants to support the cause, there are ways to help.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-semibold transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            View on GitHub
                        </a>
                        <button className="flex items-center gap-2 px-5 py-3 bg-[#f5c14b] text-[#1a1200] rounded-lg font-bold hover:brightness-110 shadow-lg shadow-yellow-500/20 transition-all">
                             ☕ Buy us a Coffee
                        </button>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PricingPage;