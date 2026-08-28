import React, { useState, useEffect, useRef } from 'react';
import { useVSCode } from '../../context/VSCodeContext';

export const SearchPanel: React.FC = () => {
  const { files, openTab } = useVSCode();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const searchResults = searchTerm.trim() === '' 
    ? [] 
    : files.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        f.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="h-full flex flex-col bg-[#252526] text-[#cccccc] p-3 select-none text-xs">
      <div className="text-[11px] font-bold uppercase tracking-wider text-[#bbbbbb] mb-3">
        Search Workspace
      </div>

      <div className="relative mb-3">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search (e.g. React, Shopify, experience)"
          className="w-full bg-[#3c3c3c]/50 border border-[#3c3c3c] text-white px-2 py-1 text-xs rounded focus:outline-none focus:border-[#007acc]"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')} 
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#858585] hover:text-white"
          >
            <i className="codicon codicon-close"></i>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {searchTerm && searchResults.length === 0 && (
          <div className="text-[#858585] text-xs py-4 text-center">
            No results found for "{searchTerm}"
          </div>
        )}

        {searchResults.map(file => (
          <div
            key={file.id}
            onClick={() => openTab(file)}
            className="p-2 bg-[#2d2d2d]/60 rounded border border-[#3c3c3c]/50 cursor-pointer hover:border-[#007acc] transition"
          >
            <div className="flex items-center space-x-1 font-bold text-[#9cdcfe] mb-1">
              <i className="codicon codicon-file text-xs"></i>
              <span>{file.path}</span>
            </div>
            <p className="text-[11px] text-[#cccccc]/70 line-clamp-2 font-mono bg-[#1e1e1e] p-1 rounded">
              {file.content.substring(0, 120)}...
            </p>
          </div>
        ))}

        {!searchTerm && (
          <div className="text-[#858585] text-[11px] space-y-2">
            <p>Type to search across all portfolio files, projects, and skills.</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {['Shopify', 'React', 'TypeScript', 'Make.com', 'Imrozia'].map(term => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="bg-[#333333] hover:bg-[#007acc] hover:text-white px-2 py-0.5 rounded text-[10px]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
