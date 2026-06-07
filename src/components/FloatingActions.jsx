import React, { useState, useEffect } from 'react';

const FloatingActions = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col gap-3 items-center">

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg group ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7"/>
        </svg>
      </button>

      {/* Download Resume */}
      <a
        href="/Niranjan S CV.pdf"
        download="Niranjan_S_CV.pdf"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#ff2a2a] text-white text-xs font-black uppercase tracking-widest shadow-[0_8px_25px_rgba(255,42,42,0.5)] hover:bg-red-600 hover:shadow-[0_12px_30px_rgba(255,42,42,0.7)] transition-all duration-300 hover:scale-105 group"
        aria-label="Download Resume"
      >
        <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        <span className="hidden sm:inline">Resume</span>
      </a>

    </div>
  );
};

export default FloatingActions;
