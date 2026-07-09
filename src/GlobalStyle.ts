import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; scroll-padding-top: 72px; }
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

  .veil { position: fixed; inset: 0; z-index: -1; opacity: 0.5; }
`;

export default GlobalStyle;
