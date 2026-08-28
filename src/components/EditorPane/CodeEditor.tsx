import React, { useState } from 'react';
import type { FileItem } from '../../types/vscode';

interface CodeEditorProps {
  file: FileItem;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ file }) => {
  const [activeLine, setActiveLine] = useState<number>(1);
  const lines = file.content.split('\n');

  const renderHighlightedLine = (line: string, type: string) => {
    if (!line) return <span>&nbsp;</span>;

    // Fast, accurate Dark+ syntax coloring using regex token rules
    if (type === 'json') {
      const parts = line.split(/("[^"]*")|(\b\d+\b)|(true|false|null)/g).filter(Boolean);
      return parts.map((part, idx) => {
        if (part.startsWith('"')) {
          if (part.endsWith('":')) {
            return <span key={idx} className="text-[#9cdcfe] font-semibold">{part}</span>;
          }
          return <span key={idx} className="text-[#ce9178]">{part}</span>;
        }
        if (part === 'true' || part === 'false' || part === 'null') {
          return <span key={idx} className="text-[#569cd6] font-bold">{part}</span>;
        }
        if (/^\d+$/.test(part)) {
          return <span key={idx} className="text-[#b5cea8]">{part}</span>;
        }
        return <span key={idx} className="text-[#d4d4d4]">{part}</span>;
      });
    }

    if (type === 'typescript' || type === 'tsx') {
      const tokens = line.split(/(\/\*[\s\S]*?\*\/|\/\/.+$)|("[^"]*"|'[^']*'|`[^`]*`)|(\b(?:import|export|from|const|let|var|return|interface|type|function|default|class|extends|implements|new|if|else|switch|case|try|catch|await|async)\b)|(\b\d+\b)/gm).filter(Boolean);
      
      return tokens.map((token, idx) => {
        if (token.startsWith('//') || token.startsWith('/*') || token.startsWith('/**')) {
          return <span key={idx} className="text-[#6a9955] italic">{token}</span>;
        }
        if (token.startsWith('"') || token.startsWith("'") || token.startsWith('`')) {
          return <span key={idx} className="text-[#ce9178]">{token}</span>;
        }
        if (/^(import|export|from|const|let|var|return|interface|type|function|default|class|extends|implements|new|if|else|switch|case|try|catch|await|async)$/.test(token)) {
          return <span key={idx} className="text-[#569cd6] font-bold">{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={idx} className="text-[#b5cea8]">{token}</span>;
        }
        if (/[A-Z][a-zA-Z0-9]*/.test(token) && !token.startsWith('<')) {
          return <span key={idx} className="text-[#4ec9b0] font-semibold">{token}</span>;
        }
        if (/\b[a-zA-Z_][a-zA-Z0-9_]*(?=\()/.test(token)) {
          return <span key={idx} className="text-[#dcdcaa]">{token}</span>;
        }
        return <span key={idx} className="text-[#d4d4d4]">{token}</span>;
      });
    }

    // Markdown raw text formatting
    if (type === 'markdown') {
      if (line.startsWith('#')) {
        return <span className="text-[#569cd6] font-bold">{line}</span>;
      }
      if (line.startsWith('>')) {
        return <span className="text-[#6a9955] italic">{line}</span>;
      }
      if (line.startsWith('-') || line.startsWith('*')) {
        return <span className="text-[#ce9178]">{line}</span>;
      }
      return <span className="text-[#d4d4d4]">{line}</span>;
    }

    return <span className="text-[#d4d4d4]">{line}</span>;
  };

  return (
    <div className="flex-1 flex bg-[#1e1e1e] text-[#cccccc] font-mono text-xs overflow-auto leading-relaxed select-text">
      {/* Line Numbers Column */}
      <div className="w-12 py-3 bg-[#1e1e1e] text-[#858585] text-right pr-3 select-none shrink-0 border-r border-[#2d2d2d]/30">
        {lines.map((_, i) => {
          const lineNum = i + 1;
          const isCurrent = lineNum === activeLine;
          return (
            <div
              key={i}
              onClick={() => setActiveLine(lineNum)}
              className={`h-5 cursor-pointer leading-5 ${isCurrent ? 'text-white font-bold' : 'hover:text-[#cccccc]'}`}
            >
              {lineNum}
            </div>
          );
        })}
      </div>

      {/* Code Text Area */}
      <div className="flex-1 py-3 px-4 overflow-x-auto min-w-0">
        {lines.map((line, i) => {
          const lineNum = i + 1;
          const isCurrent = lineNum === activeLine;
          return (
            <div
              key={i}
              onClick={() => setActiveLine(lineNum)}
              className={`h-5 flex items-center whitespace-pre leading-5 ${
                isCurrent ? 'bg-[#282828] border-l-2 border-[#007acc] -ml-4 pl-3' : 'hover:bg-[#2a2d2e]/30'
              }`}
            >
              {renderHighlightedLine(line, file.type)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
