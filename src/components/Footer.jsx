import React from 'react';
import { Tilt } from 'react-tilt';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-[#d4d4d4] py-16 px-6 md:px-12 w-full font-mono text-[10px] md:text-xs tracking-widest flex flex-col justify-between min-h-[50vh] border-t border-white/5 relative perspective-1000">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50%] bg-gradient-to-tr from-[#ff2a2a]/10 to-transparent blur-[150px] pointer-events-none transform-gpu translate-z-0" />

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full font-medium relative z-10">
        <div className="flex flex-col gap-1">
          <p>Full Stack Development</p>
          <p>React, Node, Django</p>
          <p>Problem Solving</p>
        </div>
        
        <div className="flex flex-col gap-1 md:items-center">
          <p>B.E. CSE & BS @ RIT</p>
          <a href="#projects" className="underline hover:text-white transition-colors mt-1 underline-offset-4 decoration-1">View Work</a>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <p>kallal, Sivaganga district-630305</p>
          <p>Tamil Nadu, India</p>
        </div>
      </div>

      {/* Middle Huge Text in 3D */}
      <div className="w-full flex justify-center items-center py-20 md:py-24 overflow-hidden relative z-10">
        <Tilt options={{ max: 10, scale: 1.05, perspective: 1000 }} className="w-full">
          <h2 className="text-[18vw] md:text-[16vw] leading-none font-sans font-black tracking-tighter uppercase select-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 w-full text-center drop-shadow-[0_20px_50px_rgba(255,42,42,0.2)] transform-gpu hover:drop-shadow-[0_30px_60px_rgba(255,42,42,0.4)] transition-all duration-700">
            NIRANJAN
          </h2>
        </Tilt>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full items-end font-medium relative z-10">
        <div className="flex flex-col gap-6">
          <a href="#contact" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 font-bold">Contact</a>
          <p className="text-white/60 font-mono text-[9px] md:text-[10px]">
            &copy; {new Date().getFullYear()} Niranjan Studio | Built with React
          </p>
        </div>
        
        <div className="flex flex-col gap-2 md:items-center">
          <a href="mailto:niranjan20051008@gmail.com" className="underline hover:text-white transition-colors underline-offset-4 decoration-1 lowercase">niranjan20051008@gmail.com</a>
          <a href="tel:9791490812" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">97914-90812</a>
        </div>
        
        <div className="flex flex-col gap-1 md:items-end">
          <a href="https://www.linkedin.com/in/niranjan-s-bb99b1296" target="_blank" rel="noreferrer" className="underline hover:text-white transition-colors underline-offset-4 decoration-1">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

