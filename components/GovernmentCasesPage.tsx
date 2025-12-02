import React from 'react';

interface GovernmentCasesPageProps {
  onBack: () => void;
}

const GovernmentCasesPage: React.FC<GovernmentCasesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">Industry Cases: Government</h1>
             <p className="text-gray-500 mt-1">Protecting public integrity and citizen safety.</p>
           </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#10111a] p-6 rounded-xl border border-white/10 hover:border-purple-500/30 transition-colors">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Election Integrity</h3>
                <p className="text-gray-400 text-sm mb-4">
                    Misinformation peaks during election cycles. We provide tools for election commissions to rapidly verify claims about voting procedures, polling locations, and candidate statements, reducing voter suppression.
                </p>
            </div>
            <div className="bg-[#10111a] p-6 rounded-xl border border-white/10 hover:border-green-500/30 transition-colors">
                <h3 className="text-lg font-bold text-green-400 mb-3">Public Health</h3>
                <p className="text-gray-400 text-sm mb-4">
                    During crises like pandemics, false health advice can be deadly. Health departments use our platform to monitor and debunk pseudoscientific claims spreading in local communities.
                </p>
            </div>
            <div className="bg-[#10111a] p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Scam Prevention</h3>
                <p className="text-gray-400 text-sm mb-4">
                    Consumer protection agencies use our Scam Detector API to analyze reports of phishing emails and fraudulent SMS campaigns, issuing faster warnings to the public.
                </p>
            </div>
        </div>

        <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Deployment Options</h2>
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="mt-1 w-2 h-2 bg-[#f5c14b] rounded-full"></div>
                    <div>
                        <h4 className="font-bold text-gray-200">On-Premise / Air-Gapped</h4>
                        <p className="text-gray-500 text-sm">For sensitive government data, we offer self-hosted versions of the Fact Checker engine that run entirely offline within secure government networks.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="mt-1 w-2 h-2 bg-[#f5c14b] rounded-full"></div>
                    <div>
                        <h4 className="font-bold text-gray-200">GDPR & Privacy Compliant</h4>
                        <p className="text-gray-500 text-sm">Our architecture is designed with privacy by default. No PII is retained from queries, and we are fully compliant with EU and US data protection regulations.</p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default GovernmentCasesPage;