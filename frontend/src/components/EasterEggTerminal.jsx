import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'KUNAL LOHANIYA [OS_VERSION: 1.0.4]. Type "help" for a list of endpoints.' }
  ]);
  const [currentPath] = useState('~/kunallohaniya.dev');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const { toggleTheme } = useTheme();

  // Pull real data from the portfolio data hook
  const { getPersonalInfo, getSocialLinks, getSkillsData, getProjects } = usePortfolioData();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', content: `${currentPath} $ ${cmd}` }];

    if (trimmedCmd === 'help') {
      newHistory.push({ type: 'output', content: 'Available endpoints: help, skills, projects, about, contact, clear, theme' });

    } else if (trimmedCmd === 'skills') {
      const skillsData = getSkillsData();
      const fmt = (arr) => arr.map(s => s.name).join(', ');
      newHistory.push({ type: 'output', content: 'FRONTEND ARCHITECTURE:' });
      newHistory.push({ type: 'output', content: fmt(skillsData.frontend) });
      newHistory.push({ type: 'output', content: 'BACKEND & DATABASES:' });
      newHistory.push({ type: 'output', content: fmt(skillsData.backend) });
      newHistory.push({ type: 'output', content: 'SYSTEMS & DEVOPS:' });
      newHistory.push({ type: 'output', content: fmt(skillsData.tools) });

    } else if (trimmedCmd === 'projects') {
      const projects = getProjects();
      const featured = projects.filter(p => p.featured);
      newHistory.push({ type: 'output', content: 'SELECTED WORKS INDICES:' });
      featured.forEach((project, index) => {
        newHistory.push({ type: 'output', content: `${index + 1}. ${project.title.toUpperCase()} [${project.category.toUpperCase()}]` });
        newHistory.push({ type: 'output', content: `   DESC: ${project.description}` });
        newHistory.push({ type: 'output', content: `   STACK: ${project.technologies.join(', ')}` });
        if (project.liveUrl) {
          newHistory.push({ type: 'output', content: `   URL: ${project.liveUrl}` });
        }
        newHistory.push({ type: 'output', content: '' });
      });

    } else if (trimmedCmd === 'about') {
      const info = getPersonalInfo();
      newHistory.push({ type: 'output', content: `BIOGRAPHY: ${info.bio}` });
      newHistory.push({ type: 'output', content: `LOCATION: ${info.location}` });
      newHistory.push({ type: 'output', content: `EMAIL: ${info.email}` });

    } else if (trimmedCmd === 'contact') {
      const links = getSocialLinks();
      newHistory.push({ type: 'output', content: 'CHANNELS:' });
      if (links.github)   newHistory.push({ type: 'output', content: `GITHUB: ${links.github}` });
      if (links.linkedin) newHistory.push({ type: 'output', content: `LINKEDIN: ${links.linkedin}` });
      if (links.email)    newHistory.push({ type: 'output', content: `EMAIL: ${links.email}` });

    } else if (trimmedCmd === 'theme') {
      toggleTheme();
      newHistory.push({ type: 'output', content: 'SYSTEM THEME TOGGLED.' });

    } else if (trimmedCmd === 'clear') {
      setHistory([]);
      return;

    } else if (trimmedCmd === '') {
      // empty — no-op

    } else {
      newHistory.push({ type: 'output', content: `Command not found: "${cmd}". Type "help" for catalog.` });
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (command.trim()) {
      executeCommand(command);
    }
    setCommand('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-[var(--amber)] text-[var(--base)] border border-[var(--border-std)] hover:bg-[var(--offwhite)] transition-colors duration-250 cursor-none"
        title="Open Developer Terminal"
      >
        <FaTerminal className="w-5 h-5" />
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="easter-terminal w-full max-w-4xl h-96 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal Header */}
              <div className="easter-titlebar">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 bg-[var(--border-std)] rounded-full" />
                  <div className="w-2.5 h-2.5 bg-[var(--border-std)] rounded-full" />
                  <div className="w-2.5 h-2.5 bg-[var(--border-std)] rounded-full" />
                </div>
                <span className="text-[0.65rem] font-mono text-[var(--muted)] uppercase tracking-wider ml-2">
                  bash // terminal-client
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[var(--muted)] hover:text-[var(--offwhite)] transition-colors duration-200 ml-auto cursor-none"
                >
                  <FaTimes className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Terminal Content */}
              <div className="easter-terminal-body flex flex-col">
                <div className="easter-scanline" />
                <div
                  ref={terminalRef}
                  className="flex-1 overflow-y-auto font-mono text-xs space-y-1 easter-text"
                >
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className={item.type === 'input' ? 'text-[var(--offwhite)]' : 'text-[var(--amber)]'}
                    >
                      {item.content}
                    </div>
                  ))}
                </div>

                {/* Terminal Input */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4 relative z-10 font-mono text-xs">
                  <span className="text-[var(--muted)]">{currentPath} $</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-[var(--amber)] outline-none border-none caret-amber"
                    placeholder="Type command..."
                    autoFocus
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
