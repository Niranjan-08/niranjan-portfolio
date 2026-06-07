import React from 'react';
import { Tilt } from 'react-tilt';
import stackImage from '../assets/about/image.png';
import reactImage from '../assets/about/react.png';
import nodeImage from '../assets/about/node.png';
import mongoImage from '../assets/about/mongodb.png';

const interests = [
  "Web development",
  "Competitive programming",
  "Problem solving in hackathon",
  "User Interface designer",
  "Creating a New App"
];

const defaultTiltOptions = {
	reverse:        false,  
	max:            15,     
	perspective:    1000,   
	scale:          1.05,    
	speed:          1000,   
	transition:     true,   
	axis:           null,   
	reset:          true,    
	easing:         "cubic-bezier(.03,.98,.52,.99)",    
}

const About = () => {
  return (
    <section id="about" className="bg-[#050505] pt-32 pb-40 px-6 md:px-12 w-full relative overflow-hidden font-sans perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff2a2a]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center md:items-start relative z-10">
        
        {/* Left Side: ID Badge in 3D */}
        <div className="flex flex-col items-center w-full md:w-[350px] shrink-0 mt-12 md:mt-0">
          <div data-aos="fade-up" className="relative flex justify-center w-full">
            {/* Lanyard string (Static behind the badge) */}
            <div className="absolute -top-32 left-1/2 w-3 h-40 bg-[#111] border-x border-[#333] transform -translate-x-1/2 shadow-inner z-0"></div>
            
            <Tilt options={defaultTiltOptions} className="relative z-20 w-full max-w-[280px]">
              <div className="relative transform-gpu flex flex-col items-center" style={{ transformStyle: "preserve-3d" }}>
                {/* Lanyard clip (attached to badge) */}
                <div className="absolute -top-6 left-1/2 w-6 h-12 bg-gradient-to-b from-gray-300 to-gray-500 rounded border border-gray-400 transform -translate-x-1/2 z-10 shadow-[0_5px_15px_rgba(0,0,0,0.5)] translate-z-20"></div>
                
                {/* Badge Card */}
                <div className="bg-gradient-to-b from-gray-900 to-black w-full rounded-2xl p-3 shadow-[0_30px_60px_rgba(255,42,42,0.15)] border border-white/10 relative z-20">
                  {/* Cutout Hole */}
                  <div className="absolute -top-3 left-1/2 w-16 h-6 bg-gradient-to-b from-gray-900 to-black border-t border-x border-white/10 rounded-t-xl transform -translate-x-1/2 flex justify-center items-center">
                    <div className="w-8 h-2 bg-black rounded-full shadow-inner"></div>
                  </div>
                  {/* Image Container */}
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-800 border-2 border-transparent relative translate-z-10 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    <img 
                      src={stackImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  {/* Nameplate */}
                  <div className="mt-3 px-2 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl text-center translate-z-20 shadow-lg border border-white/5">
                    <p className="text-[#ff2a2a] text-[9px] tracking-[0.2em] uppercase font-black">Full Stack Developer</p>
                    <p className="text-white text-sm font-black mt-1 tracking-widest">NIRANJAN S</p>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </div>

        {/* Right Side: Info Content */}
        <div data-aos="fade-left" data-aos-delay="200" className="flex-1 text-white mt-8 md:mt-0 relative z-20">
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl">
            Hello! I am <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a2a] to-orange-500">Niranjan S</span>
          </h2>
          
          <p className="text-xl font-bold mb-8 leading-relaxed max-w-3xl text-gray-300">
            A passionate full-stack developer based in Sivaganga, Tamil Nadu, dedicated to crafting clean, functional, and highly scalable web applications.
          </p>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:border-white/20 transition-colors">
            <p className="text-sm font-medium leading-relaxed max-w-3xl text-gray-400">
              <span className="text-[#ff2a2a] font-black mr-2 uppercase tracking-widest text-xs">Career Objective:</span> 
              Fresh and motivated Full Stack Developer with a passion for innovation and problem solving. Skilled in building scalable front-end and back-end solutions with strong technical expertise. Seeking opportunities to deliver impactful, end-to-end applications in a forward-thinking organization.
            </p>
          </div>

          {/* Interests in 3D */}
          <div className="mb-12">
            <h3 className="text-white font-black text-lg mb-4 tracking-widest uppercase text-[#ff2a2a]">Interests</h3>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, i) => (
                <Tilt key={i} options={{ max: 20, scale: 1.1 }} className="transform-gpu">
                  <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gray-900 to-black border border-white/10 text-white/80 text-xs font-bold hover:text-white hover:border-[#ff2a2a]/50 transition-all cursor-default shadow-lg hover:shadow-[0_0_15px_rgba(255,42,42,0.3)]">
                    {interest}
                  </div>
                </Tilt>
              ))}
            </div>
          </div>

          {/* Horizontal Skills Row (3D) */}
          <div className="flex items-center gap-8 mt-8">
            {[reactImage, nodeImage, mongoImage].map((img, idx) => (
              <Tilt key={idx} options={{ max: 30, scale: 1.2 }}>
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:border-[#ff2a2a]/30 transition-colors">
                  <img 
                    src={img} 
                    alt="Skill" 
                    className="w-full h-full object-contain drop-shadow-2xl" 
                  />
                </div>
              </Tilt>
            ))}
          </div>

        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 md:right-20 text-[#ff2a2a] opacity-20 animate-pulse blur-[1px]">
        <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z"/></svg>
      </div>
    </section>
  );
};

export default About;

