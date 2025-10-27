import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes, FaChevronRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { TERMINAL_COMMANDS, PERSONAL_INFO, SOCIAL_LINKS, SKILLS, PROJECTS } from '../utils/constants';

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to the developer terminal! Type "help" to see available commands.' }
  ]);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

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
      newHistory.push({ type: 'output', content: TERMINAL_COMMANDS.help.output });
      newHistory.push({ type: 'output', content: 'Available commands: help, skills, projects, about, contact, clear, theme' });
    } else if (trimmedCmd === 'skills') {
      const frontendSkills = SKILLS.frontend.map(skill => `${skill.name}: ${skill.level}%`).join(', ');
      const backendSkills = SKILLS.backend.map(skill => `${skill.name}: ${skill.level}%`).join(', ');
      const toolsSkills = SKILLS.tools.map(skill => `${skill.name}: ${skill.level}%`).join(', ');
      
      newHistory.push({ type: 'output', content: 'Frontend Skills:' });
      newHistory.push({ type: 'output', content: frontendSkills });
      newHistory.push({ type: 'output', content: '\nBackend Skills:' });
      newHistory.push({ type: 'output', content: backendSkills });
      newHistory.push({ type: 'output', content: '\nTools & Others:' });
      newHistory.push({ type: 'output', content: toolsSkills });
    } else if (trimmedCmd === 'projects') {
      const featuredProjects = PROJECTS.filter(project => project.featured);
      newHistory.push({ type: 'output', content: 'Featured Projects:' });
      featuredProjects.forEach((project, index) => {
        newHistory.push({ type: 'output', content: `${index + 1}. ${project.title} - ${project.category}` });
        newHistory.push({ type: 'output', content: `   Description: ${project.description}` });
        newHistory.push({ type: 'output', content: `   Technologies: ${project.technologies.join(', ')}` });
        if (project.githubUrl) {
          newHistory.push({ type: 'output', content: `   GitHub: ${project.githubUrl}` });
        }
        if (project.liveUrl) {
          newHistory.push({ type: 'output', content: `   Live Demo: ${project.liveUrl}` });
        }
        newHistory.push({ type: 'output', content: '' });
      });
    } else if (trimmedCmd === 'about') {
      newHistory.push({ type: 'output', content: TERMINAL_COMMANDS.about.output });
      newHistory.push({ type: 'output', content: `\nExperience: 5+ years in full-stack development` });
      newHistory.push({ type: 'output', content: `Location: ${PERSONAL_INFO.location}` });
      newHistory.push({ type: 'output', content: `Email: ${PERSONAL_INFO.email}` });
    } else if (trimmedCmd === 'contact') {
      newHistory.push({ type: 'output', content: TERMINAL_COMMANDS.contact.output });
      newHistory.push({ type: 'output', content: `\nSocial Links:` });
      newHistory.push({ type: 'output', content: `GitHub: ${SOCIAL_LINKS.github}` });
      newHistory.push({ type: 'output', content: `LinkedIn: ${SOCIAL_LINKS.linkedin}` });
      newHistory.push({ type: 'output', content: `Twitter: ${SOCIAL_LINKS.twitter}` });
    } else if (trimmedCmd === 'theme') {
      toggleTheme();
      newHistory.push({ type: 'output', content: `Theme switched to ${theme === 'dark' ? 'light' : 'dark'} mode!` });
    } else if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    } else if (trimmedCmd === '') {
      // Empty command, just add to history
    } else {
      newHistory.push({ type: 'output', content: `Command not found: ${cmd}` });
      newHistory.push({ type: 'output', content: 'Type "help" to see available commands.' });
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
        transition={{ delay: 3, type: "spring", stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-300 hover:scale-110"
        title="Open Developer Terminal"
      >
        <FaTerminal className="w-6 h-6" />
      </motion.button>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-dark-900 rounded-lg w-full max-w-4xl h-96 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 border-b border-dark-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-dark-300 text-sm font-mono">
                    developer-terminal
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-dark-400 hover:text-white transition-colors duration-300"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal Content */}
              <div className="p-4 h-full overflow-hidden flex flex-col">
                <div
                  ref={terminalRef}
                  className="flex-1 overflow-y-auto font-mono text-sm text-green-400 space-y-1"
                >
                  {history.map((item, index) => (
                    <div key={index} className={item.type === 'input' ? 'text-blue-400' : 'text-green-400'}>
                      {item.content}
                    </div>
                  ))}
                </div>

                {/* Terminal Input */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
                  <span className="text-blue-400 font-mono">{currentPath} $</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-green-400 font-mono outline-none"
                    placeholder="Type a command..."
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
