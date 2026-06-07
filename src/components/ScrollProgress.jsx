import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff2a2a] to-orange-500 origin-left z-[10000]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
