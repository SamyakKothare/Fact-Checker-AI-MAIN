import React, { useState, useCallback, useRef } from 'react';
// FIX: Import `Modality` for use in Live API configuration.
import { GoogleGenAI, Modality } from '@google/genai';
import type { LiveServerMessage, Blob } from '@google/genai';
import { checkFact, analyzeFallacies, traceMisinformation, detectScam } from './services/geminiService';
import type { FullFactCheckResponse, Fallacy, SourceTrace, Source, ScamAnalysis, Tool, HistoryItem } from './types';
import VerdictCard from './components/VerdictCard';
import FallacyAnalysisResult from './components/FallacyAnalysisResult';
import SourceTraceResult from './components/SourceTraceResult';
import ScamAnalysisResult from './components/ScamAnalysisResult';
import Spinner from './components/Spinner';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import TrustedSourcesPage from './components/TrustedSourcesPage';
import PricingPage from './components/PricingPage';
import AboutUsPage from './components/AboutUsPage';
import CareersPage from './components/CareersPage';
import TechnologyPage from './components/TechnologyPage';
import ApiDocsPage from './components/ApiDocsPage';
import LiveAnalysisPage from './components/LiveAnalysisPage';
import MediaCasesPage from './components/MediaCasesPage';
import DefenceCasesPage from './components/DefenceCasesPage';
import GovernmentCasesPage from './components/GovernmentCasesPage';

// Infer LiveSession type as it is not exported directly by the package
type LiveSession = Awaited<ReturnType<GoogleGenAI['live']['connect']>>;

// --- Helper functions for Gemini Live API ---
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- SVG Icons ---
const SparkleIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>);
const HistoryIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>);
const CheckIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>);
const ListIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>);
const ChevronDownIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>);
const MessageSquareIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const ImageIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>);
const MicIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>);
const AnalyzeIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 2v4"/><path d="M12 12v8"/><path d="m8.5 8.5-4 4"/><path d="M15.5 8.5 12 12l-3.5 3.5"/><path d="m8.5 15.5 4-4"/><path d="M15.5 15.5 12 12"/></svg>);
const TraceIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94a10.07 10.07 0 0 1-1.63 1.63"/><path d="M4.06 4.06a10.07 10.07 0 0 1 1.63-1.63"/><path d="M2.05 12.00a10.02 10.02 0 0 1 1.99-5.94"/><path d="M19.95 12.00a10.02 10.02 0 0 1-1.99 5.94"/><path d="M12 2.05a10.02 10.02 0 0 1 5.94 1.99"/><path d="M12 19.95a10.02 10.02 0 0 1-5.94-1.99"/><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M14.12 14.12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M8.46 8.46a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>);
const ShieldIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>);
const CheckSquareIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>);
const FileTextIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>);
const BrainIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7v0A2.5 2.5 0 0 0 7 9.5v0A2.5 2.5 0 0 1 4.5 12v0A2.5 2.5 0 0 1 7 14.5v0A2.5 2.5 0 0 0 9.5 17v0a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-2.5 2.5"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v0A2.5 2.5 0 0 0 14.5 7v0a2.5 2.5 0 0 1 2.5 2.5v0A2.5 2.5 0 0 0 19.5 12v0a2.5 2.5 0 0 0-2.5 2.5v0A2.5 2.5 0 0 1 14.5 17v0a2.5 2.5 0 0 0-2.5 2.5v0a2.5 2.5 0 0 0 2.5 2.5"/><path d="M9.5 2c0 2.5.5 5 2.5 5s2.5-2.5 2.5-5"/><path d="M14.5 22c0-2.5-.5-5-2.5-5s-2.5 2.5-2.5 5"/><path d="M12 12a2.5 2.5 0 0 0-2.5-2.5m0 5A2.5 2.5 0 0 1 12 12"/><path d="M12 12a2.5 2.5 0 0 1 2.5 2.5m0-5A2.5 2.5 0 0 0 12 12"/></svg>);
const TrashIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>);


const toolIcons: Record<Tool, React.ReactNode> = {
  'fact-check': <MessageSquareIcon className="w-4 h-4" />,
  'image': <ImageIcon className="w-4 h-4" />,
  'voice': <MicIcon className="w-4 h-4" />,
  'analyze': <AnalyzeIcon className="w-4 h-4" />,
  'trace': <TraceIcon className="w-4 h-4" />,
  'scam': <ShieldIcon className="w-4 h-4" />,
};

const App: React.FC = () => {
  // --- State Management ---
  const [showLanding, setShowLanding] = useState<boolean>(true);
  
  // Page States
  const [showTrustedSources, setShowTrustedSources] = useState<boolean>(false);
  const [showPricing, setShowPricing] = useState<boolean>(false);
  const [showAboutUs, setShowAboutUs] = useState<boolean>(false);
  const [showCareers, setShowCareers] = useState<boolean>(false);
  const [showTechnology, setShowTechnology] = useState<boolean>(false);
  const [showApiDocs, setShowApiDocs] = useState<boolean>(false);
  const [showLiveAnalysis, setShowLiveAnalysis] = useState<boolean>(false);
  const [showMediaCases, setShowMediaCases] = useState<boolean>(false);
  const [showDefenceCases, setShowDefenceCases] = useState<boolean>(false);
  const [showGovernmentCases, setShowGovernmentCases] = useState<boolean>(false);
  
  const [activeTool, setActiveTool] = useState<Tool>('fact-check');
  
  const [inputText, setInputText] = useState<string>('');
  const [image, setImage] = useState<{b64: string, mime: string} | null>(null);

  const [factCheckResult, setFactCheckResult] = useState<FullFactCheckResponse | null>(null);
  const [fallacyResult, setFallacyResult] = useState<Fallacy[] | null>(null);
  const [traceResult, setTraceResult] = useState<SourceTrace | null>(null);
  const [scamResult, setScamResult] = useState<ScamAnalysis | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState<boolean>(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Refs for Gemini Live API
  const aiRef = useRef<GoogleGenAI | null>(null);
  const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const transcriptRef = useRef<string>('');

  // --- Core Functions ---
  const clearResults = useCallback(() => {
    setFactCheckResult(null);
    setFallacyResult(null);
    setTraceResult(null);
    setScamResult(null);
    setSources([]);
    setError(null);
  }, []);
  
  const handleNewSession = useCallback(() => {
    setActiveTool('fact-check');
    setInputText('');
    setImage(null);
    clearResults();
    setHasRun(false);
    setActiveHistoryId(null);
    setIsLoading(false);
  }, [clearResults]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    handleNewSession();
  }, [handleNewSession]);
  
  const handleHistoryClick = (id: string) => {
    const item = history.find(h => h.id === id);
    if (item) {
      setActiveTool(item.tool);
      setInputText(item.queryText);
      setImage(item.image);
      setFactCheckResult(item.factCheckResult);
      setFallacyResult(item.fallacyResult);
      setTraceResult(item.traceResult);
      setScamResult(item.scamResult);
      setSources(item.sources);
      
      setHasRun(true);
      setError(null);
      setIsLoading(false);
      setActiveHistoryId(id);
    }
  };

  const handleToolChange = (tool: Tool) => {
    setActiveTool(tool);
    setInputText('');
    setImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage({ b64: base64String, mime: file.type });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleVoiceInput = async () => {
    if (isRecording) {
      // Stop recording
      if (sessionPromiseRef.current) {
        const session = await sessionPromiseRef.current;
        session.close(); // This will trigger the onclose callback for cleanup
      }
      return;
    }

    // Start recording
    setIsRecording(true);
    setInputText('');
    transcriptRef.current = '';
    setError(null);

    try {
      if (!aiRef.current) {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
      }
      const ai = aiRef.current;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // FIX: Cast `window` to `any` to resolve TypeScript error for vendor-prefixed `webkitAudioContext`.
      const inputAudioContext = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const source = inputAudioContext.createMediaStreamSource(stream);
      const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);

      scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
        const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
        const pcmBlob = createBlob(inputData);
        if (sessionPromiseRef.current) {
          sessionPromiseRef.current.then((session) => {
            session.sendRealtimeInput({ media: pcmBlob });
          });
        }
      };

      source.connect(scriptProcessor);
      scriptProcessor.connect(inputAudioContext.destination);

      cleanupRef.current = () => {
        scriptProcessor.disconnect();
        source.disconnect();
        inputAudioContext.close();
        stream.getTracks().forEach(track => track.stop());
      };
      
      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => console.debug('Live session opened.'),
          onmessage: (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              transcriptRef.current += text;
              setInputText(transcriptRef.current);
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('Live session error:', e);
            setError(`Voice recognition error: An API or network error occurred.`);
            if (cleanupRef.current) cleanupRef.current();
            setIsRecording(false);
          },
          onclose: () => {
            console.debug('Live session closed.');
            if (cleanupRef.current) {
              cleanupRef.current();
              cleanupRef.current = null;
            }
            sessionPromiseRef.current = null;
            setIsRecording(false);
          },
        },
        config: {
          // FIX: Added `responseModalities` as it's a required parameter for Live API connections.
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
        },
      });

    } catch (err) {
      console.error("Failed to start voice input:", err);
      setError(err instanceof Error ? `Failed to start microphone: ${err.message}` : 'An unknown error occurred.');
      setIsRecording(false);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    }
  };

  const handleSubmit = useCallback(async () => {
    const currentTool = activeTool === 'voice' ? 'fact-check' : activeTool;
    
    if (!inputText.trim() || (activeTool === 'image' && !image)) return;
    
    setIsLoading(true);
    clearResults();
    setHasRun(true);

    // Local variables to store results for history
    let newFactCheckResult: FullFactCheckResponse | null = null;
    let newFallacyResult: Fallacy[] | null = null;
    let newTraceResult: SourceTrace | null = null;
    let newScamResult: ScamAnalysis | null = null;
    let newSources: Source[] = [];

    try {
      if (currentTool === 'fact-check' || currentTool === 'image') {
        const { response, sources: fetchedSources } = await checkFact(inputText, image);
        setFactCheckResult(response);
        setSources(fetchedSources);
        newFactCheckResult = response;
        newSources = fetchedSources;
      } else if (currentTool === 'analyze') {
        const response = await analyzeFallacies(inputText);
        setFallacyResult(response);
        newFallacyResult = response;
      } else if (currentTool === 'trace') {
        const { response, sources: fetchedSources } = await traceMisinformation(inputText);
        setTraceResult(response);
        setSources(fetchedSources);
        newTraceResult = response;
        newSources = fetchedSources;
      } else if (currentTool === 'scam') {
        const response = await detectScam(inputText);
        setScamResult(response);
        newScamResult = response;
      }

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        tool: activeTool,
        queryText: inputText,
        image,
        timestamp: Date.now(),
        factCheckResult: newFactCheckResult,
        fallacyResult: newFallacyResult,
        traceResult: newTraceResult,
        scamResult: newScamResult,
        sources: newSources,
      };
      setHistory(prev => [newHistoryItem, ...prev]);
      setActiveHistoryId(newHistoryItem.id);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, image, activeTool, clearResults]);
  
  const isSubmitDisabled = isLoading || isRecording || !inputText.trim() || (activeTool === 'image' && !image);

  // --- Component Render ---
  const ToolButton: React.FC<{tool: Tool, label: string, icon: React.ReactNode}> = ({ tool, label, icon }) => (
    <button
      onClick={() => handleToolChange(tool)}
      className={`flex items-center justify-start md:justify-center gap-2 px-4 md:px-3 py-2 md:py-1.5 text-sm rounded-lg md:rounded-full transition-all duration-200 ${
        activeTool === tool
          ? 'bg-[#f5c14b] text-[#1a1200] font-semibold shadow-sm'
          : 'text-gray-400 font-medium hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  // Conditional Page Rendering
  if (showPricing) return <PricingPage onBack={() => setShowPricing(false)} />;
  if (showTrustedSources) return <TrustedSourcesPage onBack={() => setShowTrustedSources(false)} />;
  if (showAboutUs) return <AboutUsPage onBack={() => setShowAboutUs(false)} />;
  if (showCareers) return <CareersPage onBack={() => setShowCareers(false)} />;
  if (showTechnology) return <TechnologyPage onBack={() => setShowTechnology(false)} />;
  if (showApiDocs) return <ApiDocsPage onBack={() => setShowApiDocs(false)} />;
  if (showLiveAnalysis) return <LiveAnalysisPage onBack={() => setShowLiveAnalysis(false)} />;
  if (showMediaCases) return <MediaCasesPage onBack={() => setShowMediaCases(false)} />;
  if (showDefenceCases) return <DefenceCasesPage onBack={() => setShowDefenceCases(false)} />;
  if (showGovernmentCases) return <GovernmentCasesPage onBack={() => setShowGovernmentCases(false)} />;

  if (showLanding) {
    return (
      <LandingPage 
        onStart={() => setShowLanding(false)} 
        onTrustedSourcesClick={() => setShowTrustedSources(true)}
        onPricingClick={() => setShowPricing(true)}
        onAboutUsClick={() => setShowAboutUs(true)}
        onCareersClick={() => setShowCareers(true)}
        onTechnologyClick={() => setShowTechnology(true)}
        onApiDocsClick={() => setShowApiDocs(true)}
        onLiveAnalysisClick={() => setShowLiveAnalysis(true)}
        onMediaCasesClick={() => setShowMediaCases(true)}
        onDefenceCasesClick={() => setShowDefenceCases(true)}
        onGovernmentCasesClick={() => setShowGovernmentCases(true)}
      />
    );
  }

  return (
    <div className="flex h-screen font-sans overflow-hidden bg-[#050509] text-gray-300">
      {/* --- Sidebar --- */}
      <aside className={`bg-[#0a0b10] flex flex-col transition-all duration-300 ease-in-out border-r border-white/10 h-full overflow-y-auto ${isSidebarOpen ? 'w-64 p-6' : 'w-0 p-0 overflow-hidden'}`}>
        <div>
          <button onClick={() => setShowLanding(true)} className="flex items-center gap-2 mb-8 group whitespace-nowrap">
            <ShieldCheckIcon className="h-8 w-8 text-[#f5c14b] group-hover:scale-110 transition-transform flex-shrink-0" />
            <h1 className="text-xl font-bold text-gray-100">FACT CHECKER-AI</h1>
          </button>
          <nav className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                 <h2 className="text-sm font-semibold text-gray-500 flex items-center gap-2 whitespace-nowrap"><HistoryIcon className="h-5 w-5 text-gray-600"/> History</h2>
                 {history.length > 0 && (
                    <button 
                      onClick={handleClearHistory} 
                      className="p-1 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-colors"
                      aria-label="Clear all history"
                      title="Clear all history"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
              </div>
              {history.length === 0 ? (
                <p className="text-sm text-gray-600">No queries yet.</p>
              ) : (
                <ul className="space-y-1 -ml-2">
                  {history.map(item => (
                    <li key={item.id}>
                      <button 
                        onClick={() => handleHistoryClick(item.id)}
                        className={`w-full text-left p-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                            activeHistoryId === item.id 
                            ? 'bg-yellow-500/10 text-[#f5c14b] font-medium' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                        }`}
                      >
                        <span className="text-gray-500">{toolIcons[item.tool]}</span>
                        <span className="truncate flex-1">{item.queryText || 'Image Query'}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2 whitespace-nowrap"><ShieldCheckIcon className="h-5 w-5 text-gray-600"/> Trusted Sources</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <CheckSquareIcon className="h-4 w-4 text-gray-600 flex-shrink-0"/>
                  <a href="https://www.wikipedia.org/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#f5c14b] transition-colors">Wikipedia</a>
                </li>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <CheckSquareIcon className="h-4 w-4 text-gray-600 flex-shrink-0"/>
                  <a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#f5c14b] transition-colors">NASA</a>
                </li>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <CheckSquareIcon className="h-4 w-4 text-gray-600 flex-shrink-0"/>
                  <a href="https://www.isro.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#f5c14b] transition-colors">ISRO</a>
                </li>
                <li className="flex items-center gap-2 whitespace-nowrap">
                  <CheckSquareIcon className="h-4 w-4 text-gray-600 flex-shrink-0"/>
                  <a href="https://www.google.com/search?q=official+government+websites" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#f5c14b] transition-colors">Government Websites</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* --- Main Content with Header and Footer --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Background gradient applied to the main content area to mimic landing page */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#151628_0,#050509_52%,#020208_100%)] -z-10 pointer-events-none"></div>

        {/* --- Header --- */}
        <header className="flex justify-between items-center p-4 border-b border-white/10 bg-[#0a0b10]/80 backdrop-blur-md shadow-sm flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 rounded-md hover:bg-white/10 text-gray-400 transition-colors"
              aria-label="Toggle sidebar"
            >
              <ListIcon className="h-5 w-5"/>
            </button>
            <h2 className="text-lg font-semibold text-gray-100">Fact Checker</h2>
          </div>
          <button 
            onClick={handleNewSession}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#1a1200] bg-[#f5c14b] rounded-lg shadow-md hover:bg-[#ffda6c] transition-colors"
          >
            New Session
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </header>

        {/* --- Scrolling Main Area --- */}
        <div className="flex-1 overflow-y-auto flex flex-col">
            <main className="flex-1 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* --- Input Card --- */}
                <div className="bg-[#10111a] rounded-xl shadow-2xl p-4 md:p-6 mb-8 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-yellow-500/10 p-2 rounded-lg"><SparkleIcon className="h-6 w-6 text-[#f5c14b]"/></div>
                    <h3 className="text-xl font-bold text-gray-100">Submit a Claim for Verification</h3>
                </div>
                <div className="bg-[#050509] border border-white/5 rounded-xl md:rounded-full p-1 flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-1 mb-4">
                    <ToolButton tool="fact-check" label="Fact-Check" icon={<MessageSquareIcon className="w-4 h-4"/>} />
                    <ToolButton tool="image" label="Image" icon={<ImageIcon className="w-4 h-4"/>}/>
                    <ToolButton tool="voice" label="Voice" icon={<MicIcon className="w-4 h-4"/>}/>
                    <ToolButton tool="analyze" label="Analyze" icon={<AnalyzeIcon className="w-4 h-4"/>}/>
                    <ToolButton tool="trace" label="Trace Source" icon={<TraceIcon className="w-4 h-4"/>}/>
                    <ToolButton tool="scam" label="Scam Detector" icon={<ShieldIcon className="w-4 h-4"/>}/>
                </div>
                
                {activeTool === 'image' && (
                    <div className="mb-4">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-[#f5c14b] hover:file:bg-white/20"/>
                        {image && <img src={`data:${image.mime};base64,${image.b64}`} alt="Upload preview" className="mt-4 rounded-lg max-h-40 w-auto border border-white/10" />}
                    </div>
                )}
                
                <div className="relative">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                        activeTool === 'fact-check' ? 'Enter a statement, claim, or question to fact-check...'
                        : activeTool === 'image' ? 'Enter a claim about the image...'
                        : activeTool === 'voice' ? 'Click the microphone to start speaking...'
                        : activeTool === 'analyze' ? 'Enter an argument or article to analyze for rhetoric...'
                        : activeTool === 'trace' ? 'Enter a claim to trace its origin and spread...'
                        : 'Enter an email or message to detect scam tactics...'
                        }
                        className="w-full h-28 p-3 bg-[#050509] border border-white/10 rounded-md focus:ring-2 focus:ring-[#f5c14b]/50 focus:border-[#f5c14b] transition-all duration-200 resize-none text-gray-200 placeholder-gray-600"
                        disabled={isLoading || isRecording}
                    />
                    {activeTool === 'voice' && (
                        <button onClick={handleVoiceInput} className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors text-white ${ isRecording ? 'bg-red-500 animate-pulse' : 'bg-[#f5c14b] text-black'}`} aria-label={isRecording ? 'Stop' : 'Speak'}>
                        <MicIcon className="w-5 h-5"/>
                        </button>
                    )}
                </div>
                
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled}
                        className="flex items-center justify-center gap-2 px-6 py-3 font-bold text-[#1a1200] bg-[#f5c14b] rounded-lg shadow-md hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                        {isLoading ? <><Spinner /> Analyzing...</> : <><SparkleIcon className="w-5 h-5"/> {
                            activeTool === 'analyze' ? 'Analyze Rhetoric' :
                            activeTool === 'trace' ? 'Trace Source' :
                            activeTool === 'scam' ? 'Detect Scam' : 'Fact Check'
                        }</>}
                    </button>
                </div>
                </div>
                
                {/* --- Results / Welcome --- */}
                {error && (
                <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded-lg animate-fade-in">
                    <h3 className="font-bold text-red-100">Error</h3>
                    <p>{error}</p>
                </div>
                )}
                
                {hasRun && !isLoading && !error && (
                <div className="animate-fade-in">
                    {factCheckResult && <VerdictCard result={factCheckResult} sources={sources} />}
                    {fallacyResult && <FallacyAnalysisResult result={fallacyResult} />}
                    {traceResult && <SourceTraceResult result={traceResult} sources={sources} />}
                    {scamResult && <ScamAnalysisResult result={scamResult} />}
                </div>
                )}
                
                {!hasRun && !isLoading && (
                <div className="text-center bg-[#10111a] p-8 rounded-xl border border-white/10 shadow-lg animate-fade-in">
                    <SparkleIcon className="h-12 w-12 text-[#f5c14b] mx-auto mb-4"/>
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Welcome to FACT CHECKER-AI</h2>
                    <p className="text-gray-400 mb-6 max-w-2xl mx-auto">Your intelligent assistant for navigating the complex information landscape. Get started by selecting a tool above and providing a claim, image, or text. Our AI will analyze your query and provide a comprehensive, evidence-based report.</p>
                    <div className="grid md:grid-cols-3 gap-4 text-left">
                        <div className="bg-[#050509] p-4 rounded-lg border border-white/10">
                            <FileTextIcon className="h-6 w-6 text-[#f5c14b] mb-2"/>
                            <h3 className="font-semibold text-gray-200">Fact-Check Text</h3>
                            <p className="text-sm text-gray-500">Verify statements, claims, and questions against trusted sources.</p>
                        </div>
                        <div className="bg-[#050509] p-4 rounded-lg border border-white/10">
                            <BrainIcon className="h-6 w-6 text-[#f5c14b] mb-2"/>
                            <h3 className="font-semibold text-gray-200">Analyze Rhetoric</h3>
                            <p className="text-sm text-gray-500">Detect logical fallacies in arguments, articles, or speeches.</p>
                        </div>
                        <div className="bg-[#050509] p-4 rounded-lg border border-white/10">
                            <ShieldIcon className="h-6 w-6 text-[#f5c14b] mb-2"/>
                            <h3 className="font-semibold text-gray-200">Detect Scams</h3>
                            <p className="text-sm text-gray-500">Analyze emails and messages for common scam tactics.</p>
                        </div>
                    </div>
                </div>
                )}
            </div>
            </main>
            
            {/* --- Footer --- */}
            <Footer 
                onTrustedSourcesClick={() => setShowTrustedSources(true)} 
                onPricingClick={() => setShowPricing(true)}
                onAboutUsClick={() => setShowAboutUs(true)}
                onCareersClick={() => setShowCareers(true)}
                onTechnologyClick={() => setShowTechnology(true)}
                onApiDocsClick={() => setShowApiDocs(true)}
                onLiveAnalysisClick={() => setShowLiveAnalysis(true)}
                onMediaCasesClick={() => setShowMediaCases(true)}
                onDefenceCasesClick={() => setShowDefenceCases(true)}
                onGovernmentCasesClick={() => setShowGovernmentCases(true)}
            />
        </div>
      </div>
    </div>
  );
};

export default App;