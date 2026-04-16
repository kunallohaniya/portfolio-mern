/**
 * Language Context - Provides internationalization (i18n) support
 * Supports English and Hindi with optional Bhashini API integration
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import enTranslations from '../i18n/en.json';
import hiTranslations from '../i18n/hi.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('portfolio_language');
    return saved || 'en';
  });

  const [translations, setTranslations] = useState(
    language === 'hi' ? hiTranslations : enTranslations
  );

  // Bhashini API integration (optional - for real-time translation)
  const [bhashiniEnabled, setBhashiniEnabled] = useState(false);

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('portfolio_language', language);
    
    // Update translations based on selected language
    setTranslations(language === 'hi' ? hiTranslations : enTranslations);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = language;
    
    // Update document direction (RTL for Hindi, LTR for English)
    document.documentElement.dir = language === 'hi' ? 'ltr' : 'ltr';
    // Note: Hindi is LTR, but if you add Arabic/Urdu, use 'rtl'
  }, [language]);

  /**
   * Toggle between English and Hindi
   */
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  }, []);

  /**
   * Set specific language
   * @param {string} lang - Language code ('en' or 'hi')
   */
  const changeLanguage = useCallback((lang) => {
    if (lang === 'en' || lang === 'hi') {
      setLanguage(lang);
    }
  }, []);

  /**
   * Get translated text by key path
   * @param {string} key - Dot-notation key path (e.g., 'nav.home')
   * @param {object} replacements - Optional key-value pairs for dynamic replacements
   * @returns {string} Translated text
   * 
   * @example
   * t('nav.home') // Returns "Home" or "होम"
   * t('contact.success', { name: 'John' }) // Returns text with {name} replaced
   */
  const t = useCallback((key, replacements = {}) => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value = translations;

    // Navigate through the nested structure
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // If key not found, return the key itself as fallback
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // If value is not a string, return the key
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Replace placeholders with actual values
    let translatedText = value;
    Object.keys(replacements).forEach(placeholder => {
      const regex = new RegExp(`{${placeholder}}`, 'g');
      translatedText = translatedText.replace(regex, replacements[placeholder]);
    });

    return translatedText;
  }, [translations]);

  /**
   * Translate text using Bhashini API (optional advanced feature)
   * @param {string} text - Text to translate
   * @param {string} targetLang - Target language code
   * @returns {Promise<string>} Translated text
   */
  const translateWithBhashini = useCallback(async (text, targetLang = 'hi') => {
    // Check if Bhashini is configured
    const apiKey = import.meta.env.VITE_BHASHINI_KEY;
    const userId = import.meta.env.VITE_BHASHINI_USER_ID;
    const apiUrl = import.meta.env.VITE_BHASHINI_API_URL;

    if (!apiKey || !userId || !apiUrl) {
      console.warn('Bhashini API not configured. Using local translations.');
      return text;
    }

    try {
      // Simplified Bhashini API call - actual implementation may vary
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey,
          'userId': userId
        },
        body: JSON.stringify({
          pipelineTasks: [
            {
              taskType: 'translation',
              config: {
                language: {
                  sourceLanguage: 'en',
                  targetLanguage: targetLang
                }
              }
            }
          ],
          inputData: {
            input: [{ source: text }]
          }
        })
      });

      const data = await response.json();
      
      if (data && data.pipelineResponse && data.pipelineResponse[0]) {
        return data.pipelineResponse[0].output[0].target;
      }
      
      return text;
    } catch (error) {
      console.error('Bhashini translation error:', error);
      return text;
    }
  }, []);

  const value = useMemo(() => ({
    language,
    toggleLanguage,
    changeLanguage,
    t,
    translateWithBhashini,
    bhashiniEnabled,
    setBhashiniEnabled,
    isEnglish: language === 'en',
    isHindi: language === 'hi'
  }), [
    language,
    toggleLanguage,
    changeLanguage,
    t,
    translateWithBhashini,
    bhashiniEnabled
  ]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;

