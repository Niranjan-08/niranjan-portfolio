import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

const projects = [
  {
    id: '01',
    title: 'Disaster Management',
    category: 'Mobile Application',
    desc: 'Developed a scalable mobile application for real-time disaster response, featuring emergency alerts, SOS services, shelter location navigation, and donation support. The system achieved a fast 2.1-second SOS response time with 92.4% alert accuracy, ensuring reliable assistance during critical situations. Designed to support over 10,000 users efficiently. Future enhancements include offline functionality and integration with drone surveillance.',
    stats: ['2.1s SOS Response', '92.4% Accuracy', '10K+ Users'],
    tech: ['Mobile Dev', 'Backend', 'Real-time Systems', 'Geolocation'],
    color: 'from-red-600 to-orange-500',
    borderHover: 'hover:border-red-500'
  },
  {
    id: '02',
    title: 'ECHOGUARD',
    category: 'ML / Web App',
    desc: 'ML-Based Early Warning System for Silent Software Project Failure. Detects early signs of project failure using Machine Learning. Integrates a modern frontend with a Django backend and PostgreSQL. Predicts risk scores (Low, Medium, High) using Random Forest and Logistic Regression (via Scikit-learn) analyzing commit frequency, issue trends, and code churn. Features optional GitHub API integration and explainable AI.',
    stats: ['Scikit-learn', 'OTP Auth', 'GitHub API'],
    tech: ['React', 'Django', 'PostgreSQL', 'Python'],
    color: 'from-blue-600 to-cyan-500',
    borderHover: 'hover:border-blue-500'
  },
  {
    id: '03',
    title: 'Social Media Automation',
    category: 'Automation Platform',
    desc: 'Smart social media automation system to manage and publish content across Instagram, YouTube, LinkedIn, and Facebook. Automatically adjusts posts into suitable grid formats. Features include auto-scheduling for predefined times without manual intervention and advanced auto-trigger features that automatically send a direct message (DM) response when someone comments on a post, enhancing engagement.',
    stats: ['Multi-platform', 'Auto-scheduling', 'DM triggers'],
    tech: ['React', 'Node.js', 'Social APIs', 'Automation'],
    color: 'from-purple-600 to-pink-500',
    borderHover: 'hover:border-purple-500'
  }
];

const defaultTiltOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            15,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.02,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Projects = () => {
  return (
    <section id="projects" className="bg-[#050505] pt-32 pb-32 px-6 md:px-12 w-full relative perspective-1000">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-red-600/10 to-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div data-aos="fade-up" className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[#ff2a2a] text-xs font-black tracking-[0.3em] uppercase">Showcase in 3D</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 uppercase tracking-tighter drop-shadow-2xl">
              Featured <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 transform-gpu">Projects</span>
            </h2>
          </div>
          <p className="text-white/50 font-medium max-w-sm text-sm md:text-base leading-relaxed">
            Real-world applications built to solve complex problems using modern tech stacks and machine learning models. Hover over the cards for a 3D experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div 
              key={proj.id}
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="h-full"
            >
              <Tilt options={defaultTiltOptions} className="h-full w-full">
                <div 
                  className={`group relative bg-gradient-to-b from-[#151515] to-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 ${proj.borderHover} hover:shadow-[0_20px_50px_rgba(255,0,0,0.2)] cursor-default flex flex-col h-full transform-gpu`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Abstract Header Image Area */}
                  <div className={`w-full h-48 bg-gradient-to-br ${proj.color} relative overflow-hidden flex items-center justify-center transform-gpu translate-z-10`}>
                    <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-40" />
                    
                    <span className="text-white/20 font-black text-8xl absolute -bottom-6 -right-2 tracking-tighter mix-blend-overlay drop-shadow-2xl transform-gpu translate-z-20">
                      {proj.id}
                    </span>
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black tracking-widest uppercase transform-gpu translate-z-20 shadow-xl">
                      {proj.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1 transform-gpu translate-z-10" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-[#ff2a2a] transition-colors drop-shadow-md">
                      {proj.title}
                    </h3>
                    <p className="text-white/70 text-sm font-medium leading-relaxed mb-8 flex-1 line-clamp-6">
                      {proj.desc}
                    </p>

                    {/* Key Stats */}
                    <div className="flex flex-wrap gap-2 mb-8 transform-gpu translate-z-20">
                      {proj.stats.map(stat => (
                        <span key={stat} className="text-xs font-bold text-white px-3 py-1 rounded bg-white/10 border border-white/20 shadow-md">
                          ✓ {stat}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="pt-6 border-t border-white/10 transform-gpu translate-z-10">
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map(t => (
                          <span key={t} className="text-[10px] font-black tracking-wider text-white/50 uppercase drop-shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
