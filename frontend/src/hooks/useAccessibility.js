import { useEffect, useState } from 'react';

// Accessibility hook for managing focus, keyboard navigation, and screen reader support
export const useAccessibility = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(highContrastQuery.matches);

    const handleContrastChange = (e) => {
      setIsHighContrast(e.matches);
    };

    highContrastQuery.addEventListener('change', handleContrastChange);

    // Detect keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setIsKeyboardNavigation(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardNavigation(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      highContrastQuery.removeEventListener('change', handleContrastChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Announce message to screen readers
  const announce = (message, priority = 'polite') => {
    const announcement = {
      id: Date.now(),
      message,
      priority,
    };
    setAnnouncements(prev => [...prev, announcement]);

    // Remove announcement after 5 seconds
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
    }, 5000);
  };

  // Focus management
  const focusElement = (element) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  };

  const trapFocus = (container) => {
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  };

  // Skip to content functionality
  const skipToContent = (targetId = 'main') => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView();
      announce(`Skipped to ${targetId} content`);
    }
  };

  // Handle escape key
  const handleEscape = (callback) => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  };

  // Handle arrow key navigation
  const handleArrowNavigation = (items, currentIndex, onNavigate) => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % items.length;
          onNavigate(nextIndex);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          onNavigate(prevIndex);
          break;
        case 'Home':
          e.preventDefault();
          onNavigate(0);
          break;
        case 'End':
          e.preventDefault();
          onNavigate(items.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  };

  // Get accessibility classes based on preferences
  const getAccessibilityClasses = () => {
    const classes = [];
    
    if (isReducedMotion) {
      classes.push('reduce-motion');
    }
    
    if (isHighContrast) {
      classes.push('high-contrast');
    }
    
    if (isKeyboardNavigation) {
      classes.push('keyboard-navigation');
    }

    return classes.join(' ');
  };

  // Validate color contrast
  const validateContrast = (foreground, background) => {
    // Simple contrast ratio calculation
    const getLuminance = (color) => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return 0;
      
      const [r, g, b] = rgb.map(c => {
        c = parseInt(c) / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const fgLuminance = getLuminance(foreground);
    const bgLuminance = getLuminance(background);
    
    const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                     (Math.min(fgLuminance, bgLuminance) + 0.05);
    
    return {
      ratio: contrast,
      passesAA: contrast >= 4.5,
      passesAAA: contrast >= 7,
    };
  };

  return {
    isReducedMotion,
    isHighContrast,
    isKeyboardNavigation,
    announcements,
    announce,
    focusElement,
    trapFocus,
    skipToContent,
    handleEscape,
    handleArrowNavigation,
    getAccessibilityClasses,
    validateContrast,
  };
};

// Hook for managing ARIA live regions
export const useLiveRegion = () => {
  const [liveRegion, setLiveRegion] = useState(null);

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!liveRegion) {
      const region = document.createElement('div');
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      document.body.appendChild(region);
      setLiveRegion(region);
    }

    return () => {
      if (liveRegion && liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    };
  }, [liveRegion]);

  const announce = (message, priority = 'polite') => {
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  };

  return { announce };
};

// Hook for managing focus indicators
export const useFocusIndicator = () => {
  const [showFocusIndicator, setShowFocusIndicator] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setShowFocusIndicator(true);
      }
    };

    const handleMouseDown = () => {
      setShowFocusIndicator(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return showFocusIndicator;
};

export default useAccessibility;
