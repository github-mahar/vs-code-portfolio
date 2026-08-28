import React, { useState } from 'react';

export const MobileWarning: React.FC = () => {
  const [dismissed, setDismissed] = useState<boolean>(false);

  if (dismissed) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      {/* Pop-up Window Box */}
      <div className="w-full max-w-sm bg-[#181818] rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform transition-all scale-100">
        
        {/* Window Header (macOS style white bar) */}
        <div className="bg-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDismissed(true)}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition cursor-pointer"
              title="Close window"
            />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[11px] font-medium text-gray-500 font-mono tracking-tight">System Notice</span>
          <div className="w-10"></div>
        </div>

        {/* Window Body */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          
          {/* Envelope Warning Icon */}
          <div className="relative my-1">
            <svg className="w-36 h-28" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Envelope back lines */}
              <path d="M15 42 L60 12 L105 42" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 42 L15 85 C15 88 17 90 20 90 L100 90 C103 90 105 88 105 85 L105 42" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="#181818" />
              <path d="M15 85 L48 56" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <path d="M105 85 L72 56" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
              <path d="M15 42 L60 68 L105 42" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="#181818" />
              
              {/* Red Warning Triangle Badge in envelope center */}
              <g transform="translate(42, 8)">
                <polygon points="18,2 36,34 0,34" fill="#ff1e1e" stroke="#dc2626" strokeWidth="1.5" />
                <text x="18" y="27" fill="white" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">!</text>
              </g>
            </svg>
          </div>

          {/* Big Red Caution Title */}
          <h2 className="text-2xl font-black text-[#ff2a2a] tracking-wide uppercase drop-shadow-sm">
            Caution Alert!
          </h2>

          {/* Warning Message */}
          <p className="text-sm font-semibold text-gray-200 leading-relaxed max-w-xs">
            Open it on laptop or desktop for better experience
          </p>

          {/* Action Button */}
          <button
            onClick={() => setDismissed(true)}
            className="w-full py-2.5 px-4 mt-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-red-600/30 transition transform active:scale-98 cursor-pointer"
          >
            Continue to Site
          </button>
        </div>

      </div>
    </div>
  );
};
