import React, { useState, useEffect } from 'react';
import { VSCodeProvider, useVSCode } from './context/VSCodeContext';
import { TitleBar } from './components/TitleBar';
import { MenuBar } from './components/MenuBar';
import { ActivityBar } from './components/ActivityBar';
import { FileExplorer } from './components/Sidebar/FileExplorer';
import { SearchPanel } from './components/Sidebar/SearchPanel';
import { GitPanel } from './components/Sidebar/GitPanel';
import { ExtensionsPanel } from './components/Sidebar/ExtensionsPanel';
import { TabBar } from './components/EditorPane/TabBar';
import { Breadcrumbs } from './components/EditorPane/Breadcrumbs';
import { CodeEditor } from './components/EditorPane/CodeEditor';
import { MarkdownPreview } from './components/EditorPane/MarkdownPreview';
import { ProjectsPreview } from './components/EditorPane/ProjectsPreview';
import { ExperiencePreview } from './components/EditorPane/ExperiencePreview';
import { JsonPreview } from './components/EditorPane/JsonPreview';
import { EmptyState } from './components/EditorPane/EmptyState';
import { Minimap } from './components/EditorPane/Minimap';
import { TerminalPanel } from './components/Terminal/TerminalPanel';
import { StatusBar } from './components/StatusBar';
import { ToastContainer } from './components/ToastContainer';
import { MobileWarning } from './components/MobileWarning';
import { FullscreenSlideshow } from './components/EditorPane/FullscreenSlideshow';

const MainLayout: React.FC = () => {
  const { 
    activeFile, 
    openTabs, 
    activePanel, 
    isSidebarOpen, 
    isTerminalOpen, 
    activeViewMode,
    isFullscreenSlideshowOpen,
    toggleSidebar,
    toggleTerminal,
    toggleFullscreenSlideshow,
    openTab,
    closeTab,
    setActivePanel,
    toggleMarkdownViewMode,
    files
  } = useVSCode();

  const [terminalHeight, setTerminalHeight] = useState<number>(200);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Fullscreen Slideshow Mode (F5)
      if (e.key === 'F5' || (e.ctrlKey && key === 'f5')) {
        e.preventDefault();
        toggleFullscreenSlideshow();
        return;
      }

      // Toggle Preview / View Code Mode (Ctrl+Shift+V)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === 'v') {
        if (activeFile) {
          const isPreviewable = activeFile.type === 'markdown' || activeFile.type === 'json' || activeFile.name.endsWith('.json') || activeFile.name === 'projects.tsx' || activeFile.name === 'experience.ts';
          if (isPreviewable) {
            e.preventDefault();
            toggleMarkdownViewMode(activeFile.name);
          }
        }
        return;
      }

      // Open README.md (Ctrl+Alt+R or Ctrl+O)
      if ((e.ctrlKey || e.metaKey) && ((e.altKey && key === 'r') || (!e.altKey && !e.shiftKey && key === 'o'))) {
        e.preventDefault();
        const readme = files.find(f => f.name === 'README.md');
        if (readme) openTab(readme);
        return;
      }

      // Open contact.json (Ctrl+Alt+C or Ctrl+Shift+C)
      if ((e.ctrlKey || e.metaKey) && ((e.altKey && key === 'c') || (e.shiftKey && key === 'c'))) {
        e.preventDefault();
        const contact = files.find(f => f.name === 'contact.json');
        if (contact) openTab(contact);
        return;
      }

      // Quick File Search / Search Panel (Ctrl+P or Ctrl+Shift+F)
      if ((e.ctrlKey || e.metaKey) && (!e.altKey && (key === 'p' || (e.shiftKey && key === 'f')))) {
        e.preventDefault();
        setActivePanel('search');
        if (!isSidebarOpen) toggleSidebar();
        return;
      }

      // Toggle Terminal (Ctrl+` or Ctrl+Shift+`)
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~' || e.code === 'Backquote')) {
        e.preventDefault();
        toggleTerminal();
        return;
      }

      // Toggle Sidebar (Ctrl+B)
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && key === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      // Explorer Panel (Ctrl+Shift+E)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey && key === 'e') {
        e.preventDefault();
        setActivePanel('explorer');
        if (!isSidebarOpen) toggleSidebar();
        return;
      }

      // Source Control Panel (Ctrl+Shift+G)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey && key === 'g') {
        e.preventDefault();
        setActivePanel('git');
        if (!isSidebarOpen) toggleSidebar();
        return;
      }

      // Extensions Panel (Ctrl+Shift+X)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && !e.altKey && key === 'x') {
        e.preventDefault();
        setActivePanel('extensions');
        if (!isSidebarOpen) toggleSidebar();
        return;
      }

      // Close Active Tab (Ctrl+W)
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && key === 'w') {
        if (activeFile) {
          e.preventDefault();
          closeTab(activeFile.id);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar, toggleTerminal, toggleFullscreenSlideshow, setActivePanel, isSidebarOpen, files, openTab, activeFile, closeTab, toggleMarkdownViewMode]);

  // Terminal resizing handler
  const handleMouseDown = () => setIsResizing(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newHeight = window.innerHeight - e.clientY - 24; // 24px is status bar height
      if (newHeight >= 100 && newHeight <= window.innerHeight * 0.6) {
        setTerminalHeight(newHeight);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const renderSidebarContent = () => {
    switch (activePanel) {
      case 'explorer':
        return <FileExplorer />;
      case 'search':
        return <SearchPanel />;
      case 'git':
        return <GitPanel />;
      case 'extensions':
        return <ExtensionsPanel />;
      default:
        return <FileExplorer />;
    }
  };

  const renderEditorBody = () => {
    if (!activeFile || openTabs.length === 0) {
      return <EmptyState />;
    }

    const isPreviewable = activeFile.type === 'markdown' || activeFile.type === 'json' || activeFile.name.endsWith('.json') || activeFile.name === 'projects.tsx' || activeFile.name === 'experience.ts';
    const isPreview = isPreviewable && activeViewMode[activeFile.name] !== 'code';

    if ((activeFile.type === 'json' || activeFile.name.endsWith('.json')) && isPreview) {
      return <JsonPreview file={activeFile} />;
    }

    if (activeFile.name === 'projects.tsx' && isPreview) {
      return <ProjectsPreview />;
    }

    if (activeFile.name === 'experience.ts' && isPreview) {
      return <ExperiencePreview />;
    }

    if (activeFile.type === 'markdown' && isPreview) {
      return <MarkdownPreview file={activeFile} />;
    }

    return <CodeEditor file={activeFile} />;
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[#1e1e1e] font-sans antialiased select-none">
      {/* Mobile Caution Banner */}
      <MobileWarning />

      {/* 1. Title Bar */}
      <TitleBar />

      {/* 2. Menu Bar */}
      <MenuBar />

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Activity Bar (Far left icon panel) */}
        <ActivityBar />

        {/* Primary Sidebar (Collapsible drawer on mobile, inline on desktop) */}
        <div 
          className={`${
            isSidebarOpen ? 'w-64 border-r border-[#3c3c3c]' : 'w-0 hidden'
          } bg-[#252526] transition-all duration-150 flex-col shrink-0 md:relative absolute left-12 md:left-0 top-0 bottom-0 z-30 shadow-2xl md:shadow-none h-full`}
        >
          {isSidebarOpen && renderSidebarContent()}
        </div>

        {/* Editor Pane (Middle main column) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e] min-w-0">
          {/* Tab Bar */}
          <TabBar />

          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Editor Body & Minimap Container */}
          <div className="flex-1 flex overflow-hidden relative">
            {renderEditorBody()}

            {/* Code Minimap (Only shown when active code file is rendered) */}
            {activeFile && openTabs.length > 0 && activeViewMode[activeFile.name] !== 'preview' && (
              <Minimap content={activeFile.content} />
            )}
          </div>

          {/* 4. Bottom Terminal Split Panel */}
          {isTerminalOpen && (
            <div 
              style={{ height: `${terminalHeight}px` }} 
              className="border-t border-[#3c3c3c] bg-[#1e1e1e] flex flex-col shrink-0 relative"
            >
              {/* Resize Handle */}
              <div 
                onMouseDown={handleMouseDown}
                className="h-1 bg-[#3c3c3c]/50 hover:bg-[#007acc] cursor-ns-resize absolute top-0 left-0 right-0 z-20"
              ></div>

              <TerminalPanel />
            </div>
          )}
        </div>
      </div>

      {/* 5. Status Bar Strip */}
      <StatusBar />

      {/* Floating Presentation Launch Prompt */}
      {!isFullscreenSlideshowOpen && (
        <div 
          onClick={() => toggleFullscreenSlideshow(true)}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-40 bg-[#007acc] hover:bg-[#005999] text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer transition transform hover:scale-105 border border-white/20 font-mono text-xs animate-bounce select-none"
        >
          <i className="codicon codicon-screen-full text-sm"></i>
          <span className="font-bold">Click Anywhere to Enter Presentation Mode (F5)</span>
        </div>
      )}

      {/* Floating Notifications */}
      <ToastContainer />

      {/* Fullscreen Interactive Presentation Mode */}
      {isFullscreenSlideshowOpen && <FullscreenSlideshow />}
    </div>
  );
};

export default function App() {
  return (
    <VSCodeProvider>
      <MainLayout />
    </VSCodeProvider>
  );
}
