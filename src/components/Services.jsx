import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Tilt } from 'react-tilt';

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

const TimelineCard = ({ year, title, subtitle, desc, className, aosType, aosDelay, pathLength, containerRef }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!ref.current || !containerRef.current) return;
    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerRect.height;
    
    if (lineTipY >= triggerY && !isActive) setIsActive(true);
    else if (lineTipY < triggerY && isActive) setIsActive(false);
  });

  return (
    <div 
      ref={ref}
      data-aos={aosType || "fade-up"} 
      data-aos-delay={aosDelay}
      className={`w-72 sm:w-80 lg:w-96 rounded-[2rem] relative flex flex-col items-center transition-all duration-700 z-10 ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Connector Dot */}
      <div className="w-5 h-5 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] absolute -top-4 border border-gray-300 z-20 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full opacity-20"></div>
      </div>
      
      <Tilt options={defaultTiltOptions} className="w-full h-full transform-gpu">
        <div className={`w-full h-full rounded-[2rem] p-6 md:p-8 flex flex-col min-h-[220px] transition-all duration-700 border transform-gpu translate-z-10 shadow-[0_15px_40px_rgba(0,0,0,0.2)] ${
          isActive ? 'bg-[#ff2a2a] border-red-400' : 'bg-[#111] border-gray-800 hover:border-gray-600'
        }`} style={{ transformStyle: "preserve-3d" }}>
          
          <span className={`text-lg font-black mb-1 tracking-widest uppercase transition-colors duration-700 transform-gpu translate-z-20 ${
            isActive ? 'text-red-100 drop-shadow-md' : 'text-[#ff2a2a]'
          }`}>{year}</span>
          
          <h3 className={`text-xl font-black mb-1 leading-tight transition-colors duration-700 transform-gpu translate-z-30 ${
            isActive ? 'text-white' : 'text-gray-100'
          }`}>{title}</h3>
          
          <p className={`text-xs font-bold uppercase mb-4 tracking-wider transition-colors duration-700 transform-gpu translate-z-20 ${
            isActive ? 'text-red-200' : 'text-gray-400'
          }`}>{subtitle}</p>
          
          <div className="transform-gpu translate-z-20">
            {Array.isArray(desc) ? (
              <ul className={`text-sm leading-relaxed font-medium transition-colors duration-700 space-y-2 ${
                isActive ? 'text-white' : 'text-gray-400'
              }`}>
                {desc.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 mt-1 block w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${
                isActive ? 'text-white' : 'text-gray-400'
              }`}>{desc}</p>
            )}
          </div>
        </div>
      </Tilt>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section 
      id="experience"
      ref={containerRef}
      className="bg-[#050505] pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+CjxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjMiLz4KPC9zdmc+')] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative md:h-[1600px] z-10">
        
        <div data-aos="fade-up" className="md:absolute top-10 left-0 md:w-[450px] z-20 mb-16 md:mb-0">
          <div className="inline-block border border-white/10 rounded-full px-5 py-1.5 text-xs text-white/50 font-bold mb-8 uppercase tracking-widest shadow-sm bg-white/5 backdrop-blur-md">
            Journey
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight relative uppercase drop-shadow-2xl">
            Education &<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a2a] to-orange-500">Internships</span>
          </h2>
          <p className="text-gray-400 text-base font-medium leading-relaxed max-w-sm">
            My academic foundation and professional hands-on experience in the industry presented in a 3D view.
          </p>
        </div>

        {/* Desktop SVG Animated Dashed Line */}
        <svg className="hidden md:block absolute top-0 left-0 w-full h-[1600px] pointer-events-none z-0" viewBox="0 0 1000 1600" preserveAspectRatio="none">
          <path d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1400" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="8 10" />
          <mask id="path-mask">
            <motion.path d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1400" fill="none" stroke="white" strokeWidth="20" style={{ pathLength }} />
          </mask>
          <path d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1400" fill="none" stroke="#ff2a2a" strokeWidth="3" strokeDasharray="8 10" mask="url(#path-mask)" className="drop-shadow-[0_0_10px_rgba(255,42,42,0.8)]" />
        </svg>

        {/* Mobile SVG */}
        <svg className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0" viewBox="0 0 4 100" preserveAspectRatio="none">
          <path d="M 2,0 L 2,100" fill="none" stroke="#333" strokeWidth="4" strokeDasharray="4 6" vectorEffect="non-scaling-stroke"/>
          <mask id="path-mask-mobile">
            <motion.path d="M 2,0 L 2,100" fill="none" stroke="white" strokeWidth="4" style={{ pathLength }} vectorEffect="non-scaling-stroke"/>
          </mask>
          <path d="M 2,0 L 2,100" fill="none" stroke="#ff2a2a" strokeWidth="4" strokeDasharray="4 6" mask="url(#path-mask-mobile)" vectorEffect="non-scaling-stroke" className="drop-shadow-[0_0_8px_rgba(255,42,42,0.8)]"/>
        </svg>

        <div className="flex flex-col gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">
          
          <TimelineCard 
            year="2023 - 2027"
            title="Bachelor of Computer Science & Business System"
            subtitle="Rajalakshmi Institute of Technology"
            desc="Currently pursuing with 85% aggregate. Focus on core computer science fundamentals and business integration."
            className="md:absolute md:top-[100px] md:right-[5%] lg:right-[10%]"
            aosType="fade-left"
            aosDelay="100"
            pathLength={pathLength}
            containerRef={containerRef}
          />

          <TimelineCard 
            year="Internships"
            title="Professional Experience"
            subtitle="Various Organizations"
            desc={[
              "NSIC: Android App Development",
              "Codsoft: UI/UX Design",
              "INTERNPE: Web Development",
              "Edunet: Foundation of AI",
              "1m1b: AI & Data tools, Dashboard Creation, Reports",
              "Hivericks Technology: Full Stack"
            ]}
            className="md:absolute md:top-[500px] md:left-[5%] lg:left-[10%]"
            aosType="fade-right"
            aosDelay="200"
            pathLength={pathLength}
            containerRef={containerRef}
          />

          <TimelineCard 
            year="2022 - 2023"
            title="Higher Secondary Certificate (HSC)"
            subtitle="Shanthi Rani Matric Hr Sec School"
            desc="Completed with an outstanding 96% score, building a strong analytical and mathematical foundation."
            className="md:absolute md:top-[850px] md:right-[5%] lg:right-[15%]"
            aosType="fade-left"
            aosDelay="300"
            pathLength={pathLength}
            containerRef={containerRef}
          />

          <TimelineCard 
            year="2020 - 2021"
            title="SSLC"
            subtitle="Shanthi Rani Matric Hr Sec School"
            desc="Successfully passed with strong foundational knowledge."
            className="md:absolute md:top-[1250px] md:left-[15%] lg:left-[25%]"
            aosType="fade-right"
            aosDelay="400"
            pathLength={pathLength}
            containerRef={containerRef}
          />

        </div>
      </div>
    </section>
  );
};

export default Experience;

