import React, { useState, useRef, useEffect } from 'react';
import { useVSCode } from '../../context/VSCodeContext';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalPanel: React.FC = () => {
  const { files, openTab, toggleTerminal, addToast } = useVSCode();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'welcome-1',
      command: '',
      output: (
        <div className="text-[#858585] text-xs space-y-1">
          <p className="text-[#007acc] font-bold">VS Code Interactive Portfolio Terminal v1.0.0</p>
          <p>Type <span className="text-[#ce9178] font-bold">help</span> to view available CLI commands or <span className="text-[#ce9178] font-bold">neofetch</span> for developer system info.</p>
        </div>
      )
    }
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [currentDir, setCurrentDir] = useState<string>('PORTFOLIO');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextPointer = historyPointer + 1;
        if (nextPointer < commandHistory.length) {
          setHistoryPointer(nextPointer);
          setInputVal(commandHistory[commandHistory.length - 1 - nextPointer]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const nextPointer = historyPointer - 1;
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[commandHistory.length - 1 - nextPointer]);
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInputVal('');
      }
    }
  };

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryPointer(-1);
    setInputVal('');

    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();
    const targetArg = args.slice(1).join(' ').trim();

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="text-[#cccccc] space-y-1 font-mono text-xs my-1">
            <p className="text-[#569cd6] font-bold">Available Commands:</p>
            <p><span className="text-[#ce9178] font-bold">ls</span> — List all workspace files and directories</p>
            <p><span className="text-[#ce9178] font-bold">cd &lt;dir&gt;</span> — Change current working directory</p>
            <p><span className="text-[#ce9178] font-bold">open &lt;file&gt;</span> — Open & focus file tab (e.g., open src/experience.ts)</p>
            <p><span className="text-[#ce9178] font-bold">cat &lt;file&gt;</span> — Display raw contents of a file</p>
            <p><span className="text-[#ce9178] font-bold">whoami</span> — Profile bio summary</p>
            <p><span className="text-[#ce9178] font-bold">neofetch</span> — Show developer system specs & tech stack</p>
            <p><span className="text-[#ce9178] font-bold">sudo hire-me</span> — Open contact inquiry form</p>
            <p><span className="text-[#ce9178] font-bold">clear</span> — Clear terminal screen</p>
          </div>
        );
        break;

      case 'ls':
        outputNode = (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono my-1">
            <span className="text-[#e5c07b] font-bold">📁 .vscode/</span>
            <span className="text-[#dcb67a] font-bold">📁 src/</span>
            <span className="text-[#42a5f5]">📄 README.md</span>
            <span className="text-[#fbc02d]">📄 contact.json</span>
          </div>
        );
        break;

      case 'cd':
        if (!targetArg || targetArg === '~' || targetArg === '..') {
          setCurrentDir('PORTFOLIO');
          outputNode = <div className="text-[#858585] text-xs">Switched directory to PORTFOLIO</div>;
        } else if (targetArg === 'src' || targetArg === 'src/' || targetArg === './src') {
          setCurrentDir('PORTFOLIO/src');
          outputNode = <div className="text-[#858585] text-xs">Switched directory to PORTFOLIO/src</div>;
        } else if (targetArg === '.vscode' || targetArg === '.vscode/') {
          setCurrentDir('PORTFOLIO/.vscode');
          outputNode = <div className="text-[#858585] text-xs">Switched directory to PORTFOLIO/.vscode</div>;
        } else {
          outputNode = <div className="text-[#f44747] text-xs">cd: no such directory: {targetArg}</div>;
        }
        break;

      case 'open':
      case 'code':
      case 'view':
        if (!targetArg) {
          outputNode = <div className="text-[#f44747] text-xs">Usage: open &lt;filename&gt; (e.g. open experience.ts)</div>;
        } else {
          const match = files.find(f => 
            f.name.toLowerCase() === targetArg.toLowerCase() || 
            f.path.toLowerCase() === targetArg.toLowerCase() ||
            f.path.toLowerCase().endsWith(targetArg.toLowerCase())
          );
          if (match) {
            openTab(match);
            outputNode = <div className="text-[#27c93f] text-xs">Opened [{match.path}] in editor tab.</div>;
          } else {
            outputNode = <div className="text-[#f44747] text-xs">File not found: "{targetArg}". Type 'ls' to view files.</div>;
          }
        }
        break;

      case 'cat':
        if (!targetArg) {
          outputNode = <div className="text-[#f44747] text-xs">Usage: cat &lt;filename&gt;</div>;
        } else {
          const match = files.find(f => 
            f.name.toLowerCase() === targetArg.toLowerCase() || 
            f.path.toLowerCase() === targetArg.toLowerCase() ||
            f.path.toLowerCase().endsWith(targetArg.toLowerCase())
          );
          if (match) {
            outputNode = (
              <pre className="text-[#d4d4d4] bg-[#1e1e1e] p-2 rounded text-xs font-mono overflow-x-auto my-1 border border-[#3c3c3c]">
                {match.content}
              </pre>
            );
          } else {
            outputNode = <div className="text-[#f44747] text-xs">cat: {targetArg}: No such file or directory</div>;
          }
        }
        break;

      case 'whoami':
        outputNode = (
          <div className="text-[#cccccc] text-xs font-mono my-1 space-y-1 border-l-2 border-[#007acc] pl-3 py-1">
            <p className="font-bold text-[#569cd6]">{PORTFOLIO_DATA.name}</p>
            <p className="text-[#9cdcfe]">{PORTFOLIO_DATA.title}</p>
            <p className="text-[#858585]">📍 {PORTFOLIO_DATA.location} | {PORTFOLIO_DATA.email}</p>
            <p className="text-[#ce9178] mt-1">{PORTFOLIO_DATA.bio}</p>
          </div>
        );
        break;

      case 'neofetch':
        outputNode = (
          <div className="flex flex-col md:flex-row gap-4 my-2 text-xs font-mono bg-[#1e1e1e] p-3 rounded border border-[#3c3c3c]">
            {/* ASCII Art */}
            <div className="text-[#007acc] font-bold leading-tight select-none">
              <pre>{`
  /\   /\ ___  / \ / \ 
 / /  / // __|/  /  / 
/ /__/ /\__ \  /\  /  
\____/\_|___/_/  \/   
              `}</pre>
            </div>
            {/* Specs List */}
            <div className="space-y-1 text-[#cccccc]">
              <p className="font-bold text-[#569cd6]">{PORTFOLIO_DATA.name}@ezzcode-online</p>
              <p className="text-[#858585]">----------------------------------</p>
              <p><span className="text-[#4ec9b0]">OS</span>: VS Code Web Environment (Dark+)</p>
              <p><span className="text-[#4ec9b0]">Host</span>: React 19 + TypeScript + Vite</p>
              <p><span className="text-[#4ec9b0]">Kernel</span>: Custom State Engine</p>
              <p><span className="text-[#4ec9b0]">Uptime</span>: 99.9% High Speed</p>
              <p><span className="text-[#4ec9b0]">Installed Packages</span>:</p>
              <div className="pl-3 text-[11px] text-[#ce9178]">
                React, TypeScript, Shopify Liquid, Vite, Supabase, Tailwind CSS, Make.com, REST APIs
              </div>
              <p><span className="text-[#4ec9b0]">Shell</span>: bash / zsh portfolio-cli</p>
            </div>
          </div>
        );
        break;

      case 'sudo':
        if (targetArg === 'hire-me' || targetArg === 'hire') {
          const contactFile = files.find(f => f.name === 'contact.json');
          if (contactFile) openTab(contactFile);
          addToast('Opening contact form! Fill out your details to hire Mahar Ghulam Muhammad.', 'success', 'Sudo Action');
          outputNode = <div className="text-[#27c93f] font-bold text-xs">[SUCCESS] Access Granted. Opening contact.json editor...</div>;
        } else {
          outputNode = <div className="text-[#f44747] text-xs">sudo: permission denied. Try: sudo hire-me</div>;
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        outputNode = <div className="text-[#f44747] text-xs">zsh: command not found: {cmd}. Type 'help' for commands.</div>;
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        command: trimmed,
        output: outputNode
      }
    ]);
  };

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col font-mono text-xs text-[#cccccc] select-text">
      {/* Terminal Header Tab Strip */}
      <div className="h-7 bg-[#252526] border-b border-[#3c3c3c] flex items-center justify-between px-3 text-[11px] select-none shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-[#858585] hover:text-white cursor-pointer">PROBLEMS</span>
          <span className="text-[#858585] hover:text-white cursor-pointer">OUTPUT</span>
          <span className="text-[#858585] hover:text-white cursor-pointer">DEBUG CONSOLE</span>
          <span className="text-white font-bold border-b-2 border-[#007acc] pb-0.5 flex items-center gap-1 cursor-pointer">
            <i className="codicon codicon-terminal text-xs"></i> TERMINAL
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[#858585]">
          <button onClick={() => setHistory([])} className="hover:text-white p-0.5" title="Clear Terminal">
            <i className="codicon codicon-trash"></i>
          </button>
          <button onClick={toggleTerminal} className="hover:text-white p-0.5" title="Close Panel">
            <i className="codicon codicon-chevron-down"></i>
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-3 overflow-y-auto space-y-2 cursor-text"
      >
        {history.map(item => (
          <div key={item.id} className="space-y-1">
            {item.command && (
              <div className="flex items-center space-x-2">
                <span className="text-[#27c93f] font-bold">gm@portfolio</span>
                <span className="text-[#858585]">:</span>
                <span className="text-[#569cd6] font-bold">~/{currentDir}</span>
                <span className="text-[#cccccc]">$</span>
                <span className="text-[#ce9178] font-bold">{item.command}</span>
              </div>
            )}
            <div>{item.output}</div>
          </div>
        ))}

        {/* Input Prompt Row */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-[#27c93f] font-bold">gm@portfolio</span>
          <span className="text-[#858585]">:</span>
          <span className="text-[#569cd6] font-bold">~/{currentDir}</span>
          <span className="text-[#cccccc]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs border-none p-0"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
