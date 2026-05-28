import React, { useState } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiTailwindcss,
  SiNextdotjs, SiSass, SiNodedotjs, SiExpress,
  SiMongodb, SiPython, SiGraphql,
  SiGit, SiDocker, SiVercel,
  SiLinux,
} from 'react-icons/si';
import { MdOutlineApi } from 'react-icons/md';
import { VscVscode } from 'react-icons/vsc';

// Map skill names → react-icon components
const SKILL_ICON_MAP = {
  'React':        SiReact,
  'JavaScript':   SiJavascript,
  'TypeScript':   SiTypescript,
  'HTML/CSS':     SiHtml5,
  'Tailwind CSS': SiTailwindcss,
  'Next.js':      SiNextdotjs,
  'SASS/SCSS':    SiSass,
  'Node.js':      SiNodedotjs,
  'Express.js':   SiExpress,
  'MongoDB':      SiMongodb,
  'Python':       SiPython,
  'REST APIs':    MdOutlineApi,
  'GraphQL':      SiGraphql,
  'Git':          SiGit,
  'Docker':       SiDocker,
  'Vercel':       SiVercel,
  'VS Code':      VscVscode,
  'Linux':        SiLinux,
};

const SkillIcon = ({ skill }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = SKILL_ICON_MAP[skill.name];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '20px 12px',
        border: `1px solid ${hovered ? 'var(--amber)' : 'var(--border-dim)'}`,
        background: hovered ? 'rgba(232,197,71,0.05)' : 'transparent',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        cursor: 'default',
        minHeight: 80,
      }}
    >
      {Icon ? (
        <Icon
          style={{
            width: 28,
            height: 28,
            color: hovered ? 'var(--amber)' : 'var(--offwhite)',
            filter: hovered ? 'none' : 'grayscale(100%) brightness(0.75)',
            transition: 'color 0.25s ease, filter 0.25s ease',
            flexShrink: 0,
          }}
        />
      ) : (
        /* Fallback: render a monogram if no icon exists */
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: hovered ? 'var(--amber)' : 'var(--offwhite)',
            transition: 'color 0.25s ease',
          }}
        >
          {skill.name.substring(0, 2).toUpperCase()}
        </span>
      )}

      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: hovered ? 'var(--amber)' : 'var(--muted)',
          transition: 'color 0.25s ease',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {skill.name}
      </span>
    </div>
  );
};

const Skills = () => {
  const { getSkillsData } = usePortfolioData();
  const skillsData = getSkillsData();

  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const categories = [
    { key: 'frontend', title: 'Frontend Architecture', skills: skillsData.frontend },
    { key: 'backend',  title: 'Backend & Databases',   skills: skillsData.backend  },
    { key: 'tools',    title: 'Systems & DevOps',       skills: skillsData.tools    },
  ];

  const currentCategory = categories.find(cat => cat.key === selectedCategory) || categories[0];

  return (
    <section id="skills" className="section-gap relative overflow-hidden bg-[var(--base)]">
      {/* Editorial section number texture */}
      <span className="section-number-bg" style={{ top: '-60px', left: '40px' }}>03</span>

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT — Typography & Category selector */}
          <div className="lg:col-span-5">
            <p className="label-caps-amber mb-4">CAPABILITIES</p>
            <h2 className="text-display mb-8">
              TECHNICAL<br />
              MASTER-LIST
            </h2>
            <p className="text-sm text-[var(--muted)] font-mono leading-relaxed mb-12 max-w-sm">
              An index of languages, libraries, platforms, and frameworks built around performance, scalability, and code clean-ness.
            </p>

            <div className="flex flex-col gap-4 border-l border-[var(--border-std)] pl-6">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className="filter-btn text-left block w-full py-2 text-sm font-mono tracking-wider cursor-none"
                  style={{
                    color: selectedCategory === cat.key ? 'var(--amber)' : 'var(--muted)'
                  }}
                >
                  {selectedCategory === cat.key ? '▶ ' : ''}{cat.title.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Icon grid */}
          <div className="lg:col-span-7">
            <div className="border-t border-[var(--border-std)] pt-4">
              <span className="label-caps mb-8 block">{currentCategory.title}</span>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 0,
                }}
              >
                {currentCategory.skills.map((skill) => (
                  <SkillIcon key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <hr className="hr-editorial" />
    </section>
  );
};

export default Skills;