import React from 'react';

const sources = [
  {
    category: "General Fact-Checking Hubs",
    description: "First-line checks for political and viral claims.",
    items: [
      { name: "Snopes", url: "https://www.snopes.com" },
      { name: "PolitiFact", url: "https://www.politifact.com" },
      { name: "FactCheck.org", url: "https://www.factcheck.org" },
      { name: "AP Fact Check", url: "https://apnews.com/hub/ap-fact-check" },
      { name: "Reuters Fact Check", url: "https://www.reuters.com/fact-check/" },
      { name: "AFP Fact Check", url: "https://factcheck.afp.com/" },
      { name: "Washington Post Fact Checker", url: "https://www.washingtonpost.com/news/fact-checker/" },
      { name: "Google Fact Check Explorer", url: "https://toolbox.google.com/factcheck/explorer" },
    ]
  },
  {
    category: "Science, Health & Climate",
    description: "Specialized sources for scientific and medical verification.",
    items: [
      { name: "Science Feedback", url: "https://sciencefeedback.co" },
      { name: "Cochrane", url: "https://www.cochrane.org" },
      { name: "PubMed Central", url: "https://pubmed.ncbi.nlm.nih.gov" },
      { name: "WHO Mythbusters", url: "https://www.who.int" },
    ]
  },
  {
    category: "Reference & Knowledge Bases",
    description: "Core structured sources for data and citations.",
    items: [
      { name: "Wikipedia", url: "https://www.wikipedia.org" },
      { name: "Wikidata", url: "https://www.wikidata.org" },
      { name: "Encyclopædia Britannica", url: "https://www.britannica.com" },
      { name: "Google Scholar", url: "https://scholar.google.com" },
      { name: "CrossRef", url: "https://www.crossref.org" },
    ]
  },
  {
    category: "Newswire & Major News",
    description: "Up-to-date factual reporting on breaking topics.",
    items: [
      { name: "Associated Press", url: "https://apnews.com" },
      { name: "Reuters", url: "https://www.reuters.com" },
      { name: "BBC News", url: "https://www.bbc.com/news" },
      { name: "The New York Times", url: "https://www.nytimes.com" },
      { name: "The Guardian", url: "https://www.theguardian.com" },
    ]
  }
];

interface TrustedSourcesPageProps {
  onBack: () => void;
}

const TrustedSourcesPage: React.FC<TrustedSourcesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#050509] text-gray-200 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center gap-4 mb-12">
           <button 
             onClick={onBack} 
             className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 group"
             aria-label="Back"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
           </button>
           <div>
             <h1 className="text-3xl font-bold text-gray-100">Trusted Sources</h1>
             <p className="text-gray-500 mt-1">Our database of verified information providers.</p>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sources.map((section, idx) => (
            <div key={idx} className="bg-[#10111a] rounded-xl border border-white/10 p-6 shadow-lg hover:border-[#f5c14b]/30 transition-colors">
              <h2 className="text-xl font-bold text-[#f5c14b] mb-2">{section.category}</h2>
              <p className="text-gray-500 text-sm mb-6 pb-4 border-b border-white/5">{section.description}</p>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-between group p-3 rounded-lg bg-[#050509] border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-200"
                    >
                      <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{item.name}</span>
                      <svg className="w-4 h-4 text-gray-600 group-hover:text-[#f5c14b] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedSourcesPage;