import React from 'react';
import type { Fallacy } from '../types';
import Feedback from './Feedback';

const FallacyAnalysisResult: React.FC<{ result: Fallacy[] }> = ({ result }) => {
  if (result.length === 0) {
    return (
      <div className="bg-[#10111a] rounded-xl shadow-lg p-6 border border-white/10 text-center">
        <h2 className="text-xl font-bold text-green-400 mb-2">No Fallacies Detected</h2>
        <p className="text-gray-400">The provided text appears to be logically sound.</p>
        <Feedback source="Fallacy Analysis" />
      </div>
    );
  }

  return (
    <div className="bg-[#10111a] rounded-xl shadow-lg p-6 border border-white/10">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Logical Fallacies Detected</h2>
      <div className="space-y-6">
        {result.map((fallacy, index) => (
          <div key={index} className="bg-[#050509] border border-white/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#f5c14b] mb-2">{fallacy.fallacyName}</h3>
            <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400 my-3">
              "{fallacy.excerpt}"
            </blockquote>
            <p className="text-gray-300 text-sm">{fallacy.explanation}</p>
          </div>
        ))}
      </div>
      <Feedback source="Fallacy Analysis" />
    </div>
  );
};

export default FallacyAnalysisResult;