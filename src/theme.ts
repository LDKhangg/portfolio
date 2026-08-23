export const theme = {
  colors: {
    bg0: "#403d4d",
    bg1: "#3a3747",
    surface: "rgba(73, 69, 89, 0.9)",
    surfaceSoft: "rgba(61, 58, 75, 0.96)",
    text: "#f3f5fb",
    body: "rgba(234, 237, 245, 0.78)",
    accent: "#d7d3e3",
    line: "rgba(255,255,255,0.12)",
    card: "rgba(56, 53, 68, 0.92)",
    shadow: "rgba(7, 8, 12, 0.34)",
  },
  fonts: {
    serif: "'JetBrains Mono', Consolas, monospace",
    sans: "'Inter Variable', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', Consolas, monospace",
  },
  maxWidth: "1200px",
  sectionGap: "clamp(96px, 12vw, 156px)",
} as const;

export type AppTheme = typeof theme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
