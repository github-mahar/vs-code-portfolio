import React from 'react';
import { useVSCode } from '../context/VSCodeContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useVSCode();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-4 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className="pointer-events-auto bg-[#252526] border border-[#3c3c3c] rounded-lg shadow-2xl p-3 text-xs text-[#cccccc] flex items-start space-x-3 border-l-4 border-l-[#007acc] animate-slide-in"
        >
          <div className="text-lg shrink-0 mt-0.5">
            {t.type === 'success' && <i className="codicon codicon-check text-[#27c93f]"></i>}
            {t.type === 'error' && <i className="codicon codicon-error text-[#f44747]"></i>}
            {t.type === 'warning' && <i className="codicon codicon-warning text-[#ffbd2e]"></i>}
            {t.type === 'info' && <i className="codicon codicon-info text-[#007acc]"></i>}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white text-[11px]">{t.source}</span>
              <button
                onClick={() => removeToast(t.id)}
                className="text-[#858585] hover:text-white"
              >
                <i className="codicon codicon-close text-xs"></i>
              </button>
            </div>
            <p className="text-[#cccccc]/90 leading-relaxed font-sans">{t.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
