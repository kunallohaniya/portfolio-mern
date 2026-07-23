import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { usePortfolioData } from '../hooks/usePortfolioData';
import ReCAPTCHA from 'react-google-recaptcha';

// Premium Contact Form Component
const ContactForm = React.memo(() => {
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [rateLimitError, setRateLimitError] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio_contact_log');
      if (stored) {
        const log = JSON.parse(stored);
        const twentyFourHoursAgo = new Date().getTime() - 24 * 60 * 60 * 1000;
        const filtered = log.filter(
          timestamp => new Date(timestamp).getTime() > twentyFourHoursAgo
        );
        if (filtered.length >= 5) {
          return '[ RATE LIMIT ] — 5 messages already transmitted in the last 24h. Try again tomorrow.';
        }
      }
    } catch (e) {
      console.error(e);
    }
    return '';
  });

  const validateForm = () => {
    const newErrors = {};

    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed) {
      newErrors.name = 'Name is required';
    } else if (nameTrimmed.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const subjectTrimmed = formData.subject.trim();
    if (!subjectTrimmed) {
      newErrors.subject = 'Subject is required';
    }

    const messageTrimmed = formData.message.trim();
    if (!messageTrimmed) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0 };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationResult = validateForm();
    if (!validationResult.isValid) {
      toast.error('Please fix the errors in the form before submitting.');
      return;
    }

    // Client-side rate limit check
    let contactLog = [];
    try {
      const stored = localStorage.getItem('portfolio_contact_log');
      if (stored) contactLog = JSON.parse(stored);
    } catch (err) {
      console.error('Error reading rate limit log:', err);
    }

    const now = new Date();
    const twentyFourHoursAgo = now.getTime() - 24 * 60 * 60 * 1000;
    const filteredLog = contactLog.filter(
      timestamp => new Date(timestamp).getTime() > twentyFourHoursAgo
    );

    if (filteredLog.length >= 5) {
      setRateLimitError(
        '[ RATE LIMIT ] — 5 messages already transmitted in the last 24h. Try again tomorrow.'
      );
      toast.error('Submission blocked: Rate limit exceeded.');
      return;
    }

    // reCAPTCHA check — required in production, optional in local dev
    if (!recaptchaToken) {
      if (!import.meta.env.DEV) {
        toast.error('Please complete the reCAPTCHA verification.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          recaptchaToken: recaptchaToken || ''
        })
      });

      const rawBody = await response.text();
      let result = {};
      try {
        result = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            'Function not found. Run with netlify dev for local testing.'
          );
        }
        if (response.status === 429) {
          setRateLimitError(result.error);
          toast.error('Submission blocked: Rate limit exceeded.');
          return;
        }
        throw new Error(result.error || 'Transmission failed.');
      }

      const finalLog = [...filteredLog, new Date().toISOString()];
      localStorage.setItem('portfolio_contact_log', JSON.stringify(finalLog));

      toast.success(
        '[ TRANSMITTED ] — Message received. A confirmation has been dispatched to your inbox.'
      );
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
      setRateLimitError('');
    } catch (error) {
      console.error('Transmission failed:', error);
      toast.error(
        '[ ERROR ] — Transmission failed. Please retry or reach out directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 border border-[var(--border-std)] bg-[var(--surface)]">
      <h3 className="text-xl font-bold text-[var(--offwhite)] mb-8 font-display uppercase tracking-wider">
        TRANSMIT DISPATCH //
      </h3>

      <form
        name="contact"
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-6"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="font-mono text-xs">
            <label
              htmlFor="name"
              className="block text-[var(--muted)] mb-2 uppercase tracking-wider"
            >
              NAME *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={validateForm}
              required
              className="w-full px-4 py-3 bg-[var(--base)] text-[var(--offwhite)] border border-[var(--border-dim)] outline-none focus:border-[var(--amber)] transition-colors duration-250 cursor-none"
              placeholder="YOUR NAME"
            />
            {errors.name && (
              <p className="mt-1 text-[var(--alert)]">{errors.name}</p>
            )}
          </div>

          <div className="font-mono text-xs">
            <label
              htmlFor="email"
              className="block text-[var(--muted)] mb-2 uppercase tracking-wider"
            >
              EMAIL ADDRESS *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={validateForm}
              required
              className="w-full px-4 py-3 bg-[var(--base)] text-[var(--offwhite)] border border-[var(--amber)] outline-none focus:border-[var(--amber)] transition-colors duration-250 cursor-none"
              placeholder="YOUR EMAIL"
            />
            {errors.email && (
              <p className="mt-1 text-[var(--alert)]">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="font-mono text-xs">
          <label
            htmlFor="subject"
            className="block text-[var(--muted)] mb-2 uppercase tracking-wider"
          >
            SUBJECT *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={validateForm}
            required
            className="w-full px-4 py-3 bg-[var(--base)] text-[var(--offwhite)] border border-[var(--border-dim)] outline-none focus:border-[var(--amber)] transition-colors duration-250 cursor-none"
            placeholder="SUBJECT HEADING"
          />
          {errors.subject && (
            <p className="mt-1 text-[var(--alert)]">{errors.subject}</p>
          )}
        </div>

        <div className="font-mono text-xs">
          <label
            htmlFor="message"
            className="block text-[var(--muted)] mb-2 uppercase tracking-wider"
          >
            MESSAGE *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={validateForm}
            required
            rows={5}
            className="w-full px-4 py-3 bg-[var(--base)] text-[var(--offwhite)] border border-[var(--border-dim)] outline-none focus:border-[var(--amber)] transition-colors duration-250 resize-none cursor-none"
            placeholder="TYPE DISPATCH DETAILS HERE..."
          />
          {errors.message && (
            <p className="mt-1 text-[var(--alert)]">{errors.message}</p>
          )}
        </div>

        {/* Google reCAPTCHA Verification */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 12px 0' }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => setRecaptchaToken(null)}
            theme="dark"
          />
        </div>

        {/* Rate Limiting Error Inline Display */}
        {rateLimitError && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--amber)',
              border: '1px solid var(--amber)',
              padding: '12px',
              textAlign: 'center',
              margin: '16px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {rateLimitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full justify-center disabled:opacity-50 cursor-none"
        >
          {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
        </button>
      </form>
    </div>
  );
});

ContactForm.displayName = 'ContactForm';

// Premium Contact Info Component
const ContactInfo = React.memo(() => {
  const { getPersonalInfo, getSocialLinks } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();

  return (
    <div className="space-y-8 font-mono text-xs">
      <div>
        <h3 className="text-xl font-bold text-[var(--offwhite)] mb-6 font-display uppercase tracking-wider">
          CHANNELS //
        </h3>
        <p className="text-[var(--muted)] leading-relaxed mb-6">
          Reach out directly regarding active inquiries, design collaborations,
          or engineering role discussions.
        </p>
      </div>

      <div className="space-y-4">
        {[
          { label: 'LOCATION', value: personalInfo.location },
          {
            label: 'EMAIL',
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`
          },
          {
            label: 'LINKEDIN',
            value: 'kunallohaniya',
            href: socialLinks.linkedin
          },
          {
            label: 'GITHUB',
            value: 'kunallohaniya',
            href: socialLinks.github
          }
        ].map((item, index) => (
          <div
            key={index}
            className="p-4 border border-[var(--border-dim)] bg-[var(--surface)]"
          >
            <span className="text-[var(--muted)] block mb-1 uppercase tracking-wider">
              {item.label}
            </span>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--amber)] hover:underline cursor-none"
              >
                {item.value}
              </a>
            ) : (
              <span className="text-[var(--offwhite)]">{item.value}</span>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 border border-[var(--border-dim)] bg-[var(--surface)] flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
        <span className="text-[var(--success)] tracking-wider">
          ACTIVE &amp; AVAILABLE FOR NEW PROJECTS
        </span>
      </div>
    </div>
  );
});

ContactInfo.displayName = 'ContactInfo';

const Contact = () => {
  return (
    <section
      id="contact"
      className="section-gap relative overflow-hidden bg-[var(--base)]"
    >
      <span
        className="section-number-bg"
        style={{ top: '-60px', right: '40px' }}
      >
        06
      </span>

      <div className="container-editorial relative z-10">
        <div className="mb-20">
          <p className="label-caps-amber mb-4">CORRESPONDENCE</p>
          <h2 className="text-display mb-6">
            ESTABLISH
            <br />
            CONNECTION
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-xl font-mono leading-relaxed">
            Get in touch to initiate custom project estimates, engineering
            consultations, or job placement procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};

export default Contact;