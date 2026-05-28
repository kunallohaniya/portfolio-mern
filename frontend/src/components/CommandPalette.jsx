import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = [
  { id: 'home',     label: 'Go to Home',           icon: '⌂',  action: 'scroll', target: 'home' },
  { id: 'about',    label: 'Go to About',           icon: '◎',  action: 'scroll', target: 'about' },
  { id: 'skills',   label: 'Go to Skills',          icon: '◈',  action: 'scroll', target: 'skills' },
  { id: 'projects', label: 'Go to Projects',        icon: '◱',  action: 'scroll', target: 'projects' },
  { id: 'contact',  label: 'Go to Contact',         icon: '◉',  action: 'scroll', target: 'contact' },
  { id: 'resume',   label: 'Download Resume',       icon: '↓',  action: 'download', target: 'https://drive.google.com/uc?export=download&id=1rfce67PhQQAkYXoFPfJwOpl3J6xjhu1H' },
  { id: 'email',    label: 'Copy Email Address',    icon: '@',  action: 'copy', target: 'kunal1912pr@gmail.com' },
  { id: 'github',   label: 'Open GitHub Profile',  icon: '◎',  action: 'link', target: 'https://github.com/kunallohaniya' },
  { id: 'linkedin', label: 'Open LinkedIn',         icon: '◈',  action: 'link', target: 'https://www.linkedin.com/in/kunallohaniya/' },
  { id: 'theme',    label: 'Toggle Theme',          icon: '◑',  action: 'theme' },
];

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(0);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : COMMANDS;

  const execute = useCallback((cmd) => {
    onClose();
    setQuery('');
    setFocused(0);

    setTimeout(() => {
      switch (cmd.action) {
        case 'scroll': {
          const el = document.getElementById(cmd.target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          break;
        }
        case 'download': {
          const a = document.createElement('a');
          a.href = cmd.target;
          a.download = '';
          a.click();
          break;
        }
        case 'copy': {
          navigator.clipboard.writeText(cmd.target).catch(() => {});
          break;
        }
        case 'link': {
          window.open(cmd.target, '_blank', 'noopener,noreferrer');
          break;
        }
        case 'theme': {
          document.documentElement.classList.toggle('light-mode');
          break;
        }
        default: break;
      }
    }, 200);
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocused(f => Math.min(f + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocused(f => Math.max(f - 1, 0));
      } else if (e.key === 'Enter') {
        if (filtered[focused]) execute(filtered[focused]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filtered, focused, execute, onClose]);

  // Reset focus when query changes
  useEffect(() => { setFocused(0); }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setFocused(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="command-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="command-palette"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px' }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.9rem', color: '#888' }}>⌘</span>
              <input
                ref={inputRef}
                className="command-input"
                style={{ padding: '18px 0' }}
                placeholder="Type a command or search…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoComplete="off"
                spellCheck="false"
              />
            </div>

            {/* Results */}
            <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div className="command-item" style={{ color: '#888', cursor: 'default' }}>
                  No commands found
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    className={`command-item${focused === i ? ' focused' : ''}`}
                    style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none' }}
                    onMouseEnter={() => setFocused(i)}
                    onClick={() => execute(cmd)}
                  >
                    <span className="command-icon">{cmd.icon}</span>
                    <span>{cmd.label}</span>
                    {focused === i && (
                      <span className="command-hint">↵ enter</span>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '10px 20px',
              borderTop: '1px solid #222',
              display: 'flex',
              gap: 20,
            }}>
              {[['↑↓', 'navigate'], ['↵', 'select'], ['esc', 'close']].map(([key, desc]) => (
                <span key={key} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#555', display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ color: '#888', background: '#1a1a1a', padding: '1px 5px', border: '1px solid #333' }}>{key}</span>
                  {desc}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
