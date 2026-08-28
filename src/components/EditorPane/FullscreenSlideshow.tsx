import React, { useState, useEffect, useCallback } from 'react';
import { useVSCode } from '../../context/VSCodeContext';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { PROJECTS_LIST } from './ProjectsPreview';

export const FullscreenSlideshow: React.FC = () => {
  const { toggleFullscreenSlideshow, openTab, files } = useVSCode();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const slides = [
    { id: 'intro', title: 'Developer Overview', icon: 'account' },
    { id: 'experience', title: 'Work Experience', icon: 'history' },
    { id: 'projects', title: 'Projects Showcase', icon: 'symbol-class' },
    { id: 'skills', title: 'Tech Stack & Tools', icon: 'tools' },
    { id: 'certifications', title: 'Certifications & Degree', icon: 'verified' },
    { id: 'contact', title: 'Contact & Connect', icon: 'mail' },
  ];

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleClose = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    toggleFullscreenSlideshow(false);
  }, [toggleFullscreenSlideshow]);

  // Request Native Fullscreen on Mount
  useEffect(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request error:", err);
      });
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        toggleFullscreenSlideshow(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [toggleFullscreenSlideshow]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, handleClose, totalSlides]);

  const handleOpenContactTab = () => {
    handleClose();
    const contact = files.find(f => f.name === 'contact.json');
    if (contact) openTab(contact);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121212] text-[#cccccc] flex flex-col font-sans select-none overflow-hidden">
      {/* Top Fullscreen Header Toolbar */}
      <div className="h-14 bg-[#1e1e1e] border-b border-[#3c3c3c] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          {/* macOS style traffic light dots */}
          <div className="flex items-center space-x-1.5 mr-2 group/dots">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] flex items-center justify-center text-[8px] text-black/80 font-bold opacity-90 hover:opacity-100 transition shadow-sm"
              title="Exit Presentation View (ESC)"
            >
              <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">×</span>
            </button>
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffcc00] flex items-center justify-center text-[8px] text-black/80 font-bold opacity-90 hover:opacity-100 transition shadow-sm"
              title="Exit Presentation View"
            >
              <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">−</span>
            </button>
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#34c759] flex items-center justify-center text-[8px] text-black/80 font-bold opacity-90 hover:opacity-100 transition shadow-sm"
              title="Exit Presentation View (F5)"
            >
              <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">⤢</span>
            </button>
          </div>

          <div className="w-8 h-8 rounded-lg bg-[#007acc] text-white font-bold flex items-center justify-center text-sm shadow">
            GM
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              {PORTFOLIO_DATA.name} — Interactive Presentation Deck
            </h1>
            <p className="text-[11px] text-[#858585] font-mono">
              Slide {currentSlide + 1} of {totalSlides}: {slides[currentSlide].title}
            </p>
          </div>
        </div>

        {/* Action Controls & Windows Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlay(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
              isAutoPlay
                ? 'bg-[#4ec9b0]/20 border-[#4ec9b0] text-[#4ec9b0]'
                : 'bg-[#252526] border-[#3c3c3c] text-[#cccccc] hover:border-[#007acc]'
            }`}
            title="Toggle 5-second automatic slide advancement"
          >
            <i className={`codicon ${isAutoPlay ? 'codicon-debug-pause' : 'codicon-play'}`}></i>
            {isAutoPlay ? 'Autoplay On (5s)' : 'Autoplay'}
          </button>

          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 bg-[#ce9178]/20 hover:bg-[#ce9178]/30 border border-[#ce9178]/40 text-[#ce9178] px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition"
            title="Exit Fullscreen Presentation (ESC)"
          >
            <i className="codicon codicon-chrome-close"></i> Exit Fullscreen (ESC)
          </button>

          {/* Windows Window Controls */}
          <div className="hidden sm:flex items-center space-x-1 text-[#cccccc]/70 border-l border-[#3c3c3c] pl-3">
            <i 
              className="codicon codicon-chrome-minimize hover:text-white cursor-pointer p-1 rounded hover:bg-[#333333]" 
              onClick={handleClose}
              title="Exit Presentation View"
            ></i>
            <i 
              className="codicon codicon-chrome-restore hover:text-white cursor-pointer p-1 rounded hover:bg-[#333333]" 
              onClick={handleClose}
              title="Exit Presentation View"
            ></i>
            <i 
              className="codicon codicon-chrome-close hover:text-red-400 cursor-pointer p-1 rounded hover:bg-[#c42b1c] hover:text-white transition-colors" 
              onClick={handleClose}
              title="Exit Presentation View"
            ></i>
          </div>
        </div>
      </div>

      {/* Main Presentation Viewport Area */}
      <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center items-center overflow-y-auto relative bg-[#181818]">
        <div className="max-w-5xl w-full mx-auto space-y-6">

          {/* SLIDE 1: INTRO / PROFILE */}
          {currentSlide === 0 && (
            <div className="bg-[#252526] border border-[#007acc]/60 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#007acc] via-[#4ec9b0] to-[#ce9178]"></div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#3c3c3c] pb-8">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#007acc] uppercase tracking-wider font-bold">Frontend Engineer Portfolio</span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {PORTFOLIO_DATA.name}
                  </h2>
                  <p className="text-lg sm:text-xl text-[#569cd6] font-semibold">{PORTFOLIO_DATA.title}</p>
                </div>
                <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-xl text-xs font-mono text-[#ce9178] space-y-1 shrink-0">
                  <div>📍 {PORTFOLIO_DATA.location}</div>
                  <div>✉️ {PORTFOLIO_DATA.email}</div>
                  <div>📞 {PORTFOLIO_DATA.phone}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-mono text-[#9cdcfe] uppercase tracking-wider">Professional Bio & Value Proposition</h3>
                <p className="text-sm sm:text-base text-[#d4d4d4] leading-relaxed bg-[#1e1e1e]/80 p-5 rounded-xl border border-[#3c3c3c]">
                  {PORTFOLIO_DATA.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-[#4ec9b0]">35+</div>
                  <div className="text-[11px] text-[#858585] font-mono mt-1">Component Modules</div>
                </div>
                <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-[#569cd6]">{PORTFOLIO_DATA.experience.length}</div>
                  <div className="text-[11px] text-[#858585] font-mono mt-1">Production Roles</div>
                </div>
                <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-[#ce9178]">{PROJECTS_LIST.length}</div>
                  <div className="text-[11px] text-[#858585] font-mono mt-1">Shipped Projects</div>
                </div>
                <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-[#9cdcfe]">3.67</div>
                  <div className="text-[11px] text-[#858585] font-mono mt-1">BS CS GPA</div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: WORK EXPERIENCE */}
          {currentSlide === 1 && (
            <div className="bg-[#252526] border border-[#4ec9b0]/60 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4ec9b0] via-[#569cd6] to-[#007acc]"></div>

              <div className="border-b border-[#3c3c3c] pb-4 flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono text-[#4ec9b0] uppercase tracking-wider font-bold">Career & Impact</span>
                  <h2 className="text-3xl font-extrabold text-white">Work Experience Trajectory</h2>
                </div>
                <span className="text-xs font-mono text-[#ce9178] bg-[#1e1e1e] px-3 py-1 rounded-full border border-[#ce9178]/30">
                  {PORTFOLIO_DATA.experience.length} Companies
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
                {PORTFOLIO_DATA.experience.map((exp, index) => (
                  <div key={index} className="bg-[#1e1e1e] border border-[#3c3c3c] p-5 rounded-xl space-y-3 hover:border-[#4ec9b0] transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-[#569cd6]">{exp.company}</h3>
                        <p className="text-xs font-semibold text-[#4ec9b0]">{exp.role}</p>
                      </div>
                      <span className="text-[10px] font-mono text-[#ce9178] bg-[#252526] px-2 py-0.5 rounded border border-[#ce9178]/30 shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-[#cccccc]">
                      {exp.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#007acc]">➢</span>
                          <span className="line-clamp-2">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {exp.techStack.map(t => (
                        <span key={t} className="bg-[#2d2d2d] text-[#9cdcfe] text-[10px] px-2 py-0.5 rounded font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 3: PROJECTS SHOWCASE */}
          {currentSlide === 2 && (
            <div className="bg-[#252526] border border-[#ce9178]/60 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ce9178] via-[#007acc] to-[#4ec9b0]"></div>

              <div className="border-b border-[#3c3c3c] pb-4 flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono text-[#ce9178] uppercase tracking-wider font-bold">Featured Shipped Products</span>
                  <h2 className="text-3xl font-extrabold text-white">Projects Showcase Deck</h2>
                </div>
                <span className="text-xs font-mono text-[#569cd6] bg-[#1e1e1e] px-3 py-1 rounded-full border border-[#569cd6]/30">
                  {PROJECTS_LIST.length} Projects
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-1">
                {PROJECTS_LIST.map((proj, idx) => (
                  <div key={idx} className="bg-[#1e1e1e] border border-[#3c3c3c] p-5 rounded-xl space-y-3 flex flex-col justify-between hover:border-[#007acc] transition">
                    <div>
                      <h3 className="text-lg font-bold text-[#569cd6]">{proj.name}</h3>
                      <p className="text-xs font-semibold text-[#9cdcfe] mb-2">{proj.tagline}</p>
                      <p className="text-xs text-[#d4d4d4] leading-relaxed line-clamp-3 mb-3">{proj.description}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {proj.tech.map(t => (
                          <span key={t} className="bg-[#2d2d2d] text-[#4ec9b0] text-[10px] px-2 py-0.5 rounded font-mono">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono pt-2 border-t border-[#3c3c3c]">
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-[#3794ff] hover:underline font-bold">
                          🚀 Launch
                        </a>
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[#9cdcfe] hover:underline">
                          💻 Code
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 4: TECH STACK */}
          {currentSlide === 3 && (
            <div className="bg-[#252526] border border-[#569cd6]/60 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#569cd6] via-[#4ec9b0] to-[#ce9178]"></div>

              <div className="border-b border-[#3c3c3c] pb-4">
                <span className="text-xs font-mono text-[#569cd6] uppercase tracking-wider font-bold">Engineering Stack</span>
                <h2 className="text-3xl font-extrabold text-white">Skills & Core Technologies</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto">
                {PORTFOLIO_DATA.skills.map((skill, index) => (
                  <div key={index} className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-xl text-center hover:border-[#569cd6] transition group">
                    <div className="text-xs font-mono font-bold text-[#9cdcfe] group-hover:text-white transition">
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 5: CERTIFICATIONS & EDUCATION */}
          {currentSlide === 4 && (
            <div className="bg-[#252526] border border-[#4ec9b0]/60 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4ec9b0] via-[#007acc] to-[#ce9178]"></div>

              <div className="border-b border-[#3c3c3c] pb-4">
                <span className="text-xs font-mono text-[#4ec9b0] uppercase tracking-wider font-bold">Credentials & Academics</span>
                <h2 className="text-3xl font-extrabold text-white">Certifications & Degree</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Degree */}
                <div className="bg-[#1e1e1e] border border-[#3c3c3c] p-6 rounded-xl space-y-3">
                  <span className="text-xs font-mono text-[#ce9178] bg-[#252526] px-2.5 py-1 rounded">Degree Program</span>
                  <h3 className="text-xl font-bold text-[#569cd6]">{PORTFOLIO_DATA.education.degree}</h3>
                  <p className="text-sm font-semibold text-[#4ec9b0]">{PORTFOLIO_DATA.education.institution}</p>
                  <p className="text-xs text-[#858585] font-mono">{PORTFOLIO_DATA.education.period} • GPA: {PORTFOLIO_DATA.education.gpa}</p>
                  <p className="text-xs text-[#d4d4d4] pt-2 border-t border-[#3c3c3c]">
                    Coursework: {PORTFOLIO_DATA.education.coursework}
                  </p>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  {PORTFOLIO_DATA.certifications.map((cert, i) => (
                    <div key={i} className="bg-[#1e1e1e] border border-[#3c3c3c] p-4 rounded-xl space-y-1 hover:border-[#4ec9b0] transition">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-[#569cd6]">{cert.title}</h4>
                        <span className="text-[10px] font-mono text-[#ce9178]">{cert.issuer}</span>
                      </div>
                      <p className="text-xs text-[#858585]">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 6: CONTACT */}
          {currentSlide === 5 && (
            <div className="bg-[#252526] border border-[#007acc]/60 p-8 sm:p-12 rounded-2xl shadow-2xl space-y-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#007acc] via-[#ce9178] to-[#4ec9b0]"></div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#007acc] uppercase tracking-wider font-bold">Let's Work Together</span>
                <h2 className="text-4xl font-extrabold text-white">Get In Touch & Connect</h2>
                <p className="text-sm text-[#858585] max-w-xl mx-auto font-mono">
                  Ready to collaborate on React, TypeScript, and high-performance front-end web platforms.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 py-4">
                <a
                  href={`mailto:${PORTFOLIO_DATA.email}`}
                  className="bg-[#007acc] hover:bg-[#005999] text-white px-6 py-3 rounded-xl font-mono text-sm font-bold transition shadow-lg flex items-center gap-2"
                >
                  ✉️ {PORTFOLIO_DATA.email}
                </a>
                <a
                  href={PORTFOLIO_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1e1e1e] hover:bg-[#333333] border border-[#3c3c3c] text-white px-6 py-3 rounded-xl font-mono text-sm font-bold transition flex items-center gap-2"
                >
                  💻 GitHub Profile
                </a>
                <button
                  onClick={handleOpenContactTab}
                  className="bg-[#4ec9b0] hover:bg-[#3db39c] text-[#121212] px-6 py-3 rounded-xl font-mono text-sm font-bold transition shadow-lg flex items-center gap-2"
                >
                  📝 Open VS Code Contact Form
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Fullscreen Deck Controls Strip */}
      <div className="h-16 bg-[#1e1e1e] border-t border-[#3c3c3c] px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 shadow-inner">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="flex items-center gap-1.5 bg-[#252526] hover:bg-[#007acc] border border-[#3c3c3c] hover:border-[#007acc] text-white px-4 py-1.5 rounded-lg font-mono text-xs transition shadow"
          >
            <i className="codicon codicon-chevron-left"></i> Previous
          </button>

          <button
            onClick={nextSlide}
            className="flex items-center gap-1.5 bg-[#007acc] hover:bg-[#005999] text-white px-5 py-1.5 rounded-lg font-mono text-xs font-bold transition shadow"
          >
            Next <i className="codicon codicon-chevron-right"></i>
          </button>
        </div>

        {/* Slide Selector Step Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(idx)}
              className={`px-3 py-1 rounded text-xs font-mono transition border whitespace-nowrap ${
                currentSlide === idx
                  ? 'bg-[#007acc] border-[#007acc] text-white font-bold shadow'
                  : 'bg-[#252526] border-[#3c3c3c] text-[#858585] hover:text-white hover:border-[#858585]'
              }`}
            >
              {idx + 1}. {slide.title}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center text-[11px] font-mono text-[#858585] gap-2">
          <span>Use Keyboard <kbd className="bg-[#252526] border border-[#454545] text-[#cccccc] px-1.5 py-0.5 rounded text-[10px]">←</kbd> <kbd className="bg-[#252526] border border-[#454545] text-[#cccccc] px-1.5 py-0.5 rounded text-[10px]">→</kbd></span>
        </div>
      </div>
    </div>
  );
};
