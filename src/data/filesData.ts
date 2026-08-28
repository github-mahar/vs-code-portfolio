import { PORTFOLIO_DATA } from './portfolioData';
import type { FileItem } from '../types/vscode';

export const VIRTUAL_FILES: FileItem[] = [
  {
    id: 'readme',
    name: 'README.md',
    path: 'README.md',
    type: 'markdown',
    language: 'Markdown',
    icon: 'vscode-icons:file-type-markdown',
    content: `# Mahar Ghulam Muhammad (GM) 🚀

> **React Developer | React.js, TypeScript, REST API Integration, E-Commerce Front-End**  
> 📍 **Location:** ${PORTFOLIO_DATA.location} &nbsp;|&nbsp; 📧 **Email:** [${PORTFOLIO_DATA.email}](mailto:${PORTFOLIO_DATA.email}) &nbsp;|&nbsp; 📞 **Phone:** ${PORTFOLIO_DATA.phone} &nbsp;|&nbsp; 🔗 **GitHub:** [${PORTFOLIO_DATA.github}](${PORTFOLIO_DATA.github})

---

> [!NOTE]
> **Welcome to my Developer Portfolio!**  
> ${PORTFOLIO_DATA.bio}

---

## 🛠️ Technical Core & Skills

- **Front-End Architecture:** React.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Vite, Framer Motion
- **Integrations & APIs:** REST API Integration, Payment Gateway & Third-Party Integration, Supabase, Shopify Liquid & Shopify APIs, Make.com
- **Workflow & Quality:** Git / GitHub, Responsive & Cross-Browser Development, SEO & Performance (Lighthouse)

---

## ⚡ Interactive Features (VS Code Dark+ Clone)

- 📁 **File Explorer**: Browse virtual files in the sidebar drawer
- 📝 **Tabs & Breadcrumbs**: Click open tabs, drag to reorder, view path breadcrumbs
- 👁️ **Markdown & Component Preview**: Toggle raw source code vs live rendered components using the preview icon (\`Ctrl+Shift+V\` / Tab Icon)
- 💻 **Interactive CLI Terminal**: Run commands below (\`help\`, \`neofetch\`, \`cat about.md\`, \`sudo hire-me\`)
- ✉️ **JSON Contact Form**: Submit messages via \`contact.json\` with instant VS Code toast notifications

---

## 🎓 Education & Background

- **BS Computer Science** — University of Lahore (Nov 2023 – Nov 2027) | **GPA:** 3.67
- **Coursework:** Data Structures, Web Technologies, Software Engineering
`
  },
  {
    id: 'about',
    name: 'about.md',
    path: 'src/about.md',
    type: 'markdown',
    language: 'Markdown',
    icon: 'vscode-icons:file-type-markdown',
    content: `# About Me — Mahar Ghulam Muhammad (GM)

> **React Developer | React.js, TypeScript, REST API Integration, E-Commerce Front-End**

---

## 💡 Professional Summary

React front-end developer with production experience building and maintaining live, revenue-generating web applications and e-commerce storefronts. Works daily in React.js, TypeScript, and Vite, with hands-on experience integrating REST APIs, payment gateways, and third-party services into client-facing products. 

Shipped a 35+ section component-based front-end product from scratch and currently owns front-end architecture and integration work for a live client platform. Comfortable owning a feature from component design through deployment, and drawn to agency-style work where design and engineering meet.

---

## 🎓 Education

- **Degree:** BS Computer Science
- **Institution:** University of Lahore
- **Period:** Nov 2023 – Nov 2027
- **GPA:** 3.67
- **Relevant Coursework:** Data Structures, Web Technologies, Software Engineering

---

## 🎯 Engineering Philosophy

- **Component Engineering:** Building modular, reusable, and maintainable React/TypeScript components.
- **Integration Reliability:** Flawless REST API, payment gateway, and third-party webhook data flow handling.
- **Performance First:** Mobile-first responsive layouts with Lighthouse optimization and fast load times.
- **Client Ownership:** End-to-end responsibility from component design through production deployment.
`
  },
  {
    id: 'experience',
    name: 'experience.ts',
    path: 'src/experience.ts',
    type: 'typescript',
    language: 'TypeScript',
    icon: 'vscode-icons:file-type-typescript',
    content: `export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  techStack: string[];
}

/**
 * Work History & Professional Career Trajectory
 */
export const WORK_HISTORY: WorkExperience[] = [
  {
    company: "Imrozia Serene",
    role: "Front-End Developer",
    period: "Mar 2026 – Present",
    location: "Production web store — client-facing, live traffic and revenue",
    highlights: [
      "Own front-end development and UI customization on a live React-driven web platform, including custom component builds and templating.",
      "Integrated REST APIs for payment processing and order automation, including automated email/notification workflows.",
      "Integrated third-party shipping and workflow-automation services, resolving logic and data-flow issues across the stack.",
      "Rebuilt key UI components (footer, dynamic listing logic, responsive size-chart component), diagnosing and fixing runtime/rendering errors."
    ],
    techStack: ["React.js", "TypeScript", "REST APIs", "Payment Gateway Integration"]
  },
  {
    company: "EzzCode (Independent Practice)",
    role: "Web Developer",
    period: "Dec 2025 – Present",
    location: "Freelance web development, Lahore",
    highlights: [
      "Built EzzCode Platform with React.js, TypeScript, Vite, Supabase, and Tailwind CSS, implementing real-time auth and data in a live client-facing app.",
      "Delivered client web builds end-to-end — architecture, custom UI components, configuration, and deployment — including a React booking-and-payment platform with a Supabase backend, Row-Level Security policies, and dual payment paths (gateway + manual transfer).",
      "Built and shipped MAEVEN, a 35+ section front-end product using component-based architecture, vanilla JS, and mobile-first CSS — sold commercially.",
      "Built an AI-powered chatbot integration (Make.com, Anthropic API) as a third-party automation product for a client."
    ],
    techStack: ["React.js", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "Make.com"]
  },
  {
    company: "DevelopersHub Corporation",
    role: "Frontend Developer",
    period: "May 2025 – Dec 2025",
    location: "",
    highlights: [
      "Developed modular, reusable front-end components with responsive design across devices and browsers.",
      "Participated in structured code review workflows to maintain coding standards and code quality."
    ],
    techStack: ["React.js", "JavaScript (ES6+)", "CSS3", "Responsive Design"]
  },
  {
    company: "Soft Pulses",
    role: "Store Management & Data Operations",
    period: "Jul 2024 – Apr 2025",
    location: "",
    highlights: [
      "Managed large-scale product listings and catalog operations on a live e-commerce platform.",
      "Executed SEO and on-page optimization — meta tags, URL structure, alt text — and reported performance via analytics tools."
    ],
    techStack: ["SEO", "E-Commerce Ops", "Analytics"]
  }
];
`
  },
  {
    id: 'projects',
    name: 'projects.tsx',
    path: 'src/projects.tsx',
    type: 'tsx',
    language: 'TypeScript React',
    icon: 'vscode-icons:file-type-reactts',
    content: `import React from 'react';

const projects = [
  {
    name: "MAEVEN",
    tagline: "Custom Shopify 2.0 Theme",
    description: "A premium, fully custom Shopify 2.0 theme built and sold through EzzCode, focused on performance and flexible section-based customization.",
    tech: ["Shopify Liquid", "JavaScript", "CSS"],
    liveUrl: "${PORTFOLIO_DATA.website}",
    githubUrl: "${PORTFOLIO_DATA.github}",
  },
  {
    name: "ProposalCraft",
    tagline: "AI Upwork Proposal Generator",
    description: "SaaS platform helping freelancers craft personalized, high-converting Upwork proposals in seconds based on job descriptions and developer skill profiles.",
    tech: ["Next.js", "Supabase", "Gemini API"],
    liveUrl: "${PORTFOLIO_DATA.website}",
    githubUrl: "${PORTFOLIO_DATA.github}",
  },
  {
    name: "VS Code Portfolio",
    tagline: "This Website",
    description: "A pixel-accurate, fully interactive VS Code UI clone built as a personal developer portfolio, complete with a working file tree, tabs, and terminal.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveUrl: "${PORTFOLIO_DATA.website}",
    githubUrl: "${PORTFOLIO_DATA.github}",
  },
  {
    name: "Imrozia Serene",
    tagline: "Shopify Storefront & Front-End Architecture",
    description: "Engineered custom Shopify 2.0 theme architecture, integrated local payment gateways, automated Cash on Delivery (COD) verification workflows, and optimized mobile site speed.",
    tech: ["Shopify Liquid", "React", "TypeScript", "REST APIs", "COD Automation"],
    liveUrl: "${PORTFOLIO_DATA.website}",
    githubUrl: "${PORTFOLIO_DATA.github}",
  },
  {
    name: "TinyToddz",
    tagline: "E-Commerce Kids Fashion & Apparel Store",
    description: "Custom Shopify store customization with dynamic product catalog filters, mobile-first responsive layout, AJAX cart drawer, and high-conversion checkout flows.",
    tech: ["Shopify Liquid", "JavaScript", "Tailwind CSS"],
    liveUrl: "${PORTFOLIO_DATA.website}",
    githubUrl: "${PORTFOLIO_DATA.github}",
  },
  {
    name: "Abdul Rehman Cheema (ARC)",
    tagline: "Personal Brand & Executive Portfolio Website",
    description: "Sleek, modern web platform designed for personal branding, featuring responsive design system, interactive portfolio showcases, and contact integration.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    liveUrl: "${PORTFOLIO_DATA.website}",
    githubUrl: "${PORTFOLIO_DATA.github}",
  },
];

export const ProjectsShowcase: React.FC = () => {
  return (
    <div className="projects-grid p-4 space-y-6 max-w-4xl mx-auto">
      {projects.map((project) => (
        <div key={project.name} className="project-card border border-[#3c3c3c] bg-[#252526] p-5 rounded-lg shadow-lg hover:border-[#007acc] transition">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-[#569cd6]">{project.name}</h3>
          </div>
          <p className="text-[#9cdcfe] text-sm mb-3">{project.tagline}</p>
          <p className="text-[#d4d4d4] text-sm mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="bg-[#333333] text-[#4ec9b0] text-xs px-2 py-1 rounded font-mono">{tech}</span>
            ))}
          </div>
          <div className="flex gap-4 text-xs font-mono">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[#3794ff] hover:underline">🚀 Launch App</a>}
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[#9cdcfe] hover:underline">💻 View Source</a>}
          </div>
        </div>
      ))}
    </div>
  );
};
`
  },
  {
    id: 'skills',
    name: 'skills.json',
    path: 'src/skills.json',
    type: 'json',
    language: 'JSON',
    icon: 'vscode-icons:file-type-json',
    content: JSON.stringify(PORTFOLIO_DATA.skills, null, 2)
  },
  {
    id: 'certifications',
    name: 'certifications.md',
    path: 'src/certifications.md',
    type: 'markdown',
    language: 'Markdown',
    icon: 'vscode-icons:file-type-markdown',
    content: `# Professional Certifications

- **Claude.ai** — Anthropic
- **Full Stack Development** — Government of Punjab (eHunhar Program)
- **Virtual Assistant** — Daraz
`
  },
  {
    id: 'contact',
    name: 'contact.json',
    path: 'contact.json',
    type: 'json',
    language: 'JSON',
    icon: 'vscode-icons:file-type-json',
    isUnsaved: true,
    content: `{
  "name": "Your Name",
  "email": "your.email@example.com",
  "subject": "Project Inquiry / Hire Request",
  "message": "Hi Mahar Ghulam Muhammad (GM), I saw your portfolio and would like to discuss a project..."
}
`
  },
  {
    id: 'settings',
    name: 'settings.json',
    path: '.vscode/settings.json',
    type: 'json',
    language: 'JSON',
    icon: 'vscode-icons:file-type-json',
    content: `{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Fira Code', 'Courier New', monospace",
  "workbench.colorTheme": "Visual Studio Dark+",
  "portfolio.developer": "${PORTFOLIO_DATA.name}",
  "portfolio.role": "${PORTFOLIO_DATA.title}",
  "portfolio.location": "${PORTFOLIO_DATA.location}",
  "portfolio.email": "${PORTFOLIO_DATA.email}",
  "portfolio.github": "${PORTFOLIO_DATA.github}"
}
`
  }
];

export const INITIAL_FILES = VIRTUAL_FILES;

export const WORKSPACE_TREE = [
  {
    id: 'vscode_folder',
    name: '.vscode',
    path: '.vscode',
    type: 'folder' as const,
    children: [VIRTUAL_FILES.find(f => f.name === 'settings.json')!].filter(Boolean)
  },
  {
    id: 'src_folder',
    name: 'src',
    path: 'src',
    type: 'folder' as const,
    children: [
      VIRTUAL_FILES.find(f => f.name === 'about.md')!,
      VIRTUAL_FILES.find(f => f.name === 'experience.ts')!,
      VIRTUAL_FILES.find(f => f.name === 'projects.tsx')!,
      VIRTUAL_FILES.find(f => f.name === 'skills.json')!,
      VIRTUAL_FILES.find(f => f.name === 'certifications.md')!,
    ].filter(Boolean)
  },
  VIRTUAL_FILES.find(f => f.name === 'contact.json')!,
  VIRTUAL_FILES.find(f => f.name === 'README.md')!
].filter(Boolean);

