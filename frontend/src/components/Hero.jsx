import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaArrowDown, FaDownload } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

gsap.registerPlugin(ScrollTrigger);

// Split a string into individual character spans
const SplitChars = ({ text, className = '' }) => (
  <span className={className} aria-label={text} style={{ display: 'inline-block' }}>
    {text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-char"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

const Hero = () => {
  const { getPersonalInfo, getSocialLinks, getProjectsData } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const socialLinks  = getSocialLinks();
  const projects     = getProjectsData();

  // Grab latest project for "Currently building" card
  const latestProject = projects?.[0] ?? null;

  const sectionRef   = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef  = useRef(null);
  const sublineRef   = useRef(null);
  const bioRef       = useRef(null);
  const ctaRef       = useRef(null);
  const socRef       = useRef(null);
  const cardRef      = useRef(null);
  const scrollRef    = useRef(null);

  const firstName = personalInfo?.name?.split(' ')[0] ?? 'Kunal';
  const lastName  = personalInfo?.name?.split(' ')[1] ?? 'Lohaniya';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── SplitText character reveal ──────────────────────────
      const firstChars = firstNameRef.current?.querySelectorAll('.hero-char') ?? [];
      const lastChars  = lastNameRef.current?.querySelectorAll('.hero-char') ?? [];
      const allChars   = [...firstChars, ...lastChars];

      gsap.set(allChars, { opacity: 0, y: -60, rotation: -5 });

      const tl = gsap.timeline({ delay: 0.1 });

      // First name chars
      tl.to(firstChars, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.04,
      });

      // Last name chars (slight overlap)
      tl.to(lastChars, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.04,
      }, '-=0.35');

      // Subline
      tl.fromTo(sublineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.1'
      );

      // Bio
      tl.fromTo(bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );

      // CTA row
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

      // Social row
      tl.fromTo(socRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.15'
      );

      // Terminal card
      tl.fromTo(cardRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );

      // Scroll indicator
      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        paddingTop: 64, // navbar height
        display: 'grid',
        gridTemplateColumns: '1fr',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--base)',
      }}
    >
      {/* Section number texture */}
      <span
        className="section-number-bg"
        style={{ top: '-40px', left: '-20px', pointerEvents: 'none', userSelect: 'none' }}
      >
        01
      </span>

      <div
        className="container-editorial"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '48px',
          alignItems: 'center',
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        {/* LEFT — main content */}
        <div style={{ maxWidth: 720 }}>

          {/* ALL-CAPS label */}
          <p className="label-caps" style={{ marginBottom: 32 }}>
            Full Stack Developer — Faridabad, India
          </p>

          {/* Hero name with split-text reveal */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--hero-size)',
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--offwhite)',
              marginBottom: 8,
            }}
          >
            <span ref={firstNameRef} style={{ display: 'block' }}>
              <SplitChars text={firstName} />
            </span>
            <span
              ref={lastNameRef}
              style={{ display: 'block', color: 'var(--amber)' }}
            >
              <SplitChars text={lastName} />
            </span>
            {/* Blinking cursor */}
            <span className="hero-cursor" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>▮</span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--muted)',
              marginTop: 28,
              marginBottom: 24,
              letterSpacing: '0.02em',
            }}
          >
            {personalInfo?.title} &mdash; {personalInfo?.subtitle}
          </p>

          {/* Bio */}
          <p
            ref={bioRef}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              color: 'var(--muted)',
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            {personalInfo?.bio}
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
            <a
              href={personalInfo?.resumeUrl}
              download
              className="btn-primary"
            >
              <FaDownload style={{ width: 12, height: 12 }} />
              Download Resume
            </a>
            {personalInfo?.resumePreviewUrl && (
              <a
                href={personalInfo?.resumePreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Preview Resume
              </a>
            )}
            <button
              className="btn-outline"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Work
              <FaArrowDown style={{ width: 11, height: 11 }} />
            </button>
          </div>

          {/* Social links */}
          <div ref={socRef} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span className="label-caps" style={{ marginRight: 8 }}>Find me</span>

            {[
              { href: socialLinks?.github,   icon: <FaGithub />,   label: 'GitHub' },
              { href: socialLinks?.linkedin, icon: <FaLinkedin />, label: 'LinkedIn' },
              { href: socialLinks?.email,    label: 'Email', text: '✉' },
            ].map(({ href, icon, label, text }) => (
              <a
                key={label}
                href={href}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--offwhite)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                {icon || text}
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — "Currently building" terminal card */}
        <div
          ref={cardRef}
          style={{ minWidth: 280, maxWidth: 340 }}
          className="hide-on-mobile"
        >
          {latestProject && (
            <div className="terminal-card">
              {/* Titlebar dots */}
              <div style={{
                display: 'flex', gap: 6, marginBottom: 16, paddingTop: 4,
              }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#C0392B', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E8C547', display: 'block' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E', display: 'block' }} />
              </div>

              <p className="terminal-prompt">
                $ currently building:
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--offwhite)',
                fontWeight: 500,
                marginTop: 8,
                marginBottom: 12,
              }}>
                {latestProject.title}
              </p>

              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--muted)',
                lineHeight: 1.65,
                marginBottom: 16,
              }}>
                {latestProject.description.slice(0, 120)}…
              </p>

              {/* Tech stack mini-tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {latestProject.technologies.slice(0, 4).map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              {/* Status line */}
              <div style={{
                marginTop: 16,
                paddingTop: 12,
                borderTop: '1px solid var(--border-dim)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} />
                <span className="label-caps" style={{ color: 'var(--success)', fontSize: '0.6rem' }}>
                  {latestProject.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span className="label-caps" style={{ fontSize: '0.6rem' }}>Scroll</span>
        <div style={{
          width: 1,
          height: 48,
          background: 'linear-gradient(to bottom, var(--border-std), transparent)',
        }} />
      </div>

      {/* Full-bleed bottom divider */}
      <hr className="hr-editorial" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

      {/* Hide right panel on mobile */}
      <style>{`
        .hide-on-mobile { display: block; }
        @media (max-width: 900px) {
          .hide-on-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;