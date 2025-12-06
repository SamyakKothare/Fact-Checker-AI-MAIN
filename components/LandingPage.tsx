import React from 'react';
import Footer from './Footer';
import { Component as MorphingCardStack, CardData } from './ui/morphing-card-stack';
import { ScanSearch, ShieldAlert, GitGraph, BrainCircuit, HelpCircle, FileAudio, Database } from 'lucide-react';

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
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const featuresData: CardData[] = [
  {
    id: "1",
    title: "Multi-Modal Verification",
    description: "Cross-reference text, verify spoken audio, and analyze images for manipulation against trusted global databases like NASA, ISRO, and Wikipedia.",
    icon: <ScanSearch className="w-6 h-6" />,
    color: "#3b82f6" // Blue
  },
  {
    id: "2",
    title: "Scam Detector",
    description: "Stay safe from fraud. Analyze suspicious emails, messages, or offers to identify phishing attempts, urgency tactics, and financial scams instantly.",
    icon: <ShieldAlert className="w-6 h-6" />,
    color: "#ef4444" // Red
  },
  {
    id: "3",
    title: "Source Tracing",
    description: "Don't just verify facts; understand their journey. Visualize how claims spread from their origin node through amplifiers to the wider web.",
    icon: <GitGraph className="w-6 h-6" />,
    color: "#eab308" // Yellow/Gold
  },
  {
    id: "4",
    title: "Rhetoric & Logic Analysis",
    description: "Look deeper than the facts. Detect logical fallacies, emotional manipulation, and rhetorical tricks in political speeches, articles, or debates.",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "#a855f7" // Purple
  }
];

const faqData: CardData[] = [
  {
    id: "faq-1",
    title: "Is it free to use?",
    description: "Yes, Fact Checker AI leverages the Gemini API to provide free, high-quality analysis for researchers, students, and the general public.",
    icon: <HelpCircle className="w-6 h-6" />,
    color: "#3b82f6"
  },
  {
    id: "faq-2",
    title: "How does the Scam Detector work?",
    description: "It analyzes the language patterns in messages for red flags like artificial urgency, requests for personal info, and known scam scripts.",
    icon: <ShieldAlert className="w-6 h-6" />,
    color: "#ef4444"
  },
  {
    id: "faq-3",
    title: "Can I analyze audio or images?",
    description: "Absolutely. You can upload images to check for AI manipulation or record audio to verify spoken claims directly through the browser.",
    icon: <FileAudio className="w-6 h-6" />,
    color: "#eab308"
  },
  {
    id: "faq-4",
    title: "What data do you store?",
    description: "We prioritize user privacy. Your queries and uploads are processed in real-time for analysis and are not permanently stored on our servers.",
    icon: <Database className="w-6 h-6" />,
    color: "#a855f7"
  }
];

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
    onGovernmentCasesClick,
    onPrivacyClick,
    onTermsClick
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
               <div className="flex flex-col items-center justify-center w-full">
                <h3 className="text-sm font-bold text-[#f5c14b] mb-8 tracking-widest text-center uppercase">Our Top Features</h3>
                <MorphingCardStack 
                  cards={featuresData} 
                  defaultLayout="stack"
                  showToggle={false}
                  className="w-full flex flex-col items-center"
                />
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
            
            <MorphingCardStack 
              cards={featuresData} 
              defaultLayout="grid"
              className="py-4"
            />
            
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
            <MorphingCardStack 
              cards={faqData} 
              defaultLayout="grid"
              className="py-4"
            />
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
        onPrivacyClick={onPrivacyClick}
        onTermsClick={onTermsClick}
      />
    </div>
  );
};

export default LandingPage;