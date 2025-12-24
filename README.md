<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1yhlqxNQShUiKXf7lwqD-YeoecjogHage

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Project Report: FACT CHECKER-AI
Status: Public Beta v1.0.2
Lead Engineer: Senior AI/Frontend Architect
Core Engine: Google Gemini 2.5 Flash
1. Project Vision & Objective
FACT CHECKER-AI is built to solve the "Infodemic" problem. It provides an all-in-one suite for verifying claims, analyzing the logic of arguments, detecting phishing scams, and visualizing the spread of misinformation across the web. The platform prioritizes high-speed, citation-backed analysis with a privacy-first, transient data processing model.
2. Technical Stack
Framework: React 19 (using modern hooks and concurrent rendering features).
Styling: Tailwind CSS (utility-first, custom design system).
AI Orchestration: @google/genai SDK for interaction with Gemini 2.5 series models.
Animations: Framer Motion (for fluid transitions and the Morphing Card Stack).
Data Visualization: D3.js (for complex propagation network graphs and donut charts).
Icons: Lucide React (standardized iconography).
Audio Processing: Web MediaRecorder API for voice input and native Web Speech API for TTS.
3. Core Modules & Functionality
A. Multi-Modal Fact-Checking
Text Analysis: Processes claims by grounding them in real-time Google Search results.
Image Analysis: Uses Gemini's vision capabilities to detect digital manipulation, AI-generation markers, or contextual inconsistencies.
Grounding Protocol: Prioritizes a "Strict Search Protocol" against a curated whitelist of trusted sources (NASA, ISRO, Wikipedia, Reuters, AP, etc.) before broadening to general web results.
B. Rhetoric & Logic Engine
Fallacy Detection: Analyzes text for logical errors (e.g., Ad Hominem, Strawman, Appeal to Emotion).
Explainable AI: Provides the specific excerpt where the fallacy occurred and an educational explanation of the error.
C. Source Tracing & Propagation Visualization
Narrative Mapping: Traces the "Patient Zero" of a claim.
Interactive Graph: A D3-powered directed graph categorizing entities as Origins, Amplifiers, or Debunkers.
BFS Layering: Implements a Breadth-First Search algorithm to determine the vertical hierarchy of information flow.
D. Scam Detector
Heuristic Pattern Matching: Identifies common fraud tactics such as artificial urgency, emotional manipulation, and suspicious link structures.
Risk Assessment: Returns a verdict (LIKELY_SCAM, POTENTIAL_SCAM, UNLIKELY_SCAM) with a detailed breakdown of red flags.
E. Voice & Accessibility
Voice Input: Real-time transcription using Gemini’s native audio processing.
Text-to-Speech (TTS): Integrated "Listen" feature for all summaries and explanations to support auditory learners and accessibility.
4. UI/UX Design Language
Immersive Dark Theme
Palette: Deep space navy (#050509), rich indigo, and high-contrast "Truth Yellow" (#f5c14b).
Hero Animation: An abstract AI visualization featuring 5 dynamic, keyframe-animated bars (simulating real-time data processing) and a glowing "AI Analysis Active" status pill.
Morphing Card Stack: A custom UI component that allows users to toggle between Stack, Grid, and List layouts for features and FAQs, using Framer Motion for layout-level transitions.
User Flow
Landing Page: High-conversion hero section with industry-specific case studies (Media, Defense, Government).
Verification Dashboard: A clean, sidebar-managed workspace.
Persistence: Local-storage-based session history allows users to revisit past analyses without server-side data retention.
5. Security, Privacy & Ethics
Transient Data Model: User queries and uploaded images are processed in memory. No permanent database of user queries exists, mitigating data breach risks.
Transparency: Every verdict includes a Confidence Score (0-100%) and a citation list, preventing "Black Box" AI decisions.
Privacy Policy: Comprehensive GDPR-aligned policy accessible directly from the footer.
6. Project Architecture (File Structure)
App.tsx: Main routing and global state controller (History, Tool switching).
geminiService.ts: The central AI logic layer handling prompt engineering and JSON parsing.
types.ts: Strictly typed interfaces for all API responses and graph data.
components/:
LandingPage.tsx: The animated entryway.
PropagationGraph.tsx: Complex D3 logic for network visualization.
VerdictCard.tsx: The primary result display for fact-checks.
Footer.tsx: Professional-grade footer with deep linking.
ui/morphing-card-stack.tsx: Advanced layout-shifting component.
7. Future Roadmap
Video Forensics: Frame-by-frame deepfake detection (In development).
Air-Gapped Deployment: Versioning for secure government environments.
Subscription Model: Tiered access for high-volume enterprise API users.
