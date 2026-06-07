import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '', permission: false });
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('Sending...');
    try {
      // Automatically uses Vercel's built-in Serverless Function!
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Sent successfully! Check your inbox soon.');
        setForm({ firstName: '', lastName: '', email: '', message: '', permission: false });
      } else {
        setStatus('Failed to send.');
      }
    } catch {
      setStatus('Failed to send.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0a0a0a] w-full min-h-screen relative overflow-hidden flex flex-col pt-32 pb-20 md:pb-32 border-t border-gray-900 perspective-1000">
      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-white/10 uppercase tracking-tighter select-none scale-y-[1.6] origin-top"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col gap-16 mt-10">
        
        <div data-aos="fade-up" className="text-center md:text-left">
          <span className="text-[#ff2a2a] text-xs font-black tracking-[0.3em] uppercase">Get In Touch</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 uppercase tracking-tighter drop-shadow-2xl">
            Let's build something <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 transform-gpu">Together</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch justify-between w-full">
          
          {/* Left Side: 3D Google Map */}
          <div data-aos="fade-right" className="w-full lg:w-[45%] h-[400px] lg:h-auto min-h-[400px]">
            <Tilt options={{ max: 15, scale: 1.02, perspective: 1000 }} className="w-full h-full">
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(255,42,42,0.15)] bg-gray-900 relative transform-gpu group" style={{ transformStyle: "preserve-3d" }}>
                
                {/* Floating Location Badge over Map */}
                <div className="absolute top-6 left-6 z-20 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl transform-gpu translate-z-20 shadow-xl pointer-events-none">
                  <p className="text-[#ff2a2a] text-[10px] font-black tracking-widest uppercase">Location</p>
                  <p className="text-white text-xs font-bold mt-1">Kallal, Sivaganga District - 630305</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10 pointer-events-none" />
                
                {/* Real Google Map Embed */}
                <iframe 
                  src="https://maps.google.com/maps?q=Kallal,%20Sivaganga%20district,%20630305&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 z-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />

                {/* Get Directions overlay button */}
                <a 
                  href="https://www.google.com/maps/dir//Kallal,+Tamil+Nadu+630305" 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute bottom-6 right-6 z-20 px-6 py-2 bg-[#ff2a2a] text-white text-xs font-bold tracking-wider uppercase rounded-full hover:bg-red-600 transition-colors shadow-lg transform-gpu translate-z-30 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Get Directions
                </a>
              </div>
            </Tilt>
          </div>

          {/* Right Side: Form Card */}
          <div data-aos="fade-left" className="w-full lg:w-[50%] flex flex-col justify-center">
            <Tilt options={{ max: 10, scale: 1.01, perspective: 1000 }} className="w-full h-full">
              <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] w-full h-full rounded-[2rem] border border-white/10 p-8 md:p-12 text-white flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                
                <div className="text-xs font-bold tracking-[0.2em] mb-10 md:mb-12 uppercase opacity-90 flex flex-wrap gap-4 justify-between items-center transform-gpu translate-z-20">
                  <span className="text-[#ff2a2a]">Send a Message</span>
                  {status && <span className={`px-3 py-1 rounded border ${status.includes('successfully') ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}`}>{status}</span>}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full transform-gpu translate-z-10">
                  <div className="flex flex-col sm:flex-row gap-8 w-full">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        id="firstName" 
                        placeholder="First Name" 
                        value={form.firstName}
                        onChange={(e) => setForm({...form, firstName: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-sm focus:outline-none focus:border-[#ff2a2a] transition-colors placeholder-white/40 font-medium rounded-none"
                        required
                        disabled={isSending}
                      />
                    </div>
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        id="lastName" 
                        placeholder="Last Name" 
                        value={form.lastName}
                        onChange={(e) => setForm({...form, lastName: e.target.value})}
                        className="w-full bg-transparent border-b border-white/20 pb-3 text-sm focus:outline-none focus:border-[#ff2a2a] transition-colors placeholder-white/40 font-medium rounded-none"
                        required
                        disabled={isSending}
                      />
                    </div>
                  </div>
                  
                  <div className="relative w-full">
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Email Address" 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 pb-3 text-sm focus:outline-none focus:border-[#ff2a2a] transition-colors placeholder-white/40 font-medium rounded-none"
                      required
                      disabled={isSending}
                    />
                  </div>

                  <div className="relative w-full flex flex-col h-full">
                    <textarea 
                      id="message" 
                      placeholder="Type your message here" 
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      className="w-full h-full min-h-[100px] bg-transparent border-b border-white/20 pb-3 text-sm focus:outline-none focus:border-[#ff2a2a] transition-colors placeholder-white/40 font-medium resize-none rounded-none"
                      required
                      disabled={isSending}
                    ></textarea>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex flex-col gap-8 mt-2">
                    <div className="flex items-start gap-4 text-xs font-medium text-white/60">
                      <input 
                        type="checkbox" 
                        id="permission" 
                        checked={form.permission}
                        onChange={(e) => setForm({...form, permission: e.target.checked})}
                        className="mt-1 w-4 h-4 rounded-sm border-white/40 bg-transparent text-[#ff2a2a] focus:ring-[#ff2a2a] cursor-pointer" 
                        disabled={isSending}
                      />
                      <label htmlFor="permission" className="cursor-pointer leading-snug">
                        I give permission to be contacted regarding opportunities.
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="px-8 py-3.5 rounded-full bg-[#ff2a2a] text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-600 transition-all duration-300 group shadow-[0_5px_20px_rgba(255,42,42,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transform-gpu translate-z-20 w-max"
                    >
                      {isSending ? 'Sending...' : 'Send Message'}
                      {!isSending && (
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </form>

              </div>
            </Tilt>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;

