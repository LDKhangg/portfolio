export interface Dict {
  nav: {
    work: string;
    about: string;
    skills: string;
    experience: string;
    contact: string;
    langToggle: string;
  };
  hero: {
    greeting: string;
    name: string;
    tagline: string;
    facts: string[];
    ctaWork: string;
    ctaCv: string;
    console: {
      title: string;
      version: string;
      command: string;
      rows: { label: string; value: string }[];
    };
  };
  about: {
    title: string;
    body: string[];
    facts: { label: string; value: string }[];
    description: string;
  };
  activity: {
    title: string;
    description: string;
    refreshed: string;
    loadingLabel: string;
    progressLabel: string;
    solvedLabel: string;
    easyLabel: string;
    mediumLabel: string;
    hardLabel: string;
    progressNote: string;
    contributionLabel: string;
    contributionNote: string;
    contributionAlt: string;
    contributionAction: string;
    latestLabel: string;
    latestNote: string;
    repositoryLabel: string;
    updatedLabel: string;
    unavailableLabel: string;
    latestAction: string;
    latestListLabel: string;
  };
  projects: {
    title: string;
    description: string;
    openProject: string;
    stackLabel: string;
    items: {
      name: string;
      role: string;
      description: string;
      stack: string[];
      link: string | null;
    }[];
  };
  skills: {
    title: string;
    description: string;
    groups: { label: string; items: string }[];
  };
  experience: {
    title: string;
    description: string;
    items: { org: string; role: string; time: string; note: string }[];
  };
  certs: {
    title: string;
    description: string;
    items: { name: string; detail: string }[];
  };
  contact: {
    title: string;
    blurb: string;
    email: string;
    footer: string;
    description: string;
    statsAlt: string;
    langsAlt: string;
  };
}

export const en: Dict = {
  nav: { work: "Work", about: "About", skills: "Skills", experience: "Experience", contact: "Contact", langToggle: "Switch language" },
  hero: {
    greeting: "Based in Ho Chi Minh City",
    name: "Le Duy Khang",
    tagline: "I like learning by building, staying curious, and leaving every project clearer than I found it.",
    facts: ["Ho Chi Minh City", "WALA-ICT", "Java first, learning Go"],
    ctaWork: "View work",
    ctaCv: "Download CV",
    console: {
      title: "run profile",
      version: "v1.0",
      command: "./khang",
      rows: [
        { label: "name", value: "Le Duy Khang" },
        { label: "location", value: "Ho Chi Minh City" },
        { label: "current", value: "WALA-ICT" },
        { label: "learning", value: "Go now, more languages next" },
        { label: "mode", value: "building and learning" },
      ],
    },
  },
  about: {
    title: "About",
    description: "A short version of what I do, what I care about, and where I am now.",
    body: [
      "I'm a fullstack developer in Ho Chi Minh City, currently building B2B platforms at WALA-ICT and finishing Software Engineering at FPT University.",
      "On the backend I work with Spring Boot, REST APIs, JPA/MyBatis, Redis, RabbitMQ, and microservices. On the frontend I ship React with TypeScript and care about interfaces that stay readable in production.",
      "Outside work, I'm also trying to become a full-keyboard human on CachyOS. The ambition is elegant; the number of times I still reach for the mouse is less elegant.",
    ],
    facts: [
      { label: "Location", value: "Ho Chi Minh City" },
      { label: "Current", value: "WALA-ICT" },
      { label: "Focus", value: "Spring Boot, React, TypeScript" },
      { label: "Now", value: "Java first, learning Go" },
    ],
  },
  activity: {
    title: "Coding activity",
    description: "A quick view of LeetCode progress and the repo that moved most recently.",
    refreshed: "Refreshed from public GitHub data",
    loadingLabel: "Loading",
    progressLabel: "Progress",
    solvedLabel: "Solved",
    easyLabel: "Easy",
    mediumLabel: "Medium",
    hardLabel: "Hard",
    progressNote: "Computed from the real repository structure inside the leetcode repo.",
    contributionLabel: "Contributor board",
    contributionNote: "A last-year contribution view pulled from the public GitHub profile.",
    contributionAlt: "GitHub contribution chart for LDKhangg",
    contributionAction: "View on GitHub",
    latestLabel: "Latest update",
    latestNote: "The three repos that moved most recently, based on the newest public commits.",
    repositoryLabel: "Repository",
    updatedLabel: "Updated",
    unavailableLabel: "Unavailable",
    latestAction: "Open commit",
    latestListLabel: "Recent repos",
  },
  projects: {
    title: "Selected work",
    description: "Three projects, three different kinds of product work: IoT, procurement, and internal admin systems.",
    openProject: "Open project",
    stackLabel: "Stack",
    items: [
      {
        name: "Locker R — Smart Locker IoT Platform",
        role: "Graduation project · Fullstack",
        description:
          "Distributed backend of 11 Spring Boot microservices behind Spring Cloud Gateway. RabbitMQ events, MQTT locker hardware, real-time tracking over WebSocket/STOMP, JWT RBAC, and CI/CD to DigitalOcean.",
        stack: ["Java 21", "Spring Cloud", "RabbitMQ", "MQTT", "PostgreSQL", "Docker"],
        link: "https://github.com/LDKhangg/Locker-EXE-Graduation",
      },
      {
        name: "B2B Construction E-Procurement",
        role: "WALA-ICT · Backend",
        description:
          "Multi-tenant procurement platform — quote requests, bidding, contracts, claims, invoicing. Hexagonal architecture, tenant-scoped RBAC, Redis-backed security layer with distributed rate limiting.",
        stack: ["Java 21", "Spring Boot", "MyBatis", "PostgreSQL", "Redis", "GitLab CI"],
        link: null,
      },
      {
        name: "Fitness Studio Franchise SaaS",
        role: "WALA-ICT · Fullstack",
        description:
          "Nationwide fitness-franchise SaaS — memberships, ticket commerce, coupon campaigns, revenue settlement. Spring Boot services by bounded context plus a React 19 admin.",
        stack: ["Spring Boot 3", "QueryDSL", "MySQL", "Redis", "React 19", "TypeScript"],
        link: null,
      },
    ],
  },
  skills: {
    title: "Stack",
    description: "A compact view of the stack I use most often across backend, frontend, data, cloud delivery, and the Go work I am picking up now.",
    groups: [
      { label: "Backend", items: "Java · Spring Boot · Go · Spring Security · JPA/Hibernate · MyBatis · QueryDSL · REST" },
      { label: "Frontend", items: "React · TypeScript · Zustand · TanStack Query · styled-components · Tailwind" },
      { label: "Data & Messaging", items: "PostgreSQL · MySQL · Redis · RabbitMQ · MQTT · WebSocket/STOMP" },
      { label: "DevOps & Cloud", items: "Docker · GitHub Actions · GitLab CI · AWS (EC2, S3, RDS, IAM)" },
    ],
  },
  experience: {
    title: "Experience",
    description: "A short timeline of paid work and cloud training.",
    items: [
      { org: "WALA-ICT", role: "Fullstack Software Developer", time: "Jun 2025 — Present", note: "Built ERP and multi-tenant business features with React and Java/Spring Boot, worked with BAs and developers in Scrum, integrated APIs, and supported testing and releases." },
      { org: "AWS First Cloud Journey", role: "Cloud Training Program", time: "Sep — Nov 2025", note: "Hands-on AWS labs covering EC2, S3, RDS, and IAM as part of the cloud training program." },
    ],
  },
  certs: {
    title: "Study and certifications",
    description: "Education and recent training that back up the work above.",
    items: [
      { name: "FPT University — Software Engineering", detail: "2022 — 2026" },
      { name: "AWS First Cloud Journey", detail: "Completed hands-on cloud program, 2025" },
      { name: "English — CEFR B2", detail: "EnglishScore, ≈785 TOEIC" },
    ],
  },
  contact: {
    title: "Contact",
    blurb: "If you want to talk backend, frontend, or product work, email me.",
    email: "contact.ldkhang@gmail.com",
    footer: "Built with React · Deployed on GitHub Pages",
    description: "The fastest way to reach me is email.",
    statsAlt: "GitHub stats",
    langsAlt: "Top languages",
  },
};
