import { useEffect } from 'react';

const ReadingProgress = () => {
  useEffect(() => {
    const bar = document.getElementById('reading-progress');
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null; // The bar is a real DOM element injected in App.jsx
};

export default ReadingProgress;
