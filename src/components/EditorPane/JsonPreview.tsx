import React, { useState, useMemo } from 'react';
import type { FileItem } from '../../types/vscode';
import { useVSCode } from '../../context/VSCodeContext';
import { ContactFormEditor } from './ContactFormEditor';

interface JsonPreviewProps {
  file: FileItem;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ file }) => {
  const { addToast } = useVSCode();
  const [viewMode, setViewMode] = useState<'visual' | 'tree'>('visual');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({
    'root': true,
    'root.skills': true,
  });

  // If it's contact.json, delegate directly to ContactFormEditor
  if (file.name === 'contact.json') {
    return <ContactFormEditor />;
  }

  // Parse JSON content safely
  let parsedData: any = null;
  let parseError: string | null = null;
  try {
    parsedData = JSON.parse(file.content);
  } catch (err: any) {
    parseError = err.message || 'Invalid JSON syntax';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    addToast(`Copied ${file.name} to clipboard`, 'success', 'JSON Preview');
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = (path: string) => {
    setExpandedKeys(prev => ({
      ...prev,
      [path]: prev[path] === undefined ? false : !prev[path]
    }));
  };

  const expandAll = () => {
    setExpandedKeys({ root: true });
  };

  // Helper to render interactive tree node
  const renderTreeNode = (data: any, path: string = 'root', keyName?: string, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedKeys[path] !== false;
    const indent = { paddingLeft: `${depth * 16}px` };

    if (data === null) {
      return (
        <div style={indent} className="py-0.5 font-mono text-xs flex items-center gap-1">
          {keyName && <span className="text-[#9cdcfe]">"{keyName}": </span>}
          <span className="text-[#569cd6] font-bold">null</span>
        </div>
      );
    }

    if (typeof data === 'boolean') {
      return (
        <div style={indent} className="py-0.5 font-mono text-xs flex items-center gap-1">
          {keyName && <span className="text-[#9cdcfe]">"{keyName}": </span>}
          <span className="text-[#569cd6] font-bold">{data ? 'true' : 'false'}</span>
        </div>
      );
    }

    if (typeof data === 'number') {
      return (
        <div style={indent} className="py-0.5 font-mono text-xs flex items-center gap-1">
          {keyName && <span className="text-[#9cdcfe]">"{keyName}": </span>}
          <span className="text-[#b5cea8] font-mono">{data}</span>
        </div>
      );
    }

    if (typeof data === 'string') {
      const matchesSearch = searchQuery && data.toLowerCase().includes(searchQuery.toLowerCase());
      return (
        <div style={indent} className="py-0.5 font-mono text-xs flex items-center gap-1 truncate">
          {keyName && <span className="text-[#9cdcfe]">"{keyName}": </span>}
          <span className={`text-[#ce9178] ${matchesSearch ? 'bg-[#515c6b] text-white px-1 rounded' : ''}`}>
            "{data}"
          </span>
        </div>
      );
    }

    if (Array.isArray(data)) {
      const matchesSearch = searchQuery && data.some(item => typeof item === 'string' && item.toLowerCase().includes(searchQuery.toLowerCase()));
      return (
        <div key={path} className="font-mono text-xs">
          <div 
            style={indent} 
            onClick={() => toggleExpand(path)}
            className="py-1 flex items-center gap-1.5 cursor-pointer hover:bg-[#2a2d2e] rounded px-1 transition text-[#cccccc]"
          >
            <i className={`codicon ${isExpanded ? 'codicon-chevron-down' : 'codicon-chevron-right'} text-xs text-[#858585]`}></i>
            {keyName && <span className="text-[#9cdcfe] font-semibold">"{keyName}": </span>}
            <span className="text-[#858585] text-[11px]">
              Array({data.length}) {isExpanded ? '[' : '[ ... ]'}
            </span>
            {matchesSearch && <span className="text-[10px] bg-[#007acc]/40 text-[#61dafb] px-1 rounded ml-2">match</span>}
          </div>

          {isExpanded && (
            <div>
              {data.map((item, idx) => renderTreeNode(item, `${path}.${idx}`, undefined, depth + 1))}
              <div style={indent} className="py-0.5 text-[#858585] pl-4">]</div>
            </div>
          )}
        </div>
      );
    }

    if (typeof data === 'object') {
      const keys = Object.keys(data);
      return (
        <div key={path} className="font-mono text-xs">
          <div 
            style={indent} 
            onClick={() => toggleExpand(path)}
            className="py-1 flex items-center gap-1.5 cursor-pointer hover:bg-[#2a2d2e] rounded px-1 transition text-[#cccccc]"
          >
            <i className={`codicon ${isExpanded ? 'codicon-chevron-down' : 'codicon-chevron-right'} text-xs text-[#858585]`}></i>
            {keyName && <span className="text-[#9cdcfe] font-semibold">"{keyName}": </span>}
            <span className="text-[#858585] text-[11px]">
              Object({keys.length}) {isExpanded ? '{' : '{ ... }'}
            </span>
          </div>

          {isExpanded && (
            <div>
              {keys.map((k) => renderTreeNode(data[k], `${path}.${k}`, k, depth + 1))}
              <div style={indent} className="py-0.5 text-[#858585] pl-4">{"}"}</div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  // Categorized Skills view for skills.json
  const categorizedSkills = useMemo(() => {
    if (!Array.isArray(parsedData)) return null;

    const categories: Record<string, { icon: string; items: string[]; color: string }> = {
      'Front-End Architecture': {
        icon: 'codicon-symbol-structure',
        color: '#61dafb',
        items: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite', 'Framer Motion']
      },
      'Integrations & APIs': {
        icon: 'codicon-plug',
        color: '#4ec9b0',
        items: ['REST API Integration', 'Supabase', 'Payment Gateway & Third-Party Integration', 'Make.com']
      },
      'E-Commerce & Shopify': {
        icon: 'codicon-shopping-cart',
        color: '#fbc02d',
        items: ['Shopify Liquid & Shopify APIs', 'SEO & Performance (Lighthouse)']
      },
      'Workflow & Engineering': {
        icon: 'codicon-git-branch',
        color: '#c586c0',
        items: ['Git / GitHub', 'Responsive & Cross-Browser Development']
      }
    };

    return categories;
  }, [parsedData]);

  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#cccccc] flex flex-col overflow-hidden select-text font-sans">
      {/* Top Controls Header Bar */}
      <div className="h-10 bg-[#252526] border-b border-[#3c3c3c] flex items-center justify-between px-4 text-xs shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[#fbc02d]">
            <i className="codicon codicon-json text-sm"></i>
            <span className="font-semibold text-white">{file.name}</span>
          </div>

          {!parseError && (
            <span className="bg-[#27c93f]/15 text-[#27c93f] text-[10px] px-2 py-0.5 rounded font-mono border border-[#27c93f]/30 flex items-center gap-1">
              <i className="codicon codicon-pass text-[10px]"></i> Valid JSON
            </span>
          )}

          {parseError && (
            <span className="bg-[#f44747]/15 text-[#f44747] text-[10px] px-2 py-0.5 rounded font-mono border border-[#f44747]/30 flex items-center gap-1">
              <i className="codicon codicon-error text-[10px]"></i> JSON Error
            </span>
          )}
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative flex items-center">
            <i className="codicon codicon-search absolute left-2 text-[#858585] text-xs"></i>
            <input 
              type="text"
              placeholder="Search JSON keys/values..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1e1e1e] border border-[#3c3c3c] text-white text-xs pl-7 pr-2 py-1 rounded w-44 focus:outline-none focus:border-[#007acc] font-mono"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-[#858585] hover:text-white"
              >
                <i className="codicon codicon-close text-xs"></i>
              </button>
            )}
          </div>

          {/* Toggle Visual / Tree */}
          <div className="bg-[#1e1e1e] p-0.5 rounded border border-[#3c3c3c] flex items-center font-mono text-[11px]">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-2.5 py-0.5 rounded transition flex items-center gap-1 ${
                viewMode === 'visual'
                  ? 'bg-[#007acc] text-white font-bold'
                  : 'text-[#858585] hover:text-white'
              }`}
              title="Formatted Visual Dashboard View"
            >
              <i className="codicon codicon-dashboard text-xs"></i>
              Visual View
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`px-2.5 py-0.5 rounded transition flex items-center gap-1 ${
                viewMode === 'tree'
                  ? 'bg-[#007acc] text-white font-bold'
                  : 'text-[#858585] hover:text-white'
              }`}
              title="Interactive Collapsible JSON Tree Inspector"
            >
              <i className="codicon codicon-[#structure] codicon-list-tree text-xs"></i>
              Tree Inspector
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 bg-[#2d2d2d] hover:bg-[#3c3c3c] text-[#cccccc] hover:text-white px-2.5 py-1 rounded border border-[#3c3c3c] transition text-xs font-mono"
            title="Copy Raw JSON Content"
          >
            <i className={`codicon ${copied ? 'codicon-check text-[#27c93f]' : 'codicon-copy'}`}></i>
            <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
          </button>
        </div>
      </div>

      {/* Main Preview Content Body */}
      <div className="flex-1 p-6 overflow-y-auto">
        {parseError ? (
          <div className="bg-[#252526] border border-[#f44747]/40 rounded-lg p-6 max-w-xl mx-auto space-y-3 font-mono">
            <div className="flex items-center gap-2 text-[#f44747] font-bold text-sm">
              <i className="codicon codicon-error text-lg"></i> JSON Parsing Error
            </div>
            <p className="text-xs text-[#cccccc]">{parseError}</p>
          </div>
        ) : viewMode === 'tree' ? (
          /* Tree Inspector View */
          <div className="max-w-4xl mx-auto bg-[#252526] border border-[#3c3c3c] rounded-lg p-5 shadow-xl font-mono">
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-[#3c3c3c] text-xs text-[#858585]">
              <span>JSON Structure Tree ({file.content.length} bytes)</span>
              <button 
                onClick={expandAll}
                className="hover:text-white underline text-[11px]"
              >
                Expand / Collapse Nodes
              </button>
            </div>
            {renderTreeNode(parsedData)}
          </div>
        ) : (
          /* Visual Cards View */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* 1. Specialized View for skills.json */}
            {file.name === 'skills.json' && Array.isArray(parsedData) ? (
              <div className="space-y-6">
                <div className="border-b border-[#3c3c3c] pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="text-lg font-bold text-[#569cd6] flex items-center gap-2">
                      <i className="codicon codicon-tools text-[#fbc02d]"></i> Technical Skills & Capabilities
                    </h2>
                    <p className="text-[#858585] text-xs mt-1">
                      Production experience in front-end development, API integrations, and e-commerce architecture.
                    </p>
                  </div>
                  <span className="bg-[#007acc]/20 text-[#61dafb] text-xs px-2.5 py-1 rounded-full font-mono border border-[#007acc]/30">
                    {parsedData.length} Core Technical Skills
                  </span>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorizedSkills && Object.entries(categorizedSkills).map(([catName, cat]) => {
                    const filteredItems = cat.items.filter(item => 
                      !searchQuery || item.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    if (searchQuery && filteredItems.length === 0) return null;

                    return (
                      <div key={catName} className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-4 space-y-3 hover:border-[#007acc]/60 transition shadow-md">
                        <div className="flex items-center justify-between border-b border-[#3c3c3c]/60 pb-2">
                          <h3 className="font-bold text-sm text-white flex items-center gap-2">
                            <i className={`codicon ${cat.icon}`} style={{ color: cat.color }}></i>
                            {catName}
                          </h3>
                          <span className="text-[10px] text-[#858585] font-mono">{filteredItems.length} skills</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {filteredItems.map(skill => (
                            <span 
                              key={skill}
                              className="bg-[#1e1e1e] border border-[#3c3c3c] hover:border-[#007acc] text-[#d4d4d4] hover:text-white px-2.5 py-1 rounded text-xs font-mono transition flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : file.name === 'settings.json' && typeof parsedData === 'object' ? (
              /* 2. Specialized View for settings.json */
              <div className="space-y-6">
                <div className="border-b border-[#3c3c3c] pb-4 flex justify-between items-end">
                  <div>
                    <h2 className="text-lg font-bold text-[#569cd6] flex items-center gap-2">
                      <i className="codicon codicon-settings-gear text-[#007acc]"></i> VS Code Workspace Settings
                    </h2>
                    <p className="text-[#858585] text-xs mt-1">
                      Active preferences, editor configuration, and portfolio developer metadata.
                    </p>
                  </div>
                  <span className="bg-[#007acc]/20 text-[#61dafb] text-xs px-2.5 py-1 rounded-full font-mono border border-[#007acc]/30">
                    {Object.keys(parsedData).length} Preferences Configured
                  </span>
                </div>

                <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg divide-y divide-[#3c3c3c] shadow-lg font-mono text-xs">
                  {Object.entries(parsedData).map(([key, val]) => {
                    if (searchQuery && !key.toLowerCase().includes(searchQuery.toLowerCase()) && !String(val).toLowerCase().includes(searchQuery.toLowerCase())) {
                      return null;
                    }

                    return (
                      <div key={key} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-[#2d2d2d]/50 transition">
                        <div className="space-y-1">
                          <span className="text-[#9cdcfe] font-semibold text-xs">{key}</span>
                          <p className="text-[11px] text-[#858585] font-sans">
                            {key.startsWith('editor.') ? 'Code editor formatting & visual layout preference' :
                             key.startsWith('workbench.') ? 'VS Code UI theme & appearance configuration' :
                             'Developer portfolio identity metadata'}
                          </p>
                        </div>
                        <div className="bg-[#1e1e1e] px-3 py-1.5 rounded border border-[#3c3c3c] text-right shrink-0">
                          {typeof val === 'boolean' ? (
                            <span className="text-[#569cd6] font-bold">{val ? 'true' : 'false'}</span>
                          ) : typeof val === 'number' ? (
                            <span className="text-[#b5cea8]">{val}</span>
                          ) : (
                            <span className="text-[#ce9178]">"{String(val)}"</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* 3. Fallback Visual Inspector for General JSON */
              <div className="space-y-6">
                <div className="border-b border-[#3c3c3c] pb-4">
                  <h2 className="text-lg font-bold text-[#569cd6] flex items-center gap-2 font-mono">
                    <i className="codicon codicon-json text-[#fbc02d]"></i> {file.name}
                  </h2>
                  <p className="text-[#858585] text-xs mt-1">
                    Structured Data View • {Array.isArray(parsedData) ? `Array (${parsedData.length} items)` : typeof parsedData === 'object' ? `Object (${Object.keys(parsedData).length} properties)` : typeof parsedData}
                  </p>
                </div>

                <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-5 shadow-lg font-mono text-xs space-y-4">
                  {typeof parsedData === 'object' && parsedData !== null ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(parsedData).map(([k, v]) => (
                        <div key={k} className="bg-[#1e1e1e] border border-[#3c3c3c] p-3 rounded space-y-1">
                          <span className="text-[#9cdcfe] font-semibold">{k}</span>
                          <div className="text-[#ce9178] truncate text-xs">
                            {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[#ce9178]">{String(parsedData)}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
