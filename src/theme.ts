export const theme = {
  colors: {
    bg0: "#F7F7F4",
    bg1: "#EFEDE6",
    surface: "#FFFFFF",
    surfaceSoft: "#FAFAF7",
    text: "#101318",
    body: "#596170",
    accent: "#007AFF",
    line: "rgba(16,19,24,0.12)",
    card: "rgba(255,255,255,0.92)",
    shadow: "rgba(16,19,24,0.08)",
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
