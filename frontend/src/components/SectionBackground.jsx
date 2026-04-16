import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionBackground
 * Provides optimized, hardware-accelerated background blobs.
 * Memoized to prevent re-renders when parent section re-renders.
 */
const SectionBackground = ({ 
  primaryColor = "primary", 
  secondaryColor = "secondary",
  opacity = "0.2",
  blur = "blur-3xl"
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Primary Blob */}
      <motion.div
        className={`absolute top-20 right-20 w-64 h-64 bg-${primaryColor}-500/20 glass-premium rounded-full ${blur} opacity-20`}
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Secondary Blob */}
      <motion.div
        className={`absolute bottom-20 left-20 w-48 h-48 bg-${secondaryColor}-500/20 glass-premium rounded-full ${blur} opacity-20`}
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
          y: [0, 20, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Subtle Mesh Polish */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)]" />
    </div>
  );
};

export default React.memo(SectionBackground);
