import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useTheme } from '../context/ThemeContext';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact',  label: 'Contact' },
];

const Navbar = ({ onOpenCommand }) => {
  const [scrolled, setScrolled]   = useState(false);
  const [activeId, setActiveId]   = useState('home');
  const [menuOpen, setMenuOpen]   = useState(false);
  const { theme, setThemeMode } = useTheme();
  const [themeBtnHovered, setThemeBtnHovered] = useState(false);

  const handleThemeToggle = () => {
    setThemeMode(theme === 'light' ? 'dark' : 'light');
  };

  // Track scroll for border and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Determine active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);
      let current = 'home';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.id;
        }
      });
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollToContact = () => scrollTo('contact');

  return (
    <header
      className={`navbar-base${scrolled ? ' navbar-scrolled' : ''}`}
      style={{ transition: 'border-color 0.3s ease' }}
    >
      <div className="container-editorial" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logotype */}
        <button
          className="nav-link"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            textTransform: 'none',
            color: 'var(--offwhite)',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
          onClick={() => scrollTo('home')}
        >
          KL<span style={{ color: 'var(--amber)' }}>.</span>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-link${activeId === item.id ? ' active' : ''}`}
              style={{ background: 'none', border: 'none' }}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="hidden-mobile">
          {/* Availability badge */}
          <button
            className="availability-badge"
            onClick={scrollToContact}
            title="Click to get in touch"
            style={{ background: 'none', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <span className="availability-dot" />
            Available for work
          </button>

          {/* Ctrl+K hint */}
          <button
            onClick={onOpenCommand}
            style={{
              background: 'none',
              border: '1px solid var(--border-std)',
              color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              padding: '4px 10px',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.color = 'var(--amber)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-std)'; e.currentTarget.style.color = 'var(--muted)'; }}
            title="Open command palette"
          >
            <span>⌘K</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            onMouseEnter={() => setThemeBtnHovered(true)}
            onMouseLeave={() => setThemeBtnHovered(false)}
            style={{
              background: 'none',
              borderRadius: '0',
              border: '1px solid ' + (themeBtnHovered ? 'var(--amber)' : 'var(--border-std)'),
              color: themeBtnHovered ? 'var(--amber)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              padding: '4px 10px',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'border-color 150ms ease, color 150ms ease',
              textTransform: 'uppercase',
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <RiSunLine style={{ width: 14, height: 14 }} />
            ) : (
              <RiMoonLine style={{ width: 14, height: 14 }} />
            )}
            <span>{theme === 'light' ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: '1px solid var(--border-std)',
            color: 'var(--offwhite)',
            padding: '6px 10px',
            cursor: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
            style={{
              background: 'var(--surface)',
              borderTop: '1px solid var(--border-std)',
              overflow: 'hidden',
            }}
          >
            <div className="container-editorial" style={{ paddingTop: 20, paddingBottom: 20 }}>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`nav-link${activeId === item.id ? ' active' : ''}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: '10px 0',
                    fontSize: '0.85rem',
                  }}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile availability */}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-dim)' }}>
                <button className="availability-badge" onClick={scrollToContact} style={{ background: 'none' }}>
                  <span className="availability-dot" />
                  Available for work
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive helpers (inline — avoids Tailwind config dependency) */}
      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
