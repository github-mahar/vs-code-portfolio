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
import { ContactFormEditor } from './components/EditorPane/ContactFormEditor';
import { EmptyState } from './components/EditorPane/EmptyState';
import { Minimap } from './components/EditorPane/Minimap';
import { TerminalPanel } from './components/Terminal/TerminalPanel';
import { StatusBar } from './components/StatusBar';
import { ToastContainer } from './components/ToastContainer';
import { MobileWarning } from './components/MobileWarning';

const MainLayout: React.FC = () => {
  const { 
    activeFile, 
    openTabs, 
    activePanel, 
    isSidebarOpen, 
    isTerminalOpen, 
    activeViewMode,
    toggleSidebar,
    toggleTerminal,
    openTab,
    files
  } = useVSCode();

  const [terminalHeight, setTerminalHeight] = useState<number>(200);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  // Global Keyboard Shortcuts (Ctrl+B, Ctrl+`, Ctrl+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
      } else if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        const readme = files.find(f => f.name === 'README.md');
        if (readme) openTab(readme);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar, toggleTerminal, files, openTab]);

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

    if (activeFile.name === 'contact.json') {
      return <ContactFormEditor />;
    }

    const isPreview = activeViewMode[activeFile.name] === 'preview';

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
            {activeFile && openTabs.length > 0 && activeFile.name !== 'contact.json' && activeViewMode[activeFile.name] !== 'preview' && (
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

      {/* Floating Notifications */}
      <ToastContainer />
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
