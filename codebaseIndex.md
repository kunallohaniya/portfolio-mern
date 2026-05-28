# Portfolio MERN - Codebase Index

Last Updated: May 28, 2026

## Project Overview
A modern, highly interactive, and secure personal portfolio application built with the MERN stack (currently primarily focused on the frontend in this workspace). It features a dynamic project showcase, multilingual support (English/Hindi), advanced UI/UX animations with Framer Motion & GSAP, and a premium **"Monochrome Terminal meets Editorial Print"** visual style. This style features an aesthetic palette of off-whites, solid black/dark backgrounds, amber accent indicators, razor-sharp asymmetric grid elements, flat/sharp borders, high-contrast layouts, and custom typography using Syne and DM Mono fonts.

## Tech Stack (Frontend)
- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS + Custom CSS (`index.css` using theme-specific variables)
- **Animations:** Framer Motion, GSAP (ScrollTrigger, Timeline), Lottie React
- **State Management:** React Context API (`ThemeContext`, `LanguageContext`), Zustand
- **Routing:** React Router DOM
- **SEO & PWA:** React Helmet Async, Vite PWA Plugin
- **Forms & Security:** EmailJS, React Google reCAPTCHA
- **Icons & Typography:** React Icons, React Typed

## Directory Structure

```text
portfolio-mern/
├── frontend/                 # Main React Application
│   ├── public/               # Static assets (images, icons, manifest)
│   ├── src/
│   │   ├── components/       # Reusable UI components (Hero, Projects, Skills, Contact, About, Blog, Footer, Navbar)
│   │   ├── context/          # Global state contexts (Theme, Language)
│   │   ├── data/             # Static data store (portfolio.json)
│   │   ├── hooks/            # Custom React hooks (useAccessibility, useAnalytics, usePortfolioData, etc.)
│   │   ├── i18n/             # Translation files (en.json, hi.json)
│   │   ├── pages/            # Top-level route components (Home, NotFound)
│   │   ├── seo/              # SEO configurations (seoConfig.js)
│   │   ├── utils/            # Utility functions (constants, recaptcha, seoUtils)
│   │   ├── App.jsx           # Main Application Router/Layout
│   │   ├── index.css         # Global directives & custom monochrome variables
│   │   └── main.jsx          # React DOM entry point
│   ├── eslint.config.js      # ESLint flat config
│   ├── tailwind.config.js    # Tailwind theme configuration
│   ├── vite.config.js        # Vite bundler configuration
│   └── package.json          # Frontend dependencies
├── scripts/                  # Batch scripts (START_SERVERS.bat, RESTART_BACKEND.bat)
├── .vscode/                  # VS Code specific settings
├── netlify.toml              # Netlify Deployment Configuration
├── README.md                 # Project documentation
├── codebaseIndex.md          # This index file
└── package.json              # Root workspace package file
```

## Key Modules & Files

### 1. Central Data Store (`frontend/src/data/portfolio.json`)
Acts as the primary data source for the frontend application, containing:
- **Personal Info & Social Links**: Bio, resume links (download & preview URL), contact details.
- **Skills**: Categorized technical skills (Frontend, Backend, Tools) focusing on core active capabilities, with all progress percentages and progress bars removed.
- **Projects**: Detailed professional projects highlighting recent complex AI and enterprise integrations:
  - **ARCL**: SEBI-recognized fintech platform for tri-party repo transactions.
  - **Govern AI**: Data mapping module with LLM-assisted PIID tracking (Groq API, Llama 3, Mixtral).
  - **EasyConnect**: B2B marketplace with AI matchmaking and Groq LLM integration.
  - **Digivote**: E-voting platform with OTP-based login.
  - **Konsensus**: Collaborative boardroom management application.
- **Experience & Education**: Professional timeline.
- **Terminal Commands**: Easter egg interactive terminal configuration.

### 2. Global Contexts & Hooks (`frontend/src/context/` & `frontend/src/hooks/`)
- **`LanguageContext.jsx`**: Handles i18n between English and Hindi, updates document direction/language attributes.
- **`ThemeContext.jsx`**: Manages Light, Dark, and High Contrast mode toggling.
- **Custom Hooks**: Includes `useAccessibility`, `useAnalytics`, `usePortfolioData`, `useUtils`, `useCustomHooks` for modular logic separation.

### 3. Core UI Components (`frontend/src/components/`)
- **Layout & Navigation**:
  - `Navbar.jsx`: Clean logotype with "KL." signature, availability indicators, interactive keyboard command shortcuts, and a minimal monochrome theme toggle button (RiSunLine/RiMoonLine icons) to easily switch between Light and Dark modes.
  - `Footer.jsx`: Two-column editorial design featuring a continuous scrolling marquee showing current tech stacks, social linkages, and personal details.
- **Page Sections**:
  - `Hero.jsx`: High-impact landing presentation utilizing DM Mono/Syne fonts, featuring typewriter animation, Direct Download button, and a new "Preview Resume" button mapped to Google Drive.
  - `About.jsx`: Text-heavy asymmetric layout with raw borders and premium typographic hierarchy.
  - `Projects.jsx` & `ProjectCard.jsx`: Redesigned asymmetric showcase utilizing numeric indicators, left-border hover states, and standard modal overlays.
  - `Skills.jsx`: Minimalist dashboard presenting a 4-column premium icon grid, displaying clean black/white icons by default that transition to glowing amber on hover, with no progress bars or percentages shown.
  - `Contact.jsx`: High-contrast form container utilizing flat border lines, raw monospace fields, and amber status markers. Includes Google reCAPTCHA v2 (dark theme), client-side rate limiting (5 successful messages/24h via local storage), EmailJS dual-send flow (owner notification + optional auto-reply), localhost-aware Netlify fallback skip (no local `/` POST noise), and stricter runtime validation for EmailJS env IDs before send attempts.
  - `Blog.jsx`: Clean list-based editorial layout with search/category filters and fine border underlines (currently fully commented out on the landing page for streamlined presentation).

- **UI Enhancements**:
  - `PageLoader.jsx`: A high-fidelity startup intro using GSAP stroke drawing paths to dynamically animate the user's "KL" initials in custom coordinates.
  - `EasterEggTerminal.jsx`: Fully responsive retro terminal popup allowing commands and amber interface diagnostics matching the design tokens.
  - `CustomCursor.jsx`, `ReadingProgress.jsx`, `SEO.jsx`, `Analytics.jsx`: Enhances site metrics, search optimization, and premium pointer interaction.

### 4. Configuration & Build
- **`vite.config.js`**: Configures React plugin, PWA generation, and asset chunking.
- **`tailwind.config.js`**: Configures Tailwind setup with custom typography support (Syne, DM Mono).
- **`index.css`**: Defines CSS design system tokens (`--base`, `--surface`, `--offwhite`, `--amber`, `--border-std`). Contains three scoped variable blocks: `:root` (fallback dark values), `html.dark` (explicit dark overrides), and `html.light` (editorial off-white inversion). `body` has `transition: background-color 0.25s ease, color 0.25s ease` for smooth theme switching.
- **`netlify.toml`**: Configures deployment settings for Netlify.

## Current Application State
- The frontend is fully functional, styled, responsive, and deployable via Netlify.
- Recent updates include:
  - **Monochrome & Editorial Theme Transition**: Complete overhaul of the layout, moving from purple gradient glassmorphism to an elegant, high-contrast monochrome design.
  - **Initials Startup Loader**: Configured the GSAP preloader SVG tracing mechanism to draw "KL" instead of "KD" signature at startup.
  - **Resume Preview Button**: Added a new secondary preview resume CTA to the Hero component using static data URLs.
  - **Publications / Blog Section Commented Out**: Fully commented out the lazy-loaded `Blog` component and its section container in `Home.jsx` to focus the site on primary work, capabilities, and contact points.
  - **Streamlined Skill Sets**: Streamlined the master-list of technical skills by removing AWS, DevOps (CI/CD), Vue.js, Django, PostgreSQL, and Figma, aligning the portfolio tightly with current expertise and focus areas.
  - **Verification, Rate Limiting & Automation (reCAPTCHA + EmailJS)**: Integrated a secure Google reCAPTCHA dark-mode widget to verify contact authenticity, added client-side rate limiting (5 successful dispatches per 24 hours via pure local storage time checking), and configured `@emailjs/browser` for owner-notification plus optional sender auto-reply templates.
  - **Contact Submission Hardening (Dev + Config Guardrails)**: Contact submission now bypasses Netlify form posting on localhost and validates EmailJS env values (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_TEMPLATE_OWNER`, `VITE_EMAILJS_TEMPLATE_AUTOREPLY`) with ID sanity checks before API calls.
  - **Contact Form (Nodemailer Migration)**: Removed EmailJS entirely. Contact form now posts to backend contact API (`${VITE_API_URL}/contact`) where Nodemailer sends owner notification and auto-reply via Gmail App Password. reCAPTCHA is verified server-side, with backend rate limiting (5/24h per IP) layered over client-side localStorage UX limits.
  - **Contact Form (Nodemailer via Netlify Functions)**: Removed EmailJS entirely. Contact form posts to `/.netlify/functions/sendMail`. Nodemailer sends owner notification and auto-reply via Gmail App Password. reCAPTCHA verified server-side. Rate limiting enforced server-side (5/24h per IP) plus client-side localStorage UX layer.
- **Backend Note:** Previous iterations supported a dedicated Express/MongoDB backend (as described in `README.md` and `scripts/`), but local operations and deployments currently rely on the rich frontend UI pulling statically from `portfolio.json`.
