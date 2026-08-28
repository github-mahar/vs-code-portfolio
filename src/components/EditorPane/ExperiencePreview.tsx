import React, { useState, useEffect, useCallback } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { useVSCode } from '../../context/VSCodeContext';

export const ExperiencePreview: React.FC = () => {
  const { toggleFullscreenSlideshow } = useVSCode();
  const [viewMode, setViewMode] = useState<'timeline' | 'slideshow'>('slideshow');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const totalSlides = PORTFOLIO_DATA.experience.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play timer effect
  useEffect(() => {
    if (!isAutoPlay || viewMode !== 'slideshow') return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, viewMode, nextSlide]);

  // Keyboard navigation for slideshow
  useEffect(() => {
    if (viewMode !== 'slideshow') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, nextSlide, prevSlide, totalSlides]);

  const activeItem = PORTFOLIO_DATA.experience[currentSlide];

  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#cccccc] p-4 sm:p-6 overflow-y-auto font-sans leading-relaxed select-text flex flex-col">
      <div className="max-w-4xl mx-auto space-y-6 w-full flex-1 flex flex-col">
        {/* Header with View Switcher */}
        <div className="border-b border-[#3c3c3c] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <i className="codicon codicon-history text-[#3178c6]"></i> Work Experience & Career Trajectory
            </h1>
            <p className="text-xs text-[#858585] mt-1 font-mono">
              src/experience.ts — {viewMode === 'timeline' ? 'Rendered Timeline View' : `Slideshow Deck (Slide ${currentSlide + 1} of ${totalSlides})`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle Controls */}
            <div className="bg-[#252526] border border-[#3c3c3c] p-1 rounded-md flex items-center gap-1">
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-[#007acc] text-white font-semibold shadow'
                    : 'text-[#858585] hover:text-white hover:bg-[#333333]'
                }`}
                title="Switch to scrollable list view"
              >
                <i className="codicon codicon-list-flat"></i>
                Timeline
              </button>
              <button
                onClick={() => setViewMode('slideshow')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
                  viewMode === 'slideshow'
                    ? 'bg-[#007acc] text-white font-semibold shadow'
                    : 'text-[#858585] hover:text-white hover:bg-[#333333]'
                }`}
                title="Switch to slide presentation view"
              >
                <i className="codicon codicon-screen-normal"></i>
                Slideshow
              </button>
            </div>

            <button
              onClick={() => toggleFullscreenSlideshow(true)}
              className="flex items-center gap-1.5 bg-[#007acc] hover:bg-[#005999] text-white px-3 py-1.5 text-xs font-mono rounded-md font-bold transition shadow"
              title="Launch Whole-Screen Interactive Slideshow Presentation (F5)"
            >
              <i className="codicon codicon-screen-full"></i>
              Fullscreen Deck
            </button>
          </div>
        </div>

        {/* TIMELINE VIEW MODE */}
        {viewMode === 'timeline' && (
          <div className="space-y-6">
            {PORTFOLIO_DATA.experience.map((item, index) => (
              <div key={index} className="bg-[#252526] border border-[#3c3c3c] p-5 rounded-lg shadow-lg hover:border-[#007acc] transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-xl font-bold text-[#569cd6]">{item.company}</h3>
                  <span className="text-xs font-mono text-[#ce9178] bg-[#1e1e1e] px-2 py-0.5 rounded w-fit">{item.period}</span>
                </div>
                <p className="text-sm font-semibold text-[#4ec9b0] mb-3">
                  {item.role} {item.location ? `• ${item.location}` : ''}
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#cccccc] mb-4">
                  {item.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map(t => (
                    <span key={t} className="bg-[#333333] text-[#9cdcfe] text-[11px] px-2 py-0.5 rounded font-mono">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SLIDESHOW VIEW MODE */}
        {viewMode === 'slideshow' && (
          <div className="flex-1 flex flex-col justify-between space-y-6">
            {/* Top Toolbar Controls for Slideshow */}
            <div className="bg-[#252526] border border-[#3c3c3c] p-3 rounded-lg flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#858585]">Use Keyboard <kbd className="bg-[#1e1e1e] border border-[#454545] text-[#cccccc] px-1.5 py-0.5 rounded text-[10px]">←</kbd> <kbd className="bg-[#1e1e1e] border border-[#454545] text-[#cccccc] px-1.5 py-0.5 rounded text-[10px]">→</kbd></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlay(prev => !prev)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded border transition ${
                    isAutoPlay
                      ? 'bg-[#4ec9b0]/20 border-[#4ec9b0] text-[#4ec9b0]'
                      : 'bg-[#1e1e1e] border-[#3c3c3c] text-[#cccccc] hover:border-[#007acc]'
                  }`}
                  title="Toggle 5-second automatic slide advancement"
                >
                  <i className={`codicon ${isAutoPlay ? 'codicon-debug-pause' : 'codicon-play'}`}></i>
                  {isAutoPlay ? 'Autoplay On' : 'Autoplay'}
                </button>

                <span className="bg-[#1e1e1e] border border-[#3c3c3c] text-[#569cd6] px-3 py-1 rounded font-bold">
                  {currentSlide + 1} / {totalSlides}
                </span>
              </div>
            </div>

            {/* Main Featured Slide Deck Card */}
            <div className="bg-[#252526] border border-[#007acc]/60 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6 relative overflow-hidden transition-all duration-300">
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#007acc] via-[#4ec9b0] to-[#ce9178]"></div>

              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3c3c3c] pb-4">
                <div>
                  <span className="text-xs font-mono text-[#858585] uppercase tracking-wider block mb-1">Company / Organization</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#569cd6] tracking-tight">
                    {activeItem.company}
                  </h2>
                  <p className="text-base font-semibold text-[#4ec9b0] mt-1 flex items-center gap-2">
                    <i className="codicon codicon-briefcase text-[#4ec9b0]"></i>
                    {activeItem.role}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                  <span className="text-xs font-mono text-[#ce9178] bg-[#1e1e1e] border border-[#ce9178]/30 px-3 py-1 rounded-full font-bold">
                    📅 {activeItem.period}
                  </span>
                  {activeItem.location && (
                    <span className="text-[11px] text-[#858585] font-mono flex items-center gap-1">
                      <i className="codicon codicon-location"></i>
                      {activeItem.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Highlights Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9cdcfe] flex items-center gap-2">
                  <i className="codicon codicon-symbol-keyword text-[#9cdcfe]"></i> Key Impact & Responsibilities
                </h3>
                <ul className="space-y-3">
                  {activeItem.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#d4d4d4] leading-relaxed bg-[#1e1e1e]/60 p-3 rounded border border-[#333333]">
                      <span className="text-[#007acc] mt-0.5 font-bold">➢</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="border-t border-[#3c3c3c] pt-4">
                <span className="text-xs font-mono text-[#858585] uppercase tracking-wider block mb-2">Technologies & Core Tooling</span>
                <div className="flex flex-wrap gap-2">
                  {activeItem.techStack.map(t => (
                    <span key={t} className="bg-[#333333] border border-[#454545] text-[#9cdcfe] text-xs px-2.5 py-1 rounded font-mono font-medium hover:border-[#007acc] transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Slideshow Controls Bar (Prev / Next & Slide Dots) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="flex items-center gap-1.5 bg-[#252526] hover:bg-[#007acc] border border-[#3c3c3c] hover:border-[#007acc] text-white px-4 py-2 rounded-lg font-mono text-xs transition shadow-md"
                >
                  <i className="codicon codicon-chevron-left"></i> Previous
                </button>

                <button
                  onClick={nextSlide}
                  className="flex items-center gap-1.5 bg-[#007acc] hover:bg-[#005999] text-white px-5 py-2 rounded-lg font-mono text-xs font-bold transition shadow-md"
                >
                  Next <i className="codicon codicon-chevron-right"></i>
                </button>
              </div>

              {/* Slide Navigation Step Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {PORTFOLIO_DATA.experience.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`px-3 py-1 rounded text-xs font-mono transition border ${
                      currentSlide === idx
                        ? 'bg-[#007acc] border-[#007acc] text-white font-bold shadow'
                        : 'bg-[#252526] border-[#3c3c3c] text-[#858585] hover:text-white hover:border-[#858585]'
                    }`}
                    title={`Jump to ${item.company}`}
                  >
                    {idx + 1}. {item.company}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

