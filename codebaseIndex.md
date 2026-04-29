# Portfolio MERN - Codebase Index

Last Updated: April 2026

## Project Overview
A modern, highly interactive, and secure personal portfolio application built with the MERN stack (though the frontend is the primary focus in this workspace). It features a dynamic project showcase, multilingual support (English/Hindi), advanced UI/UX animations with Framer Motion & GSAP, and a custom Premium Royal Purple + Gold design system.

## Tech Stack (Frontend)
- **Framework:** React 18 (18.3.1) + Vite 5 (5.4.11)
- **Styling:** Tailwind CSS (3.4.15) + Custom CSS (`index.css`)
- **Animations:** Framer Motion (11.11.0), GSAP (3.12.5), Lottie React
- **State Management:** React Context API (`ThemeContext`, `LanguageContext`), Zustand (5.0.8)
- **Routing:** React Router DOM (6.28.0)
- **SEO & PWA:** React Helmet Async (2.0.5), Vite PWA Plugin (0.21.1)
- **Forms & Security:** EmailJS, React Google reCAPTCHA
- **Icons & Typography:** React Icons (5.3.0), React Typed

## Directory Structure

```text
portfolio-mern/
├── frontend/                 # Main React Application
│   ├── public/               # Static assets (images, icons, manifest)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Global state contexts (Theme, Language)
│   │   ├── data/             # Static data store (portfolio.json)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── i18n/             # Translation files (en.json, hi.json)
│   │   ├── pages/            # Top-level route components (Home, NotFound)
│   │   ├── seo/              # SEO helper components/configurations
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main Application Router/Layout
│   │   ├── index.css         # Global Tailwind directives & custom CSS vars
│   │   └── main.jsx          # React DOM entry point
│   ├── eslint.config.js      # ESLint flat config
│   ├── tailwind.config.js    # Tailwind theme configuration
│   └── vite.config.js        # Vite bundler configuration
├── scripts/                  # Batch scripts (START_SERVERS.bat, RESTART_BACKEND.bat)
├── .vscode/                  # VS Code specific settings (e.g., Tailwind CSS linting)
├── README.md                 # Project documentation
└── package.json              # Root workspace package file
```

## Key Modules & Files

### 1. Central Data Store (`frontend/src/data/portfolio.json`)
Acts as the primary data source for the frontend application, containing:
- **Personal Info & Social Links**: Bio, resume links, contact details.
- **Skills**: Categorized technical skills (Frontend, Backend, Tools) with proficiency levels.
- **Projects**: Detailed project entries. (Recently updated to reflect advanced integrations like Groq API, Llama 3, Mixtral, and AI matchmaking for *Govern AI* and *EasyConnect*).
- **Experience & Education**: Professional timeline.
- **Terminal Commands**: Easter egg interactive terminal configuration.

### 2. Global Contexts (`frontend/src/context/`)
- **`LanguageContext.jsx`**: Handles i18n between English and Hindi, updates document direction/language attributes, and supports optional real-time translation integrations (Bhashini API).
- **`ThemeContext.jsx`**: Manages Light, Dark, and High Contrast mode toggling.

### 3. Core UI Components (`frontend/src/components/`)
- **`Hero.jsx`**: Animated landing section.
- **`Projects.jsx` & `ProjectCard.jsx`**: Renders the portfolio projects with filtering options.
- **`Skills.jsx`**: Displays technical skills.
- **`Contact.jsx`**: Functional contact form integrated with EmailJS and reCAPTCHA.
- **`PremiumUI.jsx` / `SectionBackground.jsx`**: Handles the premium styling, glassmorphism, and gradient backgrounds.
- **`EasterEggTerminal.jsx`**: An interactive, command-line style easter egg component.
- **`LanguageToggle.jsx` & `ThemeToggle.jsx`**: Context-driven UI switchers.

### 4. Configuration & Build
- **`vite.config.js`**: Configures React plugin, PWA generation, and asset chunking.
- **`tailwind.config.js`**: Extends the default Tailwind theme with custom colors (Royal Purple, Gold), animations, and glass UI utilities.
- **`index.css`**: Defines CSS variables (`--color-bg-light`, `--gradient-premium`, etc.) and handles theme-specific overrides (Dark mode, High Contrast) to ensure WCAG AAA compliance.

## Current Application State
- The frontend is fully functional, styled, and responsive.
- The `portfolio.json` has been recently synchronized with the user's latest resume achievements, specifically highlighting AI features (LLMs, Matchmaking, Data Mapping) for key projects.
- Potential backend services (implied by `scripts/` and `README.md`) manage the Admin Panel and dynamic data persistence, although the frontend is fully capable of rendering locally via `portfolio.json` data.
- Known linting warnings (e.g., unused React imports, Tailwind `@apply` unknown rules) have been resolved via VS Code settings and code refactoring.
