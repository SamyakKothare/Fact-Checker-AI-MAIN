import React from 'react';

interface MediaCasesPageProps {
  onBack: () => void;
}

const MediaCasesPage: React.FC<MediaCasesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">Industry Cases: Media</h1>
             <p className="text-gray-500 mt-1">Empowering newsrooms with automated verification.</p>
           </div>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
                <h2 className="text-2xl font-bold text-[#f5c14b] mb-4">The Challenge</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                    Modern journalism is under siege. With the rise of generative AI, deepfakes, and automated bot farms, the volume of content that needs verification has exploded. Newsrooms are shrinking, but the workload is growing.
                </p>
                <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2"><span className="text-red-500">×</span> 600% increase in fake viral videos</li>
                    <li className="flex items-center gap-2"><span className="text-red-500">×</span> Manual verification takes hours</li>
                    <li className="flex items-center gap-2"><span className="text-red-500">×</span> Public trust in media at historic lows</li>
                </ul>
            </div>
            <div className="bg-[#10111a] p-8 rounded-xl border border-white/10 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">📰</div>
                    <div>
                        <h3 className="font-bold text-white">Case Study: Global News Corp</h3>
                        <p className="text-xs text-gray-500">Election Coverage 2024</p>
                    </div>
                </div>
                <p className="text-gray-400 text-sm italic mb-4">
                    "Fact Checker AI allowed our desk to verify viewer-submitted videos in real-time during the broadcast. What used to take a team of 3 researchers an hour was done in 45 seconds."
                </p>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-3/4"></div>
                </div>
                <p className="text-right text-xs text-green-400 mt-1">80% Efficiency Gain</p>
            </div>
        </div>

        <section>
            <h2 className="text-2xl font-bold text-white mb-6">Tools for Journalists</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#10111a] p-6 rounded-lg border border-white/5">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">Viral Trace</h3>
                    <p className="text-gray-400 text-sm">Identify the original uploader of a viral video to ask for permission or verify context.</p>
                </div>
                <div className="bg-[#10111a] p-6 rounded-lg border border-white/5">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">Deepfake Detector</h3>
                    <p className="text-gray-400 text-sm">Analyze pixel-level artifacts to determine if an image from a conflict zone is AI-generated.</p>
                </div>
                <div className="bg-[#10111a] p-6 rounded-lg border border-white/5">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">Bulk Analysis</h3>
                    <p className="text-gray-400 text-sm">Upload a CSV of tweets or comments and get a sentiment and factuality report in minutes.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default MediaCasesPage;