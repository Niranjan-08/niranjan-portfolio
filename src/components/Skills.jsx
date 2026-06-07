import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';

// ─── Skill data with real devicon CDN image URLs ───────────────────────────
const skillsData = [
  {
    category: 'Languages',
    color: '#ff2a2a',
    items: [
      { name: 'Java',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'C',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
      { name: 'SQL',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ],
  },
  {
    category: 'Web Development',
    color: '#3b82f6',
    items: [
      { name: 'HTML',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Django',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
    ],
  },
  {
    category: 'Tools & Platforms',
    color: '#10b981',
    items: [
      { name: 'MySQL',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Figma',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
      { name: 'Kotlin',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Git',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Tableau', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
    ],
  },
];

const certifications = [
  { title: 'AI Dashboards using Microsoft Power BI', issuer: 'SKILLNATION' },
  { title: 'SQL Intermediate, Introduction to SQL',  issuer: 'SOLO LEARN' },
  { title: 'Unsupervised Machine Learning',          issuer: 'SCALER' },
  { title: 'MongoDB Transactions',                   issuer: 'MongoDB' },
];

const codingExp = [
  { platform: 'SkillRack',  desc: 'Daily Problem Solving' },
  { platform: 'HackerRank', desc: 'Competitive Programming' },
];

const defaultTiltOptions = {
  reverse: false, max: 15, perspective: 1000,
  scale: 1.05, speed: 800, transition: true,
  axis: null, reset: true, easing: 'cubic-bezier(.03,.98,.52,.99)',
};

// ─── Icon Card ───────────────────────────────────────────────────────────────
const IconCard = ({ name, icon, delay = 0 }) => (
  <Tilt options={{ max: 25, scale: 1.15, perspective: 800 }}>
    <div
      data-aos="zoom-in"
      data-aos-delay={delay}
      className="flex flex-col items-center gap-2 group cursor-default w-[72px]"
    >
      <div
        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center
                   shadow-[0_8px_20px_rgba(0,0,0,0.4)] group-hover:border-white/30
                   group-hover:shadow-[0_12px_30px_rgba(255,255,255,0.1)]
                   transition-all duration-300 transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={icon}
          alt={name}
          className="w-8 h-8 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <span className="text-white/50 text-[10px] font-semibold text-center leading-tight group-hover:text-white/90 transition-colors duration-300">
        {name}
      </span>
    </div>
  </Tilt>
);

// ─── Main Component ──────────────────────────────────────────────────────────
const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0,  60]);

  return (
    <section id="skills" ref={containerRef} className="bg-[#050505] pt-32 pb-32 px-6 md:px-12 w-full relative overflow-hidden perspective-1000">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff2a2a]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div data-aos="fade-up" className="mb-20 text-center">
          <span className="text-[#ff2a2a] text-xs font-black tracking-[0.3em] uppercase">My Arsenal</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 uppercase tracking-tighter drop-shadow-2xl">
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Skills</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">

          {/* ── Left: Skill Groups with Icons ── */}
          <div className="flex-1 flex flex-col gap-10">
            {skillsData.map((group, i) => (
              <motion.div key={i} style={{ y: i % 2 === 0 ? y1 : y2 }}>
                <Tilt options={defaultTiltOptions} className="h-full">
                  <div
                    className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:border-white/20 transition-all cursor-default transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Category header */}
                    <h3 className="text-white font-black text-xl mb-6 flex items-center gap-3 transform-gpu translate-z-20">
                      <span
                        className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        style={{ backgroundColor: group.color }}
                      />
                      {group.category}
                    </h3>

                    {/* Icon grid */}
                    <div className="flex flex-wrap gap-4 transform-gpu translate-z-30">
                      {group.items.map((skill, j) => (
                        <IconCard key={j} name={skill.name} icon={skill.icon} delay={j * 60} />
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          {/* ── Right: Certs & Coding ── */}
          <div className="flex-1 flex flex-col gap-10">

            {/* Certifications */}
            <div>
              <h3 className="text-white font-black text-2xl mb-8 flex items-center gap-4 drop-shadow-md">
                <span className="text-[#ff2a2a] text-3xl">🏆</span> Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, i) => (
                  <div key={i} data-aos="fade-left" data-aos-delay={i * 100}>
                    <Tilt options={defaultTiltOptions} className="h-full">
                      <div
                        className="h-full bg-gradient-to-br from-gray-900 to-[#050505] border border-white/10 rounded-2xl p-6 group hover:border-[#ff2a2a]/50 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(255,42,42,0.2)] cursor-default transform-gpu flex flex-col justify-center"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <p className="text-[#ff2a2a] text-[10px] font-black tracking-widest uppercase mb-2 transform-gpu translate-z-20">
                          {cert.issuer}
                        </p>
                        <p className="text-white font-bold leading-tight group-hover:text-red-50 transition-colors transform-gpu translate-z-30 drop-shadow-sm">
                          {cert.title}
                        </p>
                      </div>
                    </Tilt>
                  </div>
                ))}
              </div>
            </div>

            {/* Coding Experience */}
            <div className="mt-6">
              <h3 className="text-white font-black text-2xl mb-8 flex items-center gap-4 drop-shadow-md">
                <span className="text-[#ff2a2a] text-3xl">💻</span> Coding Experience
              </h3>
              <div className="flex flex-col gap-4">
                {codingExp.map((exp, i) => (
                  <div key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                    <Tilt options={{ ...defaultTiltOptions, max: 5 }} className="h-full w-full">
                      <div
                        className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-[#111] border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 cursor-default transform-gpu shadow-lg hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <span className="text-white font-black text-lg transform-gpu translate-z-20 drop-shadow-md">{exp.platform}</span>
                        <span className="text-white/50 text-sm font-semibold transform-gpu translate-z-10">{exp.desc}</span>
                      </div>
                    </Tilt>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
