import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

/**
 * LazySection Wrapper
 * Only renders its children (which should be lazy-loaded components) 
 * when the section is near the viewport.
 */
const LazySection = ({ children, height = '400px', threshold = 0.05, id }) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
    rootMargin: '400px 0px', // Pre-load even earlier (400px) for seamless transition
  });

  return (
    <section 
      ref={ref} 
      id={id} 
      className="relative w-full overflow-hidden" 
      style={{ minHeight: inView ? 'auto' : height }}
    >
      {inView ? (
        children
      ) : (
        /* Minimalist optimized placeholder */
        <div style={{ height }} className="w-full flex items-center justify-center bg-transparent" />
      )}
    </section>
  );
};

export default React.memo(LazySection);
