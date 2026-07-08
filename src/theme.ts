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
