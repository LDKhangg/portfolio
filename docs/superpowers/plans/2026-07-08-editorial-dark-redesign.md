# Portfolio Editorial-Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio UI as an editorial dark one-pager (spec A3 slate) on Vite, bilingual EN/VN, keeping the DarkVeil/DecryptedText/BlurText effects.

**Architecture:** Migrate CRA→Vite first (Task 1) so all restyle work happens on the final toolchain. Then lay foundations (theme tokens + layout primitives, i18n context), then rebuild sections top-to-bottom importing only the foundations. DarkVeil is recolored via its existing `hueShift` prop, not modified internally.

**Tech Stack:** Vite 6, React 19, TypeScript, styled-components 6, @fontsource (Fraunces/Inter/JetBrains Mono), vitest + @testing-library/react (i18n test only), ogl (existing DarkVeil).

## Global Constraints (from spec)

- Colors: bg gradient `#0F1216 → #12161C`; text silver `#E2E8F0`; body `#94A3B8`; single accent `#7DD3FC`. No second accent.
- Type: Fraunces (display serif), Inter (body), JetBrains Mono (labels/tags).
- Layout: container max-width 1100px; ~120px section rhythm; section headings = mono index (`01 —`) + serif title.
- `prefers-reduced-motion` must disable DarkVeil and animations.
- Bilingual EN/VN via context + localStorage; **no i18n library**.
- Keep existing S3 deploy workflow functional (build dir becomes `dist/`).
- Repo: `/home/kane/Dev/portfolio`, branch `redesign/editorial-dark`. Commits: `-c user.name="Le Duy Khang" -c user.email="contact.ldkhang@gmail.com"`.

---

### Task 1: CRA → Vite migration

**Files:**
- Create: `index.html` (repo root), `vite.config.ts`, `src/vite-env.d.ts`
- Modify: `package.json`, `tsconfig.json`, `.github/workflows/deploy.yml`
- Delete: `public/index.html`, `src/reportWebVitals.ts`, `src/setupTests.ts`, `src/react-app-env.d.ts`, `src/App.test.tsx` (if present)

**Interfaces:**
- Produces: working `npm run dev` / `npm run build` (output `dist/`), alias `@` → `src`. Later tasks assume `npm run dev` works and hot-reloads.

- [ ] **Step 1: Swap dependencies**

```bash
cd /home/kane/Dev/portfolio
npm uninstall react-scripts web-vitals @types/jest @types/styled-components @fontsource/roboto
npm install -D vite @vitejs/plugin-react vitest jsdom
npm install @fontsource-variable/fraunces @fontsource-variable/inter @fontsource/jetbrains-mono
```

- [ ] **Step 2: Create `vite.config.ts`**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    environment: "jsdom",
    globals: true,
  },
} as never);
```

(The `as never` silences the `test` key not being in Vite's type — vitest reads it. Alternative accepted: `/// <reference types="vitest" />` + typed config.)

- [ ] **Step 3: Create root `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0F1216" />
    <meta name="description" content="Le Duy Khang — Fullstack Developer (Java Spring Boot · React). Portfolio." />
    <title>Le Duy Khang — Fullstack Developer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Update `package.json` scripts** (replace the whole `scripts` block; delete `eslintConfig` and `browserslist` blocks)

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run"
}
```

- [ ] **Step 5: Update `tsconfig.json`** — replace `compilerOptions` with:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "types": ["vite/client", "vitest/globals"]
  },
  "include": ["src"]
}
```

If `moduleResolution: "bundler"` errors under TS 4.9, run `npm install -D typescript@^5` first (Vite requires TS ≥5 for bundler resolution; this bump is in-scope).

- [ ] **Step 6: Delete CRA leftovers**

```bash
cd /home/kane/Dev/portfolio
rm -f public/index.html src/reportWebVitals.ts src/setupTests.ts src/react-app-env.d.ts src/App.test.tsx
```

Create `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

Then edit `src/index.tsx`: remove the `reportWebVitals` import and call if present; file should end at `root.render(...)`.

- [ ] **Step 7: Verify dev server boots**

Run: `cd /home/kane/Dev/portfolio && timeout 30 npx vite --port 5199 & sleep 6 && curl -s http://localhost:5199 | grep -o "<title>[^<]*" && kill %1`
Expected: `<title>Le Duy Khang — Fullstack Developer`

- [ ] **Step 8: Verify production build**

Run: `cd /home/kane/Dev/portfolio && npm run build && ls dist/index.html`
Expected: build completes, `dist/index.html` exists. (Old site may have TS errors surfacing under stricter Vite—fix any import errors minimally; components being replaced later only need to compile.)

- [ ] **Step 9: Update deploy workflow** — in `.github/workflows/deploy.yml`, replace every occurrence of the CRA output dir `build` with `dist` (the `aws s3 sync` step path). Verify: `grep -n "dist" .github/workflows/deploy.yml` shows the sync line; `grep -n "build/" .github/workflows/deploy.yml` shows none.

- [ ] **Step 10: Commit**

```bash
cd /home/kane/Dev/portfolio && git add -A && git -c user.name="Le Duy Khang" -c user.email="contact.ldkhang@gmail.com" commit -m "chore: migrate CRA to Vite (build dir dist/, vitest for tests)"
```

---

### Task 2: Theme tokens, GlobalStyle, layout primitives

**Files:**
- Create: `src/theme.ts`, `src/components/layout.tsx`
- Modify: `src/GlobalStyle.ts`, `src/index.tsx`

**Interfaces:**
- Produces: `theme` object (`theme.colors.bg0|bg1|text|body|accent|line`, `theme.fonts.serif|sans|mono`), styled-components `ThemeProvider` wired in `src/index.tsx`; layout exports `Container`, `Section`, `SectionHeading` (props `{ index: string; title: string }`).
- Later tasks import: `import { Container, Section, SectionHeading } from "@/components/layout";` and use `${({ theme }) => theme.colors.accent}`.

- [ ] **Step 1: Write `src/theme.ts`**

```ts
export const theme = {
  colors: {
    bg0: "#0F1216",
    bg1: "#12161C",
    text: "#E2E8F0",   // silver — headings
    body: "#94A3B8",   // slate — body copy
    accent: "#7DD3FC", // ice blue — ONLY accent
    line: "rgba(148,163,184,0.15)",
    card: "rgba(148,163,184,0.06)",
  },
  fonts: {
    serif: "'Fraunces Variable', Georgia, serif",
    sans: "'Inter Variable', -apple-system, sans-serif",
    mono: "'JetBrains Mono', Consolas, monospace",
  },
  maxWidth: "1100px",
  sectionGap: "clamp(80px, 12vw, 120px)",
} as const;

export type AppTheme = typeof theme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
```

- [ ] **Step 2: Rewrite `src/GlobalStyle.ts`**

```ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }

  body {
    background: linear-gradient(180deg, ${({ theme }) => theme.colors.bg0} 0%, ${({ theme }) => theme.colors.bg1} 100%);
    background-attachment: fixed;
    color: ${({ theme }) => theme.colors.body};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 { font-family: ${({ theme }) => theme.fonts.serif}; color: ${({ theme }) => theme.colors.text}; font-weight: 600; line-height: 1.15; }
  a { color: ${({ theme }) => theme.colors.accent}; text-decoration: none; }
  a:hover { text-decoration: underline; text-underline-offset: 4px; }
  ::selection { background: ${({ theme }) => theme.colors.accent}; color: ${({ theme }) => theme.colors.bg0}; }
`;

export default GlobalStyle;
```

- [ ] **Step 3: Create `src/components/layout.tsx`**

```tsx
import styled from "styled-components";

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 24px;
`;

export const Section = styled.section`
  padding-top: ${({ theme }) => theme.sectionGap};
  &:last-of-type { padding-bottom: ${({ theme }) => theme.sectionGap}; }
`;

const HeadingWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  padding-bottom: 16px;
`;

const Index = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.1em;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
`;

export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <HeadingWrap>
      <Index>{index} —</Index>
      <Title>{title}</Title>
    </HeadingWrap>
  );
}
```

- [ ] **Step 4: Wire fonts + ThemeProvider in `src/index.tsx`** (full file)

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/600.css";
import App from "./App";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

Note: if `src/index.tsx` currently imports `./index.css` or `@fontsource/roboto`, delete those imports (roboto was uninstalled in Task 1).

- [ ] **Step 5: Verify build**

Run: `cd /home/kane/Dev/portfolio && npm run build`
Expected: success. Old sections still render with old styles — fine, they are replaced in Tasks 4–7.

- [ ] **Step 6: Commit**

```bash
cd /home/kane/Dev/portfolio && git add -A && git -c user.name="Le Duy Khang" -c user.email="contact.ldkhang@gmail.com" commit -m "feat: A3 slate theme tokens, global style, layout primitives"
```

---

### Task 3: i18n — LanguageContext + dictionaries (TDD)

**Files:**
- Create: `src/i18n/LanguageContext.tsx`, `src/i18n/en.ts`, `src/i18n/vi.ts`, `src/i18n/index.ts`
- Test: `src/i18n/LanguageContext.test.tsx`

**Interfaces:**
- Produces: `LanguageProvider` (wrap App), hook `useLang()` returning `{ lang: "en" | "vi", toggle: () => void, t: Dict }` where `Dict` is the dictionary object type. Persists to `localStorage["ldk-lang"]`.
- All section tasks consume `const { t } = useLang();` and read e.g. `t.hero.tagline`, `t.projects.items[0].description`.

- [ ] **Step 1: Write the failing test** — `src/i18n/LanguageContext.test.tsx`

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLang } from "./LanguageContext";

function Probe() {
  const { lang, toggle, t } = useLang();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="tagline">{t.hero.tagline}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

const renderProbe = () =>
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );

beforeEach(() => localStorage.clear());

test("defaults to en and exposes dictionary", () => {
  renderProbe();
  expect(screen.getByTestId("lang").textContent).toBe("en");
  expect(screen.getByTestId("tagline").textContent).toMatch(/Fullstack/);
});

test("toggle switches to vi and persists", () => {
  renderProbe();
  fireEvent.click(screen.getByText("toggle"));
  expect(screen.getByTestId("lang").textContent).toBe("vi");
  expect(localStorage.getItem("ldk-lang")).toBe("vi");
});

test("restores persisted language", () => {
  localStorage.setItem("ldk-lang", "vi");
  renderProbe();
  expect(screen.getByTestId("lang").textContent).toBe("vi");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd /home/kane/Dev/portfolio && npx vitest run src/i18n`
Expected: FAIL — cannot resolve `./LanguageContext`.

- [ ] **Step 3: Write `src/i18n/en.ts`** (source-of-truth dictionary; full content)

```ts
export const en = {
  nav: { work: "Work", about: "About", skills: "Skills", experience: "Experience", contact: "Contact" },
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
} as const;

export type Dict = typeof en;
```

- [ ] **Step 4: Write `src/i18n/vi.ts`** (same shape, typed `Dict`)

```ts
import type { Dict } from "./en";

export const vi: Dict = {
  nav: { work: "Dự án", about: "Giới thiệu", skills: "Kỹ năng", experience: "Kinh nghiệm", contact: "Liên hệ" },
  hero: {
    greeting: "Xin chào, tôi là",
    name: "Lê Duy Khang",
    tagline: "Fullstack developer — Java Spring Boot & React. Xây dựng hệ thống production từ đầu đến cuối.",
    ctaWork: "Xem dự án ↓",
    ctaCv: "Tải CV",
  },
  about: {
    title: "Giới thiệu",
    body: [
      "Tôi là fullstack developer tại TP.HCM, đang xây dựng nền tảng B2B ở WALA-ICT và hoàn thành ngành Kỹ thuật phần mềm tại Đại học FPT.",
      "Backend là thế mạnh của tôi — Spring Boot, REST API, JPA/MyBatis, Redis, RabbitMQ, microservices. Frontend tôi làm React + TypeScript. Tôi quan tâm đến hệ thống sống được ở production, không chỉ demo.",
    ],
  },
  projects: {
    title: "Dự án nổi bật",
    items: [
      {
        name: "Locker R — Nền tảng tủ khóa thông minh IoT",
        role: "Đồ án tốt nghiệp · Fullstack",
        description:
          "Backend phân tán 11 microservices Spring Boot sau Spring Cloud Gateway — event RabbitMQ, phần cứng tủ qua MQTT, theo dõi real-time bằng WebSocket/STOMP, RBAC bằng JWT. CI/CD lên DigitalOcean.",
        stack: ["Java 21", "Spring Cloud", "RabbitMQ", "MQTT", "PostgreSQL", "Docker"],
        link: "https://github.com/LDKhangg/Locker-EXE-Graduation",
      },
      {
        name: "Sàn mua sắm B2B ngành xây dựng",
        role: "WALA-ICT · Backend",
        description:
          "Nền tảng e-procurement đa tenant — yêu cầu báo giá, đấu thầu, hợp đồng, khiếu nại, hóa đơn. Kiến trúc Hexagonal, RBAC theo tenant, tầng bảo mật dùng Redis kèm rate limiting phân tán.",
        stack: ["Java 21", "Spring Boot", "MyBatis", "PostgreSQL", "Redis", "GitLab CI"],
        link: null,
      },
      {
        name: "SaaS quản lý chuỗi phòng tập",
        role: "WALA-ICT · Fullstack",
        description:
          "SaaS cho chuỗi phòng tập toàn quốc — hội viên, bán vé, chiến dịch coupon, quyết toán doanh thu. Các service Spring Boot chia theo bounded context cùng trang quản trị React 19.",
        stack: ["Spring Boot 3", "QueryDSL", "MySQL", "Redis", "React 19", "TypeScript"],
        link: null,
      },
    ],
  },
  skills: {
    title: "Kỹ năng",
    groups: [
      { label: "Backend", items: "Java · Spring Boot · Spring Security · JPA/Hibernate · MyBatis · QueryDSL · REST" },
      { label: "Frontend", items: "React · TypeScript · Zustand · TanStack Query · styled-components · Tailwind" },
      { label: "Data & Messaging", items: "PostgreSQL · MySQL · Redis · RabbitMQ · MQTT · WebSocket/STOMP" },
      { label: "DevOps & Cloud", items: "Docker · GitHub Actions · GitLab CI · AWS (EC2, S3, RDS, IAM)" },
    ],
  },
  experience: {
    title: "Kinh nghiệm",
    items: [
      { org: "WALA-ICT", role: "Software Developer", time: "12/2025 — nay", note: "Phát triển fullstack cho hệ thống B2B production — API Spring Boot và giao diện quản trị React/TypeScript, quy trình Agile/Scrum." },
      { org: "AWS First Cloud Journey", role: "Chương trình đào tạo Cloud", time: "9 — 11/2025", note: "Thực hành AWS; xây dựng và triển khai nền tảng đặt thuê xe điện trên EC2, S3, RDS, IAM." },
    ],
  },
  certs: {
    title: "Chứng chỉ & Học vấn",
    items: [
      { name: "Đại học FPT — Kỹ thuật phần mềm", detail: "2022 — 2026" },
      { name: "AWS First Cloud Journey", detail: "Hoàn thành chương trình thực hành cloud, 2025" },
      { name: "Tiếng Anh — CEFR B2", detail: "EnglishScore, ≈785 TOEIC" },
    ],
  },
  contact: {
    title: "Liên hệ",
    blurb: "Sẵn sàng cho cơ hội fullstack / backend. Liên hệ nhé.",
    email: "contact.ldkhang@gmail.com",
    footer: "Xây bằng React · Deploy trên AWS S3",
  },
};
```

- [ ] **Step 5: Write `src/i18n/LanguageContext.tsx`**

```tsx
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { en, type Dict } from "./en";
import { vi } from "./vi";

type Lang = "en" | "vi";
const STORAGE_KEY = "ldk-lang";

interface LangValue { lang: Lang; toggle: () => void; t: Dict; }

const LanguageContext = createContext<LangValue | null>(null);

function initialLang(): Lang {
  const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
  return stored === "vi" ? "vi" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "en" ? "vi" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);
  const value = useMemo<LangValue>(() => ({ lang, toggle, t: lang === "en" ? en : vi }), [lang, toggle]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LangValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
```

Create `src/i18n/index.ts`:

```ts
export { LanguageProvider, useLang } from "./LanguageContext";
export type { Dict } from "./en";
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd /home/kane/Dev/portfolio && npx vitest run src/i18n`
Expected: 3 passed.

- [ ] **Step 7: Wrap App with provider** — in `src/index.tsx`, wrap inside ThemeProvider:

```tsx
import { LanguageProvider } from "./i18n";
// ...
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
```

- [ ] **Step 8: Commit**

```bash
cd /home/kane/Dev/portfolio && git add -A && git -c user.name="Le Duy Khang" -c user.email="contact.ldkhang@gmail.com" commit -m "feat: bilingual EN/VN dictionaries + LanguageContext with tests"
```

---

### Task 4: Navbar + Hero (+ DarkVeil slate recolor, reduced-motion)

**Files:**
- Create: `src/hooks/useReducedMotion.ts`
- Rewrite: `src/components/Navbar.tsx`, `src/sections/HeroSection.tsx`, `src/App.tsx`

**Interfaces:**
- Consumes: `useLang`, layout primitives, theme, existing `DarkVeil` (props: `hueShift`, `noiseIntensity`, `scanlineIntensity`, `warpAmount`, `speed`, `className`) and `DecryptedText` (keep the props the old HeroSection already passes it — check its current call signature before rewriting and reuse it).
- Produces: `useReducedMotion(): boolean`; App renders sections with anchor ids `work`, `about`, `skills`, `experience`, `contact`.

- [ ] **Step 1: Create `src/hooks/useReducedMotion.ts`**

```ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
```

- [ ] **Step 2: Rewrite `src/components/Navbar.tsx`**

```tsx
import styled from "styled-components";
import { useLang } from "@/i18n";

const Bar = styled.header`
  position: fixed; inset: 0 0 auto 0; z-index: 10;
  backdrop-filter: blur(10px);
  background: rgba(15, 18, 22, 0.7);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

const Inner = styled.nav`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto; padding: 14px 24px;
  display: flex; align-items: center; justify-content: space-between;
`;

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 600; letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.text};
  &:hover { text-decoration: none; color: ${({ theme }) => theme.colors.accent}; }
`;

const Links = styled.div`
  display: flex; gap: 24px; align-items: center;
  font-size: 0.85rem;
  a { color: ${({ theme }) => theme.colors.body}; }
  a:hover { color: ${({ theme }) => theme.colors.accent}; text-decoration: none; }
  @media (max-width: 640px) { gap: 14px; a.hide-sm { display: none; } }
`;

const LangBtn = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem; padding: 4px 10px; cursor: pointer;
  color: ${({ theme }) => theme.colors.accent};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 3px;
  &:hover { background: rgba(125, 211, 252, 0.1); }
`;

export function Navbar() {
  const { lang, toggle, t } = useLang();
  return (
    <Bar>
      <Inner>
        <Logo href="#top">LDK</Logo>
        <Links>
          <a href="#work">{t.nav.work}</a>
          <a href="#about" className="hide-sm">{t.nav.about}</a>
          <a href="#skills" className="hide-sm">{t.nav.skills}</a>
          <a href="#experience" className="hide-sm">{t.nav.experience}</a>
          <a href="#contact">{t.nav.contact}</a>
          <LangBtn onClick={toggle} aria-label="Switch language">
            {lang === "en" ? "VN" : "EN"}
          </LangBtn>
        </Links>
      </Inner>
    </Bar>
  );
}
```

- [ ] **Step 3: Rewrite `src/sections/HeroSection.tsx`**

First run `grep -n "DecryptedText" src/sections/HeroSection.tsx src/components/DecryptedText.tsx | head` to confirm the component's prop names (expect `text` plus animation options). Then:

```tsx
import styled from "styled-components";
import { Container } from "@/components/layout";
import { useLang } from "@/i18n";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import DecryptedText from "@/components/DecryptedText"; // adjust to named import if the file exports named

const Wrap = styled.section`
  min-height: 92vh;
  display: flex; align-items: center;
  padding-top: 60px;
`;

const Greeting = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem; letter-spacing: 0.1em; margin-bottom: 16px;
`;

const Name = styled.h1`
  font-size: clamp(3rem, 9vw, 5.5rem);
  letter-spacing: -0.02em;
  margin-bottom: 24px;
`;

const Tagline = styled.p`
  max-width: 560px; font-size: 1.05rem; margin-bottom: 40px;
`;

const Ctas = styled.div`
  display: flex; gap: 16px; flex-wrap: wrap;
  a { font-family: ${({ theme }) => theme.fonts.mono}; font-size: 0.85rem; padding: 12px 22px; border-radius: 3px; }
  a:hover { text-decoration: none; }
`;

const Primary = styled.a`
  color: ${({ theme }) => theme.colors.bg0} !important;
  background: ${({ theme }) => theme.colors.accent};
  &:hover { filter: brightness(1.1); }
`;

const Ghost = styled.a`
  color: ${({ theme }) => theme.colors.text} !important;
  border: 1px solid ${({ theme }) => theme.colors.line};
  &:hover { border-color: ${({ theme }) => theme.colors.accent}; }
`;

export function HeroSection() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  return (
    <Wrap id="top">
      <Container>
        <Greeting>{t.hero.greeting}</Greeting>
        <Name>
          {reduced ? t.hero.name : <DecryptedText text={t.hero.name} animateOn="view" speed={60} />}
        </Name>
        <Tagline>{t.hero.tagline}</Tagline>
        <Ctas>
          <Primary href="#work">{t.hero.ctaWork}</Primary>
          <Ghost href="/cv/LeDuyKhang_Fullstack.pdf" target="_blank" rel="noreferrer">{t.hero.ctaCv}</Ghost>
        </Ctas>
      </Container>
    </Wrap>
  );
}
```

(If `DecryptedText` has different prop names, keep the call the old HeroSection used, passing `t.hero.name` as the text. The CV pdf path is a placeholder file the user can drop into `public/cv/` — leave the link in.)

- [ ] **Step 4: Rewrite `src/App.tsx`** — assemble with recolored DarkVeil (sections not yet rebuilt stay imported as-is until their task replaces them; comment placeholders are FORBIDDEN — keep old imports rendering):

```tsx
import GlobalStyle from "./GlobalStyle";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./sections/HeroSection";
import DarkVeil from "./components/DarkVeil";
import { AboutMe } from "./sections/AboutMe";
import { SkillsTech } from "./sections/SkillsTech";
import { Experience } from "./sections/Experience";
import { Project } from "./sections/Project";
import { CourseworkCertifications } from "./sections/CourseworkCertifications";
import { ContactFooter } from "./sections/ContactFooter";
import { useReducedMotion } from "./hooks/useReducedMotion";

function App() {
  const reduced = useReducedMotion();
  return (
    <>
      <GlobalStyle />
      {!reduced && (
        <DarkVeil
          className="veil"
          hueShift={210}
          noiseIntensity={0.03}
          scanlineIntensity={0}
          warpAmount={0.08}
          speed={0.25}
        />
      )}
      <Navbar />
      <main>
        <HeroSection />
        <Project />
        <AboutMe />
        <SkillsTech />
        <Experience />
        <CourseworkCertifications />
        <ContactFooter />
      </main>
    </>
  );
}

export default App;
```

Notes: `ContactFooter` does not exist until Task 7 — for THIS task create a minimal placeholder file `src/sections/ContactFooter.tsx`:

```tsx
export function ContactFooter() {
  return null;
}
```

Also add to `src/GlobalStyle.ts` body rules (DarkVeil canvas fixed behind content):

```css
  .veil { position: fixed; inset: 0; z-index: -1; opacity: 0.5; }
```

And verify DarkVeil renders a canvas that fills its container — check its wrapper element accepts `className` (it does, prop exists).

- [ ] **Step 5: Visual verify hue 210**

Run: `cd /home/kane/Dev/portfolio && npm run dev` then screenshot `http://localhost:5173` (browser tool or manual). Expected: background waves in blue/slate tones, NOT purple/magenta. If still warm-toned, try `hueShift` 180–240 range; pick the value closest to `#12161C→#7DD3FC` family, note chosen value in commit message.

- [ ] **Step 6: Commit**

```bash
cd /home/kane/Dev/portfolio && git add -A && git -c user.name="Le Duy Khang" -c user.email="contact.ldkhang@gmail.com" commit -m "feat: editorial navbar + hero, DarkVeil recolored to slate (hueShift=210)"
```

---

### Task 5: About, Skills, Experience, Certifications sections

**Files:**
- Rewrite: `src/sections/AboutMe.tsx`, `src/sections/SkillsTech.tsx`, `src/sections/Experience.tsx`, `src/sections/CourseworkCertifications.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `useLang`.
- Produces: components exported with the SAME names App already imports: `AboutMe`, `SkillsTech`, `Experience`, `CourseworkCertifications`. Section ids: `about`, `skills`, `experience` (certs has no nav id).

- [ ] **Step 1: Rewrite `src/sections/AboutMe.tsx`**

```tsx
import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Body = styled.div`
  max-width: 680px;
  display: grid; gap: 20px;
  font-size: 1.02rem;
`;

export function AboutMe() {
  const { t } = useLang();
  return (
    <Section id="about">
      <Container>
        <SectionHeading index="02" title={t.about.title} />
        <Body>
          {t.about.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Body>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Rewrite `src/sections/SkillsTech.tsx`**

```tsx
import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1px; background: ${({ theme }) => theme.colors.line};
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

const Cell = styled.div`
  background: ${({ theme }) => theme.colors.bg1};
  padding: 28px 24px;
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 12px;
`;

const Items = styled.p`
  font-size: 0.92rem; line-height: 1.9;
`;

export function SkillsTech() {
  const { t } = useLang();
  return (
    <Section id="skills">
      <Container>
        <SectionHeading index="03" title={t.skills.title} />
        <Grid>
          {t.skills.groups.map((g) => (
            <Cell key={g.label}>
              <Label>{g.label}</Label>
              <Items>{g.items}</Items>
            </Cell>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Rewrite `src/sections/Experience.tsx`**

```tsx
import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const List = styled.div`
  display: grid; gap: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.line};
`;

const Item = styled.div`
  position: relative; padding: 0 0 40px 32px;
  &::before {
    content: ""; position: absolute; left: -5px; top: 8px;
    width: 9px; height: 9px; border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
  &:last-child { padding-bottom: 8px; }
`;

const Org = styled.h3` font-size: 1.25rem; display: inline; `;
const Role = styled.span` color: ${({ theme }) => theme.colors.body}; font-size: 0.95rem; margin-left: 10px; `;
const Time = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem; color: ${({ theme }) => theme.colors.accent};
  margin: 6px 0 8px;
`;
const Note = styled.p` max-width: 640px; font-size: 0.95rem; `;

export function Experience() {
  const { t } = useLang();
  return (
    <Section id="experience">
      <Container>
        <SectionHeading index="04" title={t.experience.title} />
        <List>
          {t.experience.items.map((e) => (
            <Item key={e.org}>
              <Org>{e.org}</Org>
              <Role>{e.role}</Role>
              <Time>{e.time}</Time>
              <Note>{e.note}</Note>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Rewrite `src/sections/CourseworkCertifications.tsx`**

```tsx
import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Row = styled.div`
  display: flex; justify-content: space-between; gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  &:first-of-type { border-top: 1px solid ${({ theme }) => theme.colors.line}; }
`;

const Name = styled.span` color: ${({ theme }) => theme.colors.text}; `;
const Detail = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem; color: ${({ theme }) => theme.colors.body};
  white-space: nowrap;
`;

export function CourseworkCertifications() {
  const { t } = useLang();
  return (
    <Section>
      <Container>
        <SectionHeading index="05" title={t.certs.title} />
        {t.certs.items.map((c) => (
          <Row key={c.name}>
            <Name>{c.name}</Name>
            <Detail>{c.detail}</Detail>
          </Row>
        ))}
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: Verify build + dev render**

Run: `cd /home/kane/Dev/portfolio && npm run build`
Expected: success, no TS errors. Dev-server spot check: all four sections render in both EN and VN (click navbar toggle).

- [ ] **Step 6: Commit**

```bash
cd /home/kane/Dev/portfolio && git add -A && git -c user.name="Le Duy Khang" -c user.email="contact.ldkhang@gmail.com" commit -m "feat: about, skills, experience, certifications sections (editorial)"
```

---

### Task 6: Selected Projects section (the heart)

**Files:**
- Rewrite: `src/sections/Project.tsx`

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `useLang`, `BlurText` component (check its props with `grep -n "interface\|Props" src/components/BlurText.tsx` — if it complicates, plain `<h3>` is acceptable; BlurText is a nice-to-have here).
- Produces: `Project` component (name App imports), section id `work`, index `01`.

- [ ] **Step 1: Rewrite `src/sections/Project.tsx`**

```tsx
import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Rows = styled.div` display: grid; `;

const Row = styled.a`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 24px;
  padding: 40px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  color: inherit;
  transition: background 0.25s ease;
  &:first-of-type { border-top: 1px solid ${({ theme }) => theme.colors.line}; }
  &:hover { text-decoration: none; background: ${({ theme }) => theme.colors.card}; }
  &:hover h3 { color: ${({ theme }) => theme.colors.accent}; }
  @media (max-width: 640px) { grid-template-columns: 1fr; gap: 8px; }
`;

const Num = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem; color: ${({ theme }) => theme.colors.accent};
  padding-top: 6px;
`;

const Name = styled.h3`
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  transition: color 0.25s ease;
`;

const Role = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
  margin: 6px 0 12px;
`;

const Desc = styled.p` max-width: 720px; font-size: 0.97rem; margin-bottom: 16px; `;

const Tags = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  span {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.72rem; padding: 3px 10px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 999px;
    color: ${({ theme }) => theme.colors.body};
  }
`;

export function Project() {
  const { t } = useLang();
  return (
    <Section id="work">
      <Container>
        <SectionHeading index="01" title={t.projects.title} />
        <Rows>
          {t.projects.items.map((p, i) => (
            <Row
              key={p.name}
              href={p.link ?? undefined}
              target={p.link ? "_blank" : undefined}
              rel={p.link ? "noreferrer" : undefined}
              as={p.link ? "a" : "div"}
            >
              <Num>{String(i + 1).padStart(2, "0")}</Num>
              <div>
                <Name>{p.name} {p.link ? "↗" : ""}</Name>
                <Role>{p.role}</Role>
                <Desc>{p.description}</Desc>
                <Tags>
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </Tags>
              </div>
            </Row>
          ))}
        </Rows>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Verify build + visual**

Run: `cd /home/kane/Dev/portfolio && npm run build` → success. Dev check: three rows `01/02/03`, hover lifts background and tints title accent, first row links to GitHub, rows 2–3 render as `div` (no cursor pointer / no dead link).

- [ ] **Step 3: Commit**

```bash
cd /home/kane/Dev/portfolio && git add -A && git -c user.name="Le Duy Khang" -c user.email="contact.ldkhang@gmail.com" commit -m "feat: selected projects section — editorial rows for 3 CV projects"
```

---

### Task 7: Contact/Footer + GitHub block + cleanup dead components

**Files:**
- Rewrite: `src/sections/ContactFooter.tsx` (replace Task 4 placeholder)
- Delete: `src/components/BentoCard.tsx`, `src/components/GradientCard.tsx`, `src/components/PremiumCard.tsx`, `src/components/SkillCard.tsx`, `src/components/cssCard.tsx`, `src/components/Loader.tsx`, `src/components/SocialButton.tsx`, `src/components/SocialButtonGroup.tsx`, `src/components/button.tsx` — ONLY after `grep -rn "<name>" src/` shows no remaining imports of each.

**Interfaces:**
- Consumes: `Container`, `Section`, `SectionHeading`, `useLang`.
- Produces: `ContactFooter` (already imported by App in Task 4), section id `contact`, index `06`. GitHub stats via `github-readme-stats` themed images (user `LDKhangg`).

- [ ] **Step 1: Rewrite `src/sections/ContactFooter.tsx`**

```tsx
import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Blurb = styled.p` max-width: 560px; font-size: 1.05rem; margin-bottom: 24px; `;

const Email = styled.a`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  color: ${({ theme }) => theme.colors.text};
  &:hover { color: ${({ theme }) => theme.colors.accent}; text-decoration: none; }
`;

const Stats = styled.div`
  display: flex; gap: 16px; flex-wrap: wrap; margin: 48px 0;
  img { max-width: 100%; border: 1px solid ${({ theme }) => theme.colors.line}; border-radius: 6px; }
`;

const Foot = styled.footer`
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  padding: 32px 0 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
`;

const STATS =
  "https://github-readme-stats.vercel.app/api?username=LDKhangg&show_icons=true&hide_border=true&bg_color=12161C&text_color=94A3B8&title_color=E2E8F0&icon_color=7DD3FC";
const LANGS =
  "https://github-readme-stats.vercel.app/api/top-langs/?username=LDKhangg&layout=compact&hide_border=true&bg_color=12161C&text_color=94A3B8&title_color=E2E8F0";

export function ContactFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <Section id="contact">
      <Container>
        <SectionHeading index="06" title={t.contact.title} />
        <Blurb>{t.contact.blurb}</Blurb>
        <Email href={`mailto:${t.contact.email}`}>{t.contact.email}</Email>
        <Stats>
          <img src={STATS} alt="GitHub stats" loading="lazy" height={165} />
          <img src={LANGS} alt="Top languages" loading="lazy" height={165} />
        </Stats>
        <Foot>
          <span>© {year} Le Duy Khang</span>
          <span>
            <a href="https://github.com/LDKhangg" target="_blank" rel="noreferrer">GitHub</a>
            {" · "}
            <a href="https://www.linkedin.com/in/kane06092004/" target="_blank" rel="noreferrer">LinkedIn</a>
          </span>
          <span>{t.contact.footer}</span>
        </Foot>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Delete dead components** — for each file listed above run `grep -rn "ComponentName" src/ --include="*.tsx" --include="*.ts"`; delete only files with zero imports remaining. Keep `DarkVeil.tsx`, `DecryptedText.tsx`, `BlurText.tsx`, `Navbar.tsx`, `layout.tsx`. Also delete `src/lib/utils.ts` IF nothing imports `cn` anymore (DarkVeil imports it — if so, keep it or inline the join).

- [ ] **Step 3: Verify build & tests**

Run: `cd /home/kane/Dev/portfolio && npm run build && npm test`
Expected: build success; 3 i18n tests pass.

- [ ] **Step 4: Commit**

```bash
cd /home/kane/Dev/portfolio && git add -A && git -c user.name="Le Duy Khang" -c user.email="contact.ldkhang@gmail.com" commit -m "feat: contact/footer with themed GitHub stats; remove dead components"
```

---

### Task 8: Final verification & push

**Files:** none new.

- [ ] **Step 1: Full check** — `cd /home/kane/Dev/portfolio && npm test && npm run build && npm run preview -- --port 5199 &` then open `http://localhost:5199`:
  - All 7 visible blocks render EN; toggle VN — every string switches; reload — language persists.
  - Anchors scroll: work/about/skills/experience/contact.
  - DarkVeil is slate-toned, subtle behind content; with OS reduced-motion enabled the veil is gone and page is static.
  - Mobile width 375px: navbar collapses extra links, project rows stack.
- [ ] **Step 2: Lighthouse** — `npx lighthouse http://localhost:5199 --only-categories=performance --chrome-flags="--headless" --quiet | grep -A2 "Performance"` (best-effort; if lighthouse unavailable, skip with note). Expected ≥ 90; if lower, largest lever is DarkVeil `speed`/`opacity` — tune, re-run.
- [ ] **Step 3: Push branch**

```bash
cd /home/kane/Dev/portfolio && git push -u origin redesign/editorial-dark
```

Do NOT merge to main (main auto-deploys to S3) — user reviews the branch first.
