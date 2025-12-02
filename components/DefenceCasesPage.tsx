import React from 'react';

interface DefenceCasesPageProps {
  onBack: () => void;
}

const DefenceCasesPage: React.FC<DefenceCasesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">Industry Cases: Defence</h1>
             <p className="text-gray-500 mt-1">Cognitive security and OSINT for national safety.</p>
           </div>
        </header>

        <div className="bg-gradient-to-r from-blue-900/20 to-transparent p-8 rounded-xl border border-blue-900/30 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Information Warfare</h2>
            <p className="text-gray-300 leading-relaxed max-w-3xl">
                In modern hybrid warfare, information is a weapon. Adversaries use coordinated disinformation campaigns (botnets, deepfakes, narrative laundering) to destabilize societies. Fact Checker AI provides defence analysts with the tools to detect, track, and counter these threats.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#10111a] p-6 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-red-900/20 rounded flex items-center justify-center text-red-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Automated OSINT</h3>
                <p className="text-gray-400 text-sm">
                    Open Source Intelligence analysts are often overwhelmed by data. Our AI scrapes and cross-references thousands of sources (Telegram, VK, X) to verify claims about troop movements or equipment losses against satellite data and reliable reporting.
                </p>
            </div>

            <div className="bg-[#10111a] p-6 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-yellow-900/20 rounded flex items-center justify-center text-yellow-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Narrative Tracking</h3>
                <p className="text-gray-400 text-sm">
                    Identify the "Patient Zero" of a hostile narrative. Our Source Trace engine visualizes the propagation network, helping analysts identify state-sponsored amplifier accounts and bot networks.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DefenceCasesPage;