import React, { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Tilt } from 'react-tilt';
import heroVideo from '../assets/hero video/WhatsApp Video 2026-06-07 at 9.31.45 AM.mp4';

const roles = [
  'Full Stack Developer',
  'UI/UX Designer',
  'Problem Solver',
  'Competitive Programmer',
  'App Builder',
];

const useTypewriter = (words, typingSpeed = 80, deletingSpeed = 40, pause = 1500) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return text;
};

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' });
  }, []);

  const typedRole = useTypewriter(roles);

  const toggleAudio = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (!isPlaying) {
      // Rewind to start, unmute → perfect sync of video + voice
      video.currentTime = 0;
      video.muted = false;
      video.play();
      setIsPlaying(true);
    } else {
      // Mute and let video loop silently
      video.muted = true;
      setIsPlaying(false);
    }
  };

  // When intro finishes, auto-reset to silent looping
  const handleVideoEnd = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.currentTime = 0;
    video.play();
    setIsPlaying(false);
  };

  const defaultTiltOptions = {
    reverse: false, max: 10, perspective: 1000,
    scale: 1.02, speed: 1000, transition: true,
    axis: null, reset: true, easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black perspective-1000">

      {/* WhatsApp Video — muted silent loop by default, unmuted when user clicks */}
      <video
        ref={videoRef}
        autoPlay
        loop={!isPlaying}
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/55 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 px-6 pb-20 md:pb-[8%] md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-left w-full">

        {/* Left: 3D Text Card */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full">
          <Tilt options={defaultTiltOptions} className="w-full">
            <div
              className="transform-gpu p-4 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h1 data-aos="fade-up" className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tighter uppercase drop-shadow-2xl">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a2a] to-orange-500">
                  NIRANJAN S
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="200" className="text-white/80 text-sm md:text-lg font-medium mb-8 max-w-md leading-relaxed">
                <span className="text-[#ff2a2a] font-black">{typedRole}</span>
                <span className="inline-block w-[2px] h-5 bg-[#ff2a2a] ml-1 animate-pulse align-middle" />
                <br/>
                <span className="text-white/60 text-sm">Building scalable front-end & back-end solutions.</span>
              </p>
              <div data-aos="fade-up" data-aos-delay="400" className="flex flex-row flex-wrap items-center gap-4 w-full">
                <a
                  href="#projects"
                  className="px-6 py-3 md:px-8 md:py-3.5 text-xs md:text-sm uppercase tracking-widest rounded-full bg-[#ff2a2a] text-white font-black hover:bg-red-600 transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(255,42,42,0.4)]"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 md:px-8 md:py-3.5 text-xs md:text-sm uppercase tracking-widest rounded-full bg-white/10 border border-white/30 text-white font-bold hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </Tilt>
        </div>

        {/* Right: Listen to Intro Button */}
        <div
          data-aos="zoom-in"
          data-aos-delay="600"
          className="mt-8 md:mt-0 flex flex-row md:flex-col items-center gap-3 md:gap-4 cursor-pointer group self-start md:self-auto z-30"
          onClick={toggleAudio}
        >
          <Tilt options={{ max: 20, scale: 1.1 }}>
            <div
              className={`relative w-14 h-14 md:w-24 md:h-24 rounded-full border backdrop-blur-lg flex justify-center items-center transition-all duration-500
                ${isPlaying
                  ? 'bg-[#ff2a2a] border-transparent shadow-[0_0_40px_rgba(255,42,42,0.8)]'
                  : 'border-white/20 bg-black/60 group-hover:bg-[#ff2a2a] group-hover:border-transparent group-hover:shadow-[0_20px_40px_rgba(255,42,42,0.6)]'
                }`}
            >
              {/* Pulsing glow ring while playing */}
              {isPlaying && (
                <span className="absolute inset-0 rounded-full bg-[#ff2a2a] animate-ping opacity-30" />
              )}

              {!isPlaying ? (
                /* Speaker icon */
                <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              ) : (
                /* Pause icon */
                <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              )}
            </div>
          </Tilt>

          <div className="flex flex-col items-center gap-1">
            {/* Animated equalizer bars while playing */}
            {isPlaying && (
              <div className="flex items-end gap-[3px] h-5">
                {[2, 4, 3, 5, 3, 4, 2].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-[#ff2a2a] rounded-full animate-pulse"
                    style={{ height: `${h * 3}px`, animationDelay: `${i * 80}ms` }}
                  />
                ))}
              </div>
            )}
            <span className="text-white/70 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase group-hover:text-white transition-colors drop-shadow-md text-center">
              {isPlaying ? 'Pause Intro' : 'Listen to Intro'}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
