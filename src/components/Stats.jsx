import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 3,  suffix: '+', label: 'Projects Built' },
  { value: 5,  suffix: '+', label: 'Internships' },
  { value: 96, suffix: '%', label: 'HSC Score' },
  { value: 85, suffix: '%', label: 'College CGPA' },
];

const useCountUp = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const StatItem = ({ value, suffix, label, animate }) => {
  const count = useCountUp(value, 1600, animate);
  return (
    <div className="flex flex-col items-center gap-1 group">
      <span className="text-4xl md:text-6xl font-black text-white tracking-tighter group-hover:text-[#ff2a2a] transition-colors duration-300">
        {animate ? count : 0}
        <span className="text-[#ff2a2a]">{suffix}</span>
      </span>
      <span className="text-white/50 text-xs md:text-sm font-semibold tracking-widest uppercase">{label}</span>
    </div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#050505] py-20 px-6 md:px-12 w-full border-y border-white/5 relative overflow-hidden">
      {/* Red glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff2a2a]/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 items-center">
          {stats.map((stat, i) => (
            <React.Fragment key={i}>
              <StatItem {...stat} animate={animate} />
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-16 bg-white/10 justify-self-center" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
