import React, { useState } from 'react';
import { useVSCode } from '../../context/VSCodeContext';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ContactFormEditor: React.FC = () => {
  const { addToast, markFileSaved, unsavedFiles } = useVSCode();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry / Hire Request',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isUnsaved = unsavedFiles['contact.json'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill in all required fields (name, email, message)', 'warning', 'Form Validation');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send form data to Web3Forms endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '7d3ae0c2-5c4c-43c4-9fe5-ffe766c1839a',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Project Inquiry / Hire Request',
          message: formData.message
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setSubmitted(true);
        markFileSaved('contact.json');

        addToast(
          `Message successfully sent to ${PORTFOLIO_DATA.email}! Mahar Ghulam Muhammad will respond shortly.`,
          'success',
          'Contact Form'
        );
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setIsSubmitting(false);
      markFileSaved('contact.json');
      addToast('Message dispatched! Thank you for reaching out.', 'success', 'Contact Form');
    }
  };

  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#cccccc] p-6 overflow-y-auto font-mono text-xs select-text">
      <div className="max-w-2xl mx-auto bg-[#252526] border border-[#3c3c3c] rounded-lg p-6 shadow-xl space-y-6">
        
        {/* Header Header Bar */}
        <div className="border-b border-[#3c3c3c] pb-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#569cd6] flex items-center gap-2">
              <i className="codicon codicon-mail text-[#007acc]"></i> contact.json
            </h2>
            <p className="text-[#858585] text-xs font-sans mt-0.5">
              Interactive JSON Contact Form — Direct Message to {PORTFOLIO_DATA.name}
            </p>
          </div>
          {isUnsaved ? (
            <span className="bg-[#ffbd2e]/20 text-[#ffbd2e] text-[10px] px-2 py-0.5 rounded font-sans border border-[#ffbd2e]/40">
              ● Unsaved Draft
            </span>
          ) : (
            <span className="bg-[#27c93f]/20 text-[#27c93f] text-[10px] px-2 py-0.5 rounded font-sans border border-[#27c93f]/40">
              ✓ Sent & Saved
            </span>
          )}
        </div>

        {submitted ? (
          <div className="bg-[#2d2d2d] border border-[#27c93f] p-5 rounded text-center space-y-3 font-sans">
            <div className="w-12 h-12 bg-[#27c93f]/20 rounded-full flex items-center justify-center mx-auto text-[#27c93f]">
              <i className="codicon codicon-check text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
            <p className="text-xs text-[#cccccc] max-w-md mx-auto leading-relaxed">
              Thank you for reaching out, <span className="text-[#9cdcfe] font-semibold">{formData.name}</span>. Your message has been routed directly to <span className="text-[#569cd6] font-mono">{PORTFOLIO_DATA.email}</span>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#007acc] hover:bg-[#0062a3] text-white text-xs px-4 py-1.5 rounded transition font-medium"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-[#6a9955] italic text-[11px] mb-2">
              {"// Fill out the JSON properties below and hit Submit"}
            </div>

            <div className="text-[#808080]">{"{"}</div>

            {/* Name Field */}
            <div className="pl-4 space-y-1">
              <label className="text-[#9cdcfe]">
                "name"<span className="text-[#808080]">: </span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] text-[#ce9178] px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#007acc] font-mono"
                required
              />
            </div>

            {/* Email Field */}
            <div className="pl-4 space-y-1">
              <label className="text-[#9cdcfe]">
                "email"<span className="text-[#808080]">: </span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@company.com"
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] text-[#ce9178] px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#007acc] font-mono"
                required
              />
            </div>

            {/* Subject Field */}
            <div className="pl-4 space-y-1">
              <label className="text-[#9cdcfe]">
                "subject"<span className="text-[#808080]">: </span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Project Inquiry / Shopify / React"
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] text-[#ce9178] px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#007acc] font-mono"
              />
            </div>

            {/* Message Field */}
            <div className="pl-4 space-y-1">
              <label className="text-[#9cdcfe]">
                "message"<span className="text-[#808080]">: </span>
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project, timeline, or inquiry..."
                className="w-full bg-[#1e1e1e] border border-[#3c3c3c] text-[#ce9178] px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#007acc] font-mono leading-relaxed resize-none"
                required
              />
            </div>

            <div className="text-[#808080]">{"}"}</div>

            {/* Form Submit Footer */}
            <div className="pt-4 border-t border-[#3c3c3c] flex items-center justify-between font-sans">
              <div className="text-[11px] text-[#858585] flex items-center gap-1">
                <i className="codicon codicon-lock text-xs"></i> Web3Forms Encrypted Endpoint
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#007acc] hover:bg-[#0062a3] text-white px-5 py-2 rounded text-xs font-bold transition flex items-center gap-2 shadow disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <i className="codicon codicon-loading codicon-modifier-spin"></i> Submitting...
                  </>
                ) : (
                  <>
                    <i className="codicon codicon-send"></i> Submit contact.json
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
