export const theme = {
  colors: {
    bg0: "#373543",
    bg1: "#312f3c",
    surface: "rgba(63, 60, 77, 0.9)",
    surfaceSoft: "rgba(53, 51, 66, 0.96)",
    text: "#f3f5fb",
    body: "rgba(234, 237, 245, 0.78)",
    accent: "#007AFF",
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
