/**
 * ThemeToggle Component
 * Allows users to switch between Light, Dark, and High Contrast themes
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { MdContrast } from 'react-icons/md';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'light', icon: FiSun, label: 'Light' },
    { name: 'dark', icon: FiMoon, label: 'Dark' },
    { name: 'high-contrast', icon: MdContrast, label: 'High Contrast' }
  ];

  const currentIndex = themes.findIndex(t => t.name === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const handleToggle = () => {
    setTheme(nextTheme.name);
  };

  const CurrentIcon = themes.find(t => t.name === theme)?.icon || FiSun;

  return (
    <motion.button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${nextTheme.label} theme`}
      title={`Current: ${themes.find(t => t.name === theme)?.label}. Click for ${nextTheme.label}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CurrentIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </motion.div>
      
      {/* Tooltip */}
      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {nextTheme.label}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;

