import React from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const About = () => {
  const { getAboutData } = usePortfolioData();
  const aboutData = getAboutData();

  return (
    <section id="about" className="section-gap relative overflow-hidden bg-[var(--base)]">
      {/* Editorial section number texture */}
      <span className="section-number-bg" style={{ top: '-60px', right: '40px' }}>02</span>

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT — Typography display */}
          <div className="lg:col-span-5">
            <p className="label-caps-amber mb-4">BIOGRAPHY</p>
            <h2 className="text-display mb-8">
              KUNAL<br />
              LOHANIYA
            </h2>
            <p className="text-sm text-[var(--muted)] font-mono leading-relaxed max-w-sm">
              Full-stack engineer focusing on building secure financial pipelines, automated compliance systems, and optimized B2B marketplaces.
            </p>
          </div>

          {/* RIGHT — Descriptions & Stats */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Bio paragraphs */}
            <div className="space-y-6 text-sm text-[var(--offwhite)] font-mono leading-relaxed border-t border-[var(--border-std)] pt-6">
              {aboutData.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Core Values Index */}
            <div className="pt-8 border-t border-[var(--border-dim)]">
              <span className="label-caps mb-6 block">ENGAGEMENT VALUES</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-mono">
                {aboutData.values.map((val, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-xs font-bold text-[var(--amber)] tracking-wider uppercase">
                      {idx + 1}. {val.title}
                    </h4>
                    <p className="text-[0.8rem] text-[var(--muted)] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro-stats board */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[var(--border-dim)]">
              {aboutData.stats.map((stat, index) => (
                <div key={index} className="p-4 border border-[var(--border-dim)] bg-[var(--surface)] text-left font-mono">
                  <span className="text-[var(--amber)] text-lg block mb-1 font-bold">{stat.value}+</span>
                  <span className="text-[0.65rem] tracking-wider uppercase text-[var(--muted)] block">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <hr className="hr-editorial" />
    </section>
  );
};

export default About;