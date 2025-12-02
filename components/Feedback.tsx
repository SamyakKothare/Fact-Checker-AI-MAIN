import React, { useState } from 'react';

interface FeedbackProps {
  source: string; // e.g., 'Fact Check', 'Trace Source'
}

const Feedback: React.FC<FeedbackProps> = ({ source }) => {
  const [hasFeedback, setHasFeedback] = useState(false);
  const [isPositive, setIsPositive] = useState<boolean | null>(null);

  const handleFeedback = (positive: boolean) => {
    // Log to console as requested
    console.log(`[Feedback] User rated "${source}" as ${positive ? 'Helpful' : 'Not Helpful'}`);
    
    setIsPositive(positive);
    setHasFeedback(true);
  };

  return (
    <div className="mt-6 pt-4 border-t border-white/5 flex flex-col items-center justify-center animate-fade-in">
      {!hasFeedback ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Was this analysis helpful?</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleFeedback(true)}
              className="px-3 py-1 text-xs font-semibold text-green-400 bg-green-900/20 border border-green-800/50 rounded-full hover:bg-green-900/40 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => handleFeedback(false)}
              className="px-3 py-1 text-xs font-semibold text-red-400 bg-red-900/20 border border-red-800/50 rounded-full hover:bg-red-900/40 transition-colors"
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-400 italic flex items-center gap-2 animate-fade-in">
          {isPositive ? (
            <span className="text-green-400">Thanks for your feedback!</span>
          ) : (
            <span className="text-gray-400">Thanks, we'll try to improve.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Feedback;