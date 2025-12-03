import React from 'react';

interface AboutUsPageProps {
  onBack: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button 
             onClick={onBack} 
             className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group"
             aria-label="Back"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">About Us</h1>
             <p className="text-gray-500 mt-1">The story and technology behind Fact Checker AI.</p>
           </div>
        </header>

        <div className="space-y-12">
          
          {/* Developer Section */}
          <section className="bg-[#10111a] rounded-xl border border-white/10 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#f5c14b] mb-4">Who We Are</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Fact Checker AI is developed by <strong>Samyak Kothare</strong>. 
              Driven by a passion for truth and transparency in the digital age, this project was conceived as a response to the growing wave of misinformation spreading across social media and the web.
            </p>
          </section>

          {/* Mission Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#0c0d16] p-6 rounded-lg border border-white/5">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Democratizing Truth</h3>
                <p className="text-gray-400">
                  We believe that verifying facts shouldn't require a subscription or a degree in data science. We aim to provide powerful, professional-grade tools to everyone—free of charge.
                </p>
              </div>
              <div className="bg-[#0c0d16] p-6 rounded-lg border border-white/5">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Restoring Trust</h3>
                <p className="text-gray-400">
                  In a polarized world, objective reality is the common ground we stand on. By tracing sources and analyzing rhetoric without bias, we hope to restore trust in public discourse.
                </p>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="bg-[#10111a] rounded-xl border border-white/10 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">How We Developed This Web-App</h2>
            <div className="space-y-6 text-gray-300">
              <p>
                Fact Checker AI is built on the cutting edge of modern web technology. It leverages the immense capabilities of <strong>Advanced Generative AI</strong> to perform complex multi-modal reasoning.
              </p>
              
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#f5c14b] mt-1">⚡</span>
                  <div>
                    <strong>Advanced AI Models:</strong> The core brain of the operation, allowing for ultra-fast text analysis, scam detection, and logical fallacy identification.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5c14b] mt-1">⚛️</span>
                  <div>
                    <strong>Modern Frontend Architecture:</strong> Built for performance and reliability, ensuring a smooth, responsive, and accessible user experience.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5c14b] mt-1">🎨</span>
                  <div>
                    <strong>Responsive Design System:</strong> A utility-first approach that allowed us to craft a bespoke, immersive dark-themed UI that works on any device.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5c14b] mt-1">🎙️</span>
                  <div>
                    <strong>Real-Time Audio Processing:</strong> We utilize secure WebSocket connections to enable low-latency voice interaction directly in the browser.
                  </div>
                </li>
              </ul>

              <div className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-500 italic">
                This project demonstrates the potential of combining generative AI with rigorous sourcing protocols to create tools that serve the public good.
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;