import React, { useEffect, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const moveCursor = useCallback((e) => {
    posRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // RAF loop for smooth cursor tracking
    const loop = () => {
      dot.style.left = `${posRef.current.x}px`;
      dot.style.top = `${posRef.current.y}px`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove', moveCursor, { passive: true });

    // Detect interactive elements to morph cursor
    const interactiveSelectors =
      'a, button, [role="button"], input, textarea, select, label, .nav-link, .project-card, .filter-btn, .availability-badge, .command-item';

    const onMouseEnter = () => dot.classList.add('cursor-hover');
    const onMouseLeave = () => dot.classList.remove('cursor-hover');

    // Use event delegation on document
    const handleDocumentMouseOver = (e) => {
      if (e.target.closest(interactiveSelectors)) {
        onMouseEnter();
      }
    };
    const handleDocumentMouseOut = (e) => {
      if (e.target.closest(interactiveSelectors)) {
        onMouseLeave();
      }
    };

    document.addEventListener('mouseover', handleDocumentMouseOver);
    document.addEventListener('mouseout', handleDocumentMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleDocumentMouseOver);
      document.removeEventListener('mouseout', handleDocumentMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [moveCursor]);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
};

export default CustomCursor;
