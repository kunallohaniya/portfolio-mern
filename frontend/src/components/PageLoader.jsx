import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const pathKRef = useRef(null);
  const pathLRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get total path lengths for stroke-dashoffset draw animation
      const pathK = pathKRef.current;
      const pathL = pathLRef.current;

      if (!pathK || !pathL) return;

      const lenK = pathK.getTotalLength();
      const lenL = pathL.getTotalLength();

      // Set initial dasharray/offset (invisible)
      gsap.set(pathK, {
        strokeDasharray: lenK,
        strokeDashoffset: lenK,
        opacity: 1,
      });
      gsap.set(pathL, {
        strokeDasharray: lenL,
        strokeDashoffset: lenL,
        opacity: 1,
      });

      // Timeline: draw K, then L, then fade loader
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            onComplete: () => {
              if (loaderRef.current) {
                loaderRef.current.style.display = 'none';
              }
              onComplete?.();
            },
          });
        },
      });

      // Draw K
      tl.to(pathK, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      });

      // Draw L (overlapping slightly)
      tl.to(pathL, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      }, '-=0.3');

      // Hold a beat
      tl.to({}, { duration: 0.6 });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="page-loader" aria-hidden="true">
      <svg
        className="loader-svg"
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Letter K */}
        <path
          ref={pathKRef}
          d="M12 8 L12 72 M12 40 L44 8 M12 40 L44 72"
          stroke="#F0EDE6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Letter L */}
        <path
          ref={pathLRef}
          d="M62 8 L62 72 L92 72"
          stroke="#F0EDE6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Loader label */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#333333',
        }}
      >
        loading
      </div>
    </div>
  );
};

export default PageLoader;
