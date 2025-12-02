import React from 'react';
import type { Source } from '../types';

interface SourceLinkProps {
  source: Source;
}

const SourceLink: React.FC<SourceLinkProps> = ({ source }) => {
  const displayUrl = source.uri.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];

  return (
    <a
      href={source.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#050509] hover:bg-white/10 p-4 rounded-lg transition-colors duration-200 group border border-white/10"
    >
      <p className="text-[#f5c14b] font-semibold truncate group-hover:underline">
        {source.title}
      </p>
      <p className="text-gray-500 text-sm truncate">{displayUrl}</p>
    </a>
  );
};

export default SourceLink;