import emailjs from '@emailjs/browser';

/**
 * Initialize EmailJS with public key
 */
export const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  if (!publicKey) {
    console.warn('EmailJS public key not configured');
    return false;
  }
  
  emailjs.init(publicKey);
  return true;
};

/**
 * Send email using EmailJS
 * @param {string} serviceId - EmailJS service ID
 * @param {string} templateId - EmailJS template ID
 * @param {object} templateParams - Template parameters
 * @returns {Promise} - Resolves with EmailJS response
 */
export const sendEmail = async (serviceId, templateId, templateParams) => {
  try {
    // Validate environment variables
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceIdEnv = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateIdEnv = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    
    if (!publicKey || !serviceIdEnv || !templateIdEnv) {
      throw new Error('EmailJS environment variables not configured');
    }
    
    // Use environment variables if not provided
    const serviceIdToUse = serviceId || serviceIdEnv;
    const templateIdToUse = templateId || templateIdEnv;
    
    // Send email
    const response = await emailjs.send(
      serviceIdToUse,
      templateIdToUse,
      templateParams
    );
    
    return response;
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
};

/**
 * Send contact form email
 * @param {object} formData - Contact form data
 * @returns {Promise} - Resolves with EmailJS response
 */
export const sendContactEmail = async (formData) => {
  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_name: 'Portfolio Owner', // Replace with your name
    reply_to: formData.email
  };
  
  return await sendEmail(null, null, templateParams);
};