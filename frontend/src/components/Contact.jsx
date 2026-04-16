import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaRocket, FaHeart, FaCheck, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { contactAPI } from '../utils/api';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { ANIMATION_VARIANTS } from '../utils/constants';
import ReCAPTCHA from 'react-google-recaptcha';

// Premium Paper Plane Animation Component
const PaperPlaneAnimation = React.memo(({ isFlying }) => {
  return (
    <AnimatePresence>
      {isFlying && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            x: [0, 100, 200, 300],
            y: [0, -50, -100, -150],
            rotate: [0, 15, 30, 45],
            scale: [1, 1.2, 1.5, 0.5],
            opacity: [1, 1, 1, 0]
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          >
            <FaPaperPlane className="w-12 h-12 text-primary-500 drop-shadow-lg" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PaperPlaneAnimation.displayName = 'PaperPlaneAnimation';

// Premium Floating Background Icons Component
const FloatingIcons = React.memo(() => {
  const icons = [
    { Icon: FaEnvelope, delay: 0, position: { top: '10%', left: '10%' } },
    { Icon: FaPhone, delay: 0.5, position: { top: '20%', right: '15%' } },
    { Icon: FaMapMarkerAlt, delay: 1, position: { bottom: '20%', left: '20%' } },
    { Icon: FaRocket, delay: 1.5, position: { bottom: '10%', right: '10%' } },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary-500/20 dark:text-primary-400/20"
          style={position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 4,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  );
});

FloatingIcons.displayName = 'FloatingIcons';

// Premium Contact Form Component
const ContactForm = React.memo(() => {
  const { getContactData } = usePortfolioData();
  const contactData = getContactData();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});

  // Validation rules matching backend
  const validateForm = () => {
    const newErrors = {};

    // Name validation: 2-50 characters
    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed) {
      newErrors.name = 'Name is required';
    } else if (nameTrimmed.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (nameTrimmed.length > 50) {
      newErrors.name = 'Name must not exceed 50 characters';
    }

    // Email validation
    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation: 5-100 characters
    const subjectTrimmed = formData.subject.trim();
    if (!subjectTrimmed) {
      newErrors.subject = 'Subject is required';
    } else if (subjectTrimmed.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    } else if (subjectTrimmed.length > 100) {
      newErrors.subject = 'Subject must not exceed 100 characters';
    }

    // Message validation: 10-1000 characters
    const messageTrimmed = formData.message.trim();
    if (!messageTrimmed) {
      newErrors.message = 'Message is required';
    } else if (messageTrimmed.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (messageTrimmed.length > 1000) {
      newErrors.message = 'Message must not exceed 1000 characters';
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    
    if (!isValid) {
      console.log('Validation failed:', newErrors);
      console.log('Form data:', {
        name: nameTrimmed,
        email: emailTrimmed,
        subject: subjectTrimmed,
        messageLength: messageTrimmed.length
      });
    }
    
    return { isValid, errors: newErrors };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent double submission
    if (isSubmitting) return;
    
    // Validate form before submission
    const validationResult = validateForm();
    console.log('Validation result:', validationResult);
    
    if (!validationResult.isValid) {
      console.log('Form validation failed, preventing submission');
      console.log('Validation errors:', validationResult.errors);
      console.log('Current form data:', formData);
      toast.error('Please fix the errors in the form before submitting.');

      return;
    }
    
    console.log('Form validation passed, proceeding with submission');
    setIsSubmitting(true);

    try {
      // Verify reCAPTCHA
      if (!recaptchaToken) {
        toast.error('Please complete the reCAPTCHA verification.');
        setIsSubmitting(false);
        return;
      }
      
      // Submit form with reCAPTCHA token to backend
      const response = await contactAPI.submit({
        ...formData,
        recaptchaToken
      });
      
      if (response.data.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setIsFlying(true);
        
        setTimeout(() => {
          setIsFlying(false);
        }, 2500);
      } else {
        toast.error(
          response.data.message || 
          'Failed to send message. Please try again later.'
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Detailed logging for debugging 400 errors
      if (error.response?.data) {
        console.log('Server Error Data:', error.response.data);
      }
      
      // Handle network errors
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        toast.error('Cannot connect to server. Please make sure the backend server is running on port 5000.');
        setIsSubmitting(false);
        return;
      }
      
      // Handle validation and specific backend errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const validationErrors = error.response.data.errors
          .map(err => err.msg || err.message)
          .join(', ');
        toast.error(`Validation failed: ${validationErrors}`);
      } else if (error.response?.data?.message) {
        // This will capture "Invalid reCAPTCHA" or custom error messages
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-premium p-10 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden">
      <FloatingIcons />
      <PaperPlaneAnimation isFlying={isFlying} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h3 className="text-3xl font-bold text-dark-800 dark:text-white mb-8 font-heading">
          Send me a message
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="name" className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3">
                Full Name * {formData.name.length > 0 && (
                  <span className="text-xs font-normal text-dark-500">({formData.name.length}/50)</span>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => {
                    setFocusedField(null);
                    validateForm();
                  }}
                  required
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.name
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : focusedField === 'name'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-white/20 dark:border-white/10 bg-white/50 dark:bg-dark-800/50'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-primary-500 opacity-0 pointer-events-none"
                  animate={{ opacity: focusedField === 'name' ? 0.3 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => {
                    setFocusedField(null);
                    validateForm();
                  }}
                  required
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.email
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : focusedField === 'email'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-white/20 dark:border-white/10 bg-white/50 dark:bg-dark-800/50'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-primary-500 opacity-0 pointer-events-none"
                  animate={{ opacity: focusedField === 'email' ? 0.3 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="subject" className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3">
              Subject * {formData.subject.length > 0 && (
                <span className="text-xs font-normal text-dark-500">({formData.subject.length}/100)</span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => {
                  setFocusedField(null);
                  validateForm();
                }}
                required
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                  errors.subject
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : focusedField === 'subject'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-white/20 dark:border-white/10 bg-white/50 dark:bg-dark-800/50'
                }`}
                placeholder="What is this about?"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary-500 opacity-0 pointer-events-none"
                animate={{ opacity: focusedField === 'subject' ? 0.3 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="message" className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3">
              Message * {formData.message.length > 0 && (
                <span className={`text-xs font-normal ${
                  formData.message.length < 10 
                    ? 'text-red-500' 
                    : formData.message.length > 1000 
                    ? 'text-red-500' 
                    : 'text-dark-500'
                }`}>
                  ({formData.message.length}/1000)
                </span>
              )}
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => {
                  setFocusedField(null);
                  validateForm();
                }}
                required
                rows={6}
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none resize-none ${
                  errors.message
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : focusedField === 'message'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-white/20 dark:border-white/10 bg-white/50 dark:bg-dark-800/50'
                }`}
                placeholder="Tell me about your project or just say hello!"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary-500 opacity-0 pointer-events-none"
                animate={{ opacity: focusedField === 'message' ? 0.3 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
          
              <div className="flex justify-center">
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        onChange={(token) => setRecaptchaToken(token)}
        onExpired={() => setRecaptchaToken(null)}
      />
    </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-glow w-full flex items-center justify-center gap-3 py-5 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
                Sending Message...
              </>
            ) : (
              <>
                <FaPaperPlane className="w-6 h-6" />
                Send Message
              </>
            )}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

// Premium Contact Info Component
const ContactInfo = React.memo(() => {
  const { getPersonalInfo, getSocialLinks } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();

  const contactItems = [
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: personalInfo.location,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: personalInfo.phone,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      value: personalInfo.email,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const socialLinksData = [
    { icon: FaLinkedin, href: socialLinks.linkedin, label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: socialLinks.twitter, label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: FaInstagram, href: socialLinks.instagram, label: 'Instagram', color: 'hover:text-pink-500' },
  ];

  return (
    <div className="space-y-10">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-dark-800 dark:text-white mb-6 font-heading">
          Get in touch
        </h3>
        <p className="text-body-lg text-dark-600 dark:text-dark-300 leading-relaxed mb-8">
          I'm always excited to work on new projects and collaborate with amazing people. 
          Whether you have a question, want to discuss a project, or just want to say hello, 
          feel free to reach out!
        </p>
      </motion.div>

      {/* Premium Contact Information */}
      <div className="space-y-6">
        {contactItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className={`glass-premium p-6 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 ${item.bgColor}`}
          >
            <div className="flex items-center">
              <motion.div
                className={`w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center mr-6`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </motion.div>
              <div>
                <h4 className="font-semibold text-dark-800 dark:text-white text-lg mb-1">
                  {item.title}
                </h4>
                <p className={`text-base font-medium ${item.color}`}>
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h4 className="text-xl font-semibold text-dark-800 dark:text-white mb-6 font-heading">
          Follow me
        </h4>
        <div className="flex space-x-4">
          {socialLinksData.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-4 rounded-2xl glass-premium border border-white/20 dark:border-white/10 text-dark-700 dark:text-dark-300 transition-all duration-300 interactive-glow ${social.color}`}
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Premium Availability Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass-premium p-8 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="w-4 h-4 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h4 className="font-semibold text-dark-800 dark:text-white text-lg">
            Available for work
          </h4>
        </div>
        <p className="text-dark-600 dark:text-dark-300 leading-relaxed">
          I'm currently available for freelance projects and full-time opportunities. 
          Let's discuss how we can work together!
        </p>
      </motion.div>
    </div>
  );
});

ContactInfo.displayName = 'ContactInfo';

const Contact = () => {
  const { getPersonalInfo, getSocialLinks } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 dark:from-dark-900 dark:via-dark-800/30 dark:to-dark-700/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 glass-premium rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-48 h-48 glass-premium rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container-premium relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full glass-premium border border-white/20 dark:border-white/10 shadow-xl mb-6"
          >
            <span className="text-sm font-medium text-dark-700 dark:text-dark-300 font-heading">
              💬 Let's Connect
            </span>
          </motion.div>
          
          <h2 className="heading-xl mb-6">
            <span className="gradient-text-premium">
              Let's Work Together
            </span>
          </h2>
          
          <p className="text-body-lg text-dark-600 dark:text-dark-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can create something amazing together.
          </p>
        </motion.div>

        {/* Premium Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm />
          </motion.div>

          {/* Premium Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ContactInfo />
          </motion.div>
        </div>

        {/* Premium Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="glass-premium p-12 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block mb-8"
            >
              <FaRocket className="w-20 h-20 text-primary-500" />
            </motion.div>
            
            <h3 className="heading-lg mb-6">
              <span className="gradient-text-premium">Ready to Start Your Project?</span>
            </h3>
            <p className="text-body-lg text-dark-600 dark:text-dark-300 mb-8 max-w-2xl mx-auto">
              I'm passionate about creating exceptional digital experiences. 
              Let's discuss your project requirements and bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow flex items-center gap-3 px-8 py-4 text-lg font-semibold"
              >
                <FaEnvelope className="w-5 h-5" />
                Email Me Directly
              </motion.a>
              
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center gap-3 px-8 py-4 text-lg font-semibold"
              >
                <FaLinkedin className="w-5 h-5" />
                Connect on LinkedIn
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;