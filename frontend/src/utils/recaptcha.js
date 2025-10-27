// Utility functions for reCAPTCHA v3 integration

/**
 * Load reCAPTCHA script dynamically
 * @param {string} siteKey - reCAPTCHA site key
 * @returns {Promise} - Resolves when script is loaded
 */
export const loadRecaptchaScript = (siteKey) => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.grecaptcha && window.grecaptcha.ready) {
      resolve();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
    document.head.appendChild(script);
  });
};

/**
 * Execute reCAPTCHA verification
 * @param {string} siteKey - reCAPTCHA site key
 * @param {string} action - Action name for reCAPTCHA
 * @returns {Promise<string>} - Resolves with reCAPTCHA token
 */
export const executeRecaptcha = (siteKey, action = 'submit') => {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, { action })
        .then((token) => resolve(token))
        .catch((error) => reject(error));
    });
  });
};

/**
 * Initialize reCAPTCHA and execute verification
 * @param {string} action - Action name for reCAPTCHA
 * @returns {Promise<string>} - Resolves with reCAPTCHA token
 */
export const initAndExecuteRecaptcha = async (action = 'submit') => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
  if (!siteKey) {
    throw new Error('reCAPTCHA site key not configured');
  }

  try {
    await loadRecaptchaScript(siteKey);
    const token = await executeRecaptcha(siteKey, action);
    return token;
  } catch (error) {
    console.error('reCAPTCHA error:', error);
    throw error;
  }
};