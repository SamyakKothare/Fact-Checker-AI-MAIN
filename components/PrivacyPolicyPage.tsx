import React from 'react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
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
             <h1 className="text-3xl font-bold text-gray-100">Privacy Policy</h1>
             <p className="text-gray-500 mt-1">Last Updated: October 26, 2025</p>
           </div>
        </header>

        <div className="space-y-8 text-gray-300 leading-relaxed bg-[#10111a] p-8 rounded-xl border border-white/10 shadow-lg">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction and Scope</h2>
            <p>
              Welcome to Fact Checker AI ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered fact-checking application, browser extensions, or API services (collectively, the "Service").
            </p>
            <p className="mt-2">
              We are committed to protecting your privacy. By using the Service, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access the application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Voluntary Content:</strong> We process the text, images, and audio you voluntarily submit for analysis. This includes claims you want fact-checked, documents for rhetoric analysis, or files for scam detection.</li>
              <li><strong>Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate the Service. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, and timestamps.</li>
              <li><strong>Local Storage:</strong> We use your browser's local storage to save your session history on your device. This data remains on your device and is not synchronized to our servers unless explicitly stated.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect or receive:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>To provide the core functionality of the Service (e.g., sending your text to the AI model for verification).</li>
              <li>To detect and prevent fraudulent use or abuse of the Service (e.g., rate limiting).</li>
              <li>To improve user experience and analyze system performance.</li>
              <li>To comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Sharing and Third-Party Processors</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. However, to provide our Service, we share data with the following trusted third-party service providers:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Google Gemini API:</strong> The core analysis of text, images, and audio is performed by Google's Generative AI models. When you submit a query, the content is transmitted securely to Google for processing. Google's use of this data is governed by the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#f5c14b] hover:underline">Google Privacy Policy</a> and their API terms.
              </li>
              <li>
                <strong>Hosting Providers:</strong> Our application is hosted on secure cloud infrastructure which may log basic network request data for security purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Retention</h2>
            <p>
              <strong>Submitted Content:</strong> We aim for a "transient processing" model. The text, images, and audio you submit are sent to the AI model for analysis and the results are returned to you. We do not permanently store your raw submission content on our servers after the session is closed, although our AI provider (Google) may retain data for a limited period for abuse monitoring as per their policies.
            </p>
            <p className="mt-2">
              <strong>Logs:</strong> Technical logs (IP addresses, error reports) are retained for up to 30 days for security auditing and debugging, after which they are deleted or anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. User Rights</h2>
            <p>Depending on your location (e.g., EEA, UK, California), you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>The right to request access to the personal data we hold about you.</li>
              <li>The right to request deletion of your data.</li>
              <li>The right to restrict processing or object to data processing.</li>
            </ul>
            <p className="mt-2">To exercise these rights, please contact us at the email provided below.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Security Measures</h2>
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. This includes using HTTPS/TLS encryption for all data in transit between your browser and our servers/APIs. However, please remember that no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Children's Privacy</h2>
            <p>
              Our Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, or if you wish to exercise your data rights, you may email us at:
            </p>
            <p className="mt-2 font-mono text-[#f5c14b]">privacy@factchecker-ai.com</p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;