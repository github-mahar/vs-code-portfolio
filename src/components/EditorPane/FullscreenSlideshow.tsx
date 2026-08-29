import React, { useState, useEffect, useCallback } from 'react';
import { useVSCode } from '../../context/VSCodeContext';
import { TitleBar } from '../TitleBar';
import { MenuBar } from '../MenuBar';
import { ActivityBar } from '../ActivityBar';
import { FileExplorer } from '../Sidebar/FileExplorer';
import { SearchPanel } from '../Sidebar/SearchPanel';
import { GitPanel } from '../Sidebar/GitPanel';
import { ExtensionsPanel } from '../Sidebar/ExtensionsPanel';
import { TabBar } from './TabBar';
import { Breadcrumbs } from './Breadcrumbs';
import { CodeEditor } from './CodeEditor';
import { MarkdownPreview } from './MarkdownPreview';
import { ProjectsPreview } from './ProjectsPreview';
import { ExperiencePreview } from './ExperiencePreview';
import { JsonPreview } from './JsonPreview';
import { EmptyState } from './EmptyState';
import { Minimap } from './Minimap';
import { TerminalPanel } from '../Terminal/TerminalPanel';
import { StatusBar } from '../StatusBar';

export const FullscreenSlideshow: React.FC = () => {
  const {
    activeFile,
    openTabs,
    activePanel,
    isSidebarOpen,
    isTerminalOpen,
    activeViewMode,
    toggleFullscreenSlideshow,
    openTab,
    files
  } = useVSCode();

  const presentationFiles = [
    'README.md',
    'experience.ts',
    'projects.tsx',
    'skills.json',
    'certifications.md',
    'contact.json'
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = presentationFiles.length;

  const goToSlide = useCallback((index: number) => {
    const targetName = presentationFiles[index];
    const targetFile = files.find(f => f.name === targetName);
    if (targetFile) {
      openTab(targetFile);
    }
    setCurrentSlide(index);
  }, [files, openTab, presentationFiles]);

  const nextSlide = useCallback(() => {
    const nextIdx = (currentSlide + 1) % totalSlides;
    goToSlide(nextIdx);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIdx = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(prevIdx);
  }, [currentSlide, totalSlides, goToSlide]);

  const handleClose = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    toggleFullscreenSlideshow(false);
  }, [toggleFullscreenSlideshow]);

  // Sync current slide index when user clicks tree/tab directly
  useEffect(() => {
    if (activeFile) {
      const idx = presentationFiles.indexOf(activeFile.name);
      if (idx !== -1 && idx !== currentSlide) {
        setCurrentSlide(idx);
      }
    }
  }, [activeFile]);

  // Request Native Fullscreen on Mount & initialize slide 0
  useEffect(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }

    goToSlide(0);

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        toggleFullscreenSlideshow(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);



  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, handleClose, totalSlides, goToSlide]);

  const renderSidebarContent = () => {
    switch (activePanel) {
      case 'explorer': return <FileExplorer />;
      case 'search': return <SearchPanel />;
      case 'git': return <GitPanel />;
      case 'extensions': return <ExtensionsPanel />;
      default: return <FileExplorer />;
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
    <div className="fixed inset-0 z-50 bg-[#1e1e1e] text-[#cccccc] flex flex-col font-sans select-none overflow-hidden h-screen w-screen">
      {/* Authentic VS Code IDE Layout Shell */}
      <TitleBar />
      <MenuBar />

        <div className="flex-1 flex overflow-hidden relative">
          <ActivityBar />

          {/* Real Sidebar File Explorer */}
          <div className={`${isSidebarOpen ? 'w-64 border-r border-[#3c3c3c]' : 'w-0 hidden'} bg-[#252526] transition-all duration-150 flex flex-col shrink-0 h-full`}>
            {isSidebarOpen && renderSidebarContent()}
          </div>

          {/* Real Editor Pane */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e] min-w-0">
            <TabBar />
            <Breadcrumbs />

            <div className="flex-1 flex overflow-hidden relative">
              {renderEditorBody()}

              {activeFile && openTabs.length > 0 && activeViewMode[activeFile.name] !== 'preview' && (
                <Minimap content={activeFile.content} />
              )}
            </div>

            {/* Real Bottom Split Terminal Drawer Panel */}
            {isTerminalOpen && (
              <div className="h-44 border-t border-[#3c3c3c] bg-[#1e1e1e] flex flex-col shrink-0 relative">
                <TerminalPanel />
              </div>
            )}
          </div>
        </div>

        <StatusBar />
      </div>
  );
};

