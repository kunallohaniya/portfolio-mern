/**
 * LanguageToggle Component
 * Toggles between English and Hindi languages
 */

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { MdLanguage } from 'react-icons/md';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
      title={`Current: ${language === 'en' ? 'English' : 'हिंदी'}. Click to switch`}
    >
      <MdLanguage className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      <motion.span
        key={language}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {language === 'en' ? 'EN' : 'हि'}
      </motion.span>
      
      {/* Tooltip */}
      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {language === 'en' ? 'Switch to Hindi' : 'अंग्रेज़ी में बदलें'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;

