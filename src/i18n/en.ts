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
    ctaWork: string;
    ctaCv: string;
  };
  about: {
    title: string;
    body: string[];
  };
  projects: {
    title: string;
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
    groups: { label: string; items: string }[];
  };
  experience: {
    title: string;
    items: { org: string; role: string; time: string; note: string }[];
  };
  certs: {
    title: string;
    items: { name: string; detail: string }[];
  };
  contact: {
    title: string;
    blurb: string;
    email: string;
    footer: string;
  };
}

export const en: Dict = {
  nav: { work: "Work", about: "About", skills: "Skills", experience: "Experience", contact: "Contact", langToggle: "Switch language" },
  hero: {
    greeting: "Hi, I'm",
    name: "Le Duy Khang",
    tagline: "Fullstack developer — Java Spring Boot & React. I build production systems end to end.",
    ctaWork: "View work ↓",
    ctaCv: "Download CV",
  },
  about: {
    title: "About",
    body: [
      "I'm a fullstack developer in Ho Chi Minh City, currently building B2B platforms at WALA-ICT and finishing Software Engineering at FPT University.",
      "On the backend I live in Spring Boot — REST APIs, JPA/MyBatis, Redis, RabbitMQ, microservices. On the frontend I ship React with TypeScript. I care about systems that survive production, not just demos.",
    ],
  },
  projects: {
    title: "Selected Work",
    items: [
      {
        name: "Locker R — Smart Locker IoT Platform",
        role: "Graduation project · Fullstack",
        description:
          "Distributed backend of 11 Spring Boot microservices behind Spring Cloud Gateway — RabbitMQ events, MQTT locker hardware, real-time tracking over WebSocket/STOMP, JWT RBAC. CI/CD to DigitalOcean.",
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
    title: "Skills",
    groups: [
      { label: "Backend", items: "Java · Spring Boot · Spring Security · JPA/Hibernate · MyBatis · QueryDSL · REST" },
      { label: "Frontend", items: "React · TypeScript · Zustand · TanStack Query · styled-components · Tailwind" },
      { label: "Data & Messaging", items: "PostgreSQL · MySQL · Redis · RabbitMQ · MQTT · WebSocket/STOMP" },
      { label: "DevOps & Cloud", items: "Docker · GitHub Actions · GitLab CI · AWS (EC2, S3, RDS, IAM)" },
    ],
  },
  experience: {
    title: "Experience",
    items: [
      { org: "WALA-ICT", role: "Software Developer", time: "Dec 2025 — Present", note: "Fullstack features for production B2B systems — Spring Boot APIs and React/TypeScript admin interfaces, Agile/Scrum." },
      { org: "AWS First Cloud Journey", role: "Cloud Training Program", time: "Sep — Nov 2025", note: "Hands-on AWS labs; built and deployed an EV-rental booking platform on EC2, S3, RDS, IAM." },
    ],
  },
  certs: {
    title: "Certifications & Education",
    items: [
      { name: "FPT University — Software Engineering", detail: "2022 — 2026" },
      { name: "AWS First Cloud Journey", detail: "Completed hands-on cloud program, 2025" },
      { name: "English — CEFR B2", detail: "EnglishScore, ≈785 TOEIC" },
    ],
  },
  contact: {
    title: "Contact",
    blurb: "Open to fullstack / backend opportunities. Let's talk.",
    email: "contact.ldkhang@gmail.com",
    footer: "Built with React · Deployed on AWS S3",
  },
};
