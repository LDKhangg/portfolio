# Portfolio Redesign — Editorial Dark (A3 Slate)

**Date:** 2026-07-08 · **Approved by:** Khang (chat session) · **Repo:** LDKhangg/portfolio, branch `redesign/editorial-dark`

## Goal

Full visual redesign of the personal portfolio. User verdict on current site: layout/spacing messy, colors/typography unappealing, missing sections, wants a new style. Chosen direction (via visual companion mockups): **Editorial Dark — variant A3 "Slate lạnh"** — magazine-style typography and spacing on a cold slate-dark background.

## Decisions (locked with user)

| Topic | Decision |
|---|---|
| Style | Editorial layout, dark slate tone (A3 mockup) |
| Motion | KEEP DarkVeil WebGL background + DecryptedText + BlurText, recolored to slate tone |
| Sections | Navbar, Hero, About, Selected Projects (3 CV projects), Skills, Experience, Certifications, GitHub + Contact/Footer |
| Language | Bilingual EN/VN with navbar toggle, persisted in localStorage |
| Tech approach | **Approach 2**: migrate CRA → Vite first, then restyle (approved over restyle-in-place and Next.js rebuild) |

## Design system

- Background: vertical gradient `#0F1216 → #12161C`, static noise ~2%, DarkVeil (slate hues, low intensity) behind hero only
- Type: **Fraunces** (serif display — name, section titles, silver `#E2E8F0`), **Inter** (body — `#94A3B8`), **JetBrains Mono** (labels, indices, stack tags)
- Single accent: ice blue `#7DD3FC` (links, hovers, underlines, project indices). No second accent color.
- Layout: max-width ~1100px container, ~120px vertical rhythm between sections, section headings = small mono index (`01 —`) + large serif title
- Accessibility: `prefers-reduced-motion` disables DarkVeil and all animations

## Architecture

- **Vite + React 19 + TypeScript**, styled-components (kept)
- `src/theme.ts` — design tokens (colors, fonts, spacing); `GlobalStyle` rewritten
- `src/i18n/` — `LanguageContext.tsx` (React context + localStorage), `en.ts`, `vi.ts` content dictionaries; no i18n library
- Sections rebuilt in `src/sections/`, effect components kept in `src/components/` (DarkVeil recolored via uniforms)
- Deploy: existing GitHub Actions → S3 workflow, build dir changes `build/` → `dist/`

## Section content notes

- **Projects** (heart of the page), editorial rows `01/02/03`: Locker R (Smart Locker IoT platform — 11 Spring Boot microservices), B2B Construction E-Procurement (WALA-ICT), Fitness Studio Franchise SaaS (WALA-ICT). Description 2 sentences each, mono stack tags, GitHub/demo links.
- **Skills**: 4 plain-text groups (Backend / Frontend / Data & Messaging / DevOps) — no progress bars.
- **Experience**: vertical timeline — WALA-ICT (Dec 2025–present), AWS First Cloud Journey (Sep–Nov 2025).
- **Certifications**: AWS FCJ, CEFR B2 — compact cards.
- **GitHub block**: github-readme-stats images themed to match (no API code).
- All copy authored in EN + VN from the user's CV.

## Quality gates

- `npm run build` clean; local preview verified visually
- Lighthouse performance ≥ 90; below-fold sections lazy-loaded
- Deploy workflow updated and left functional
