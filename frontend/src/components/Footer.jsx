import React from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Footer = () => {
  const { getPersonalInfo, getSocialLinks, getSkillsData } = usePortfolioData();
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();
  const skills = getSkillsData();

  const allSkills = [
    ...skills.frontend.map(s => s.name),
    ...skills.backend.map(s => s.name),
    ...skills.tools.map(s => s.name),
  ];

  // Duplicate for marquee loop
  const marqueeItems = [...allSkills, ...allSkills, ...allSkills];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--base)] border-t border-[var(--border-std)] relative overflow-hidden">
      
      {/* Tech stack marquee */}
      <div className="py-6 border-b border-[var(--border-std)] bg-[var(--surface)] overflow-hidden">
        <div className="marquee-track">
          {marqueeItems.map((item, idx) => (
            <div key={idx} className="marquee-item">
              <span>{item}</span>
              <span className="marquee-separator">//</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container-editorial py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          
          {/* Brand/Signature */}
          <div>
            <h3 className="text-section-heading mb-4">{personalInfo.name}</h3>
            <p className="text-xs text-[var(--muted)] font-mono leading-relaxed max-w-sm">
              {personalInfo.bio}
            </p>
          </div>

          {/* Socials & Availability */}
          <div className="md:text-right font-mono text-xs">
            <span className="label-caps mb-4 block md:text-right">INDEX / SOCIALS</span>
            <div className="flex flex-wrap md:justify-end gap-x-8 gap-y-2 mb-8">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link cursor-none"
              >
                LinkedIn
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link cursor-none"
              >
                GitHub
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="nav-link cursor-none"
              >
                Email
              </a>
            </div>

            <p className="text-[var(--muted)]">
              AVAILABLE FOR ROLES & CONTRACTS WORLDWIDE
            </p>
          </div>

        </div>

        {/* Bottom imprint */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 border-t border-[var(--border-dim)] font-mono text-[0.65rem] text-[var(--muted)] tracking-wider">
          <p>© {currentYear} {personalInfo.name.toUpperCase()}. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 sm:mt-0">DESIGNED & CODED FOR ABSOLUTE PERFORMANCE</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
