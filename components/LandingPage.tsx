import React from 'react';
import Footer from './Footer';

interface LandingPageProps {
  onStart: () => void;
  onTrustedSourcesClick: () => void;
  onPricingClick: () => void;
  onAboutUsClick: () => void;
  onCareersClick: () => void;
  onTechnologyClick: () => void;
  onApiDocsClick: () => void;
  onLiveAnalysisClick: () => void;
  onMediaCasesClick: () => void;
  onDefenceCasesClick: () => void;
  onGovernmentCasesClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
    onStart, 
    onTrustedSourcesClick, 
    onPricingClick, 
    onAboutUsClick,
    onCareersClick,
    onTechnologyClick,
    onApiDocsClick,
    onLiveAnalysisClick,
    onMediaCasesClick,
    onDefenceCasesClick,
    onGovernmentCasesClick
}) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page-theme">
      <header className="lp-site-header">
        <div className="lp-container lp-header-inner">
          <div className="lp-logo">FACT CHECKER-AI</div>
          <nav className="lp-nav-links">
            <a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Features</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onStart(); }}>Get Started</a>
          </nav>
          <button onClick={onStart} className="lp-btn lp-btn-outline">Start Fact Checking</button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="lp-hero">
          <div className="lp-container lp-hero-inner">
            <div className="lp-hero-copy">
              <p className="lp-eyebrow">AI-Powered Fact-Checking & Analysis</p>
              <h1>Empowering Truth in the Digital Age</h1>
              <p className="lp-hero-sub">
                Leveraging advanced AI to verify claims, detect scams, analyze images, and trace misinformation with unparalleled accuracy.
              </p>
              <div className="lp-hero-actions">
                <button onClick={onStart} className="lp-btn lp-btn-primary">Start Your Fact-Check</button>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="lp-btn lp-btn-ghost">See How It Works</a>
              </div>
              <p className="lp-hero-note">No installation required. Works in any modern browser.</p>
            </div>
            <div className="lp-hero-media">
              <div className="lp-hero-card relative overflow-hidden flex flex-col items-center justify-center p-8 text-center bg-gray-900 border border-gray-800 rounded-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
                 <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                 
                 <div className="relative z-10 flex gap-4 items-end mb-6 h-24">
                    <div className="w-3 bg-blue-500/60 rounded-t-sm animate-[pulse_2s_ease-in-out_infinite]" style={{height: '60%'}}></div>
                    <div className="w-3 bg-indigo-500/60 rounded-t-sm animate-[pulse_3s_ease-in-out_infinite]" style={{height: '85%'}}></div>
                    <div className="w-3 bg-[#f5c14b]/80 rounded-t-sm animate-[pulse_1.5s_ease-in-out_infinite]" style={{height: '100%', boxShadow: '0 0 15px rgba(245, 193, 75, 0.4)'}}></div>
                    <div className="w-3 bg-purple-500/60 rounded-t-sm animate-[pulse_2.5s_ease-in-out_infinite]" style={{height: '45%'}}></div>
                    <div className="w-3 bg-pink-500/60 rounded-t-sm animate-[pulse_2s_ease-in-out_infinite]" style={{height: '70%'}}></div>
                 </div>
                 
                 <div className="relative z-10 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#f5c14b] rounded-full animate-ping"></div>
                    <span className="text-xs font-mono text-gray-300 tracking-wider">AI ANALYSIS ACTIVE</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features band */}
        <section id="features" className="lp-features">
          <div className="lp-container">
            <div className="lp-section-header">
              <h2>Advanced Tools for Digital Truth</h2>
              <p>A complete suite of analysis tools designed to combat misinformation, fraud, and manipulation.</p>
            </div>
            <div className="lp-feature-grid">
              <article className="lp-feature-card">
                <h3>🔍 Multi-Modal Verification</h3>
                <p>Cross-reference text, verify spoken audio, and analyze images for manipulation against trusted global databases like NASA, ISRO, and Wikipedia.</p>
              </article>
              <article className="lp-feature-card">
                <h3>🛡️ Scam Detector</h3>
                <p>Stay safe from fraud. Analyze suspicious emails, messages, or offers to identify phishing attempts, urgency tactics, and financial scams instantly.</p>
              </article>
              <article className="lp-feature-card">
                <h3>🕸️ Source Tracing</h3>
                <p>Don't just verify facts; understand their journey. Visualize how claims spread from their origin node through amplifiers to the wider web.</p>
              </article>
              <article className="lp-feature-card">
                <h3>🧠 Rhetoric & Logic Analysis</h3>
                <p>Look deeper than the facts. Detect logical fallacies, emotional manipulation, and rhetorical tricks in political speeches, articles, or debates.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Split sections */}
        <section className="lp-split-section">
          <div className="lp-container lp-split-inner">
            <div className="lp-split-text">
              <h2>Real-time AI Analysis</h2>
              <p>Whether you have a suspicious screenshot, a voice recording from a messaging app, or a forward text chain, our Multi-Modal engine can process it. We analyze the content type, context, and metadata to give you a comprehensive verdict in seconds.</p>
            </div>
            <div className="lp-split-media">
              <div className="lp-split-card p-6">
                <div className="text-left w-full">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
                    <div className="h-32 bg-gray-800 rounded border border-gray-700 flex items-center justify-center text-gray-500">
                        Voice & Image Compatible
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-split-section lp-split-alt">
          <div className="lp-container lp-split-inner">
            <div className="lp-split-media">
              <div className="lp-split-card p-6 flex items-center justify-center">
                 <span className="text-6xl">📝</span>
              </div>
            </div>
            <div className="lp-split-text">
              <h2>Transparent, Citation-Backed Results</h2>
              <p>We believe in explainable AI. Every analysis comes with a confidence score, a reasoning breakdown, and direct links to the trusted sources we used (like government websites or reputable news) so you can verify the information yourself.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="lp-faq">
          <div className="lp-container">
            <h2>Frequently asked questions</h2>
            <div className="lp-faq-grid">
              <div className="lp-faq-item">
                <h3>Is it free to use?</h3>
                <p>Yes, Fact Checker AI leverages the Gemini API to provide free, high-quality analysis for researchers, students, and the general public.</p>
              </div>
              <div className="lp-faq-item">
                <h3>How does the Scam Detector work?</h3>
                <p>It analyzes the language patterns in messages for red flags like artificial urgency, requests for personal info, and known scam scripts.</p>
              </div>
              <div className="lp-faq-item">
                <h3>Can I analyze audio or images?</h3>
                <p>Absolutely. You can upload images to check for AI manipulation or record audio to verify spoken claims directly through the browser.</p>
              </div>
              <div className="lp-faq-item">
                <h3>What data do you store?</h3>
                <p>We prioritize user privacy. Your queries and uploads are processed in real-time for analysis and are not permanently stored on our servers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="lp-cta">
          <div className="lp-container lp-cta-inner">
            <div>
              <h2>Ready to verify reality?</h2>
              <p>Join thousands of users making the internet a safer, more truthful place.</p>
            </div>
            <button onClick={onStart} className="lp-btn lp-btn-primary">Start Fact Checking</button>
          </div>
        </section>
      </main>

      <Footer 
        onTrustedSourcesClick={onTrustedSourcesClick} 
        onPricingClick={onPricingClick} 
        onAboutUsClick={onAboutUsClick}
        onCareersClick={onCareersClick}
        onTechnologyClick={onTechnologyClick}
        onApiDocsClick={onApiDocsClick}
        onLiveAnalysisClick={onLiveAnalysisClick}
        onMediaCasesClick={onMediaCasesClick}
        onDefenceCasesClick={onDefenceCasesClick}
        onGovernmentCasesClick={onGovernmentCasesClick}
      />
    </div>
  );
};

export default LandingPage;