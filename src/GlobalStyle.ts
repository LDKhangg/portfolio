import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; scroll-padding-top: 96px; }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }

  body {
    background: linear-gradient(180deg, ${({ theme }) => theme.colors.bg0} 0%, ${({ theme }) => theme.colors.bg1} 100%);
    background-attachment: fixed;
    color: ${({ theme }) => theme.colors.body};
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 18px;
    line-height: 1.7;
    min-height: 100vh;
    position: relative;
    isolation: isolate;
    -webkit-font-smoothing: antialiased;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background:
      radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.07), transparent 30%),
      radial-gradient(circle at 82% 10%, rgba(255, 255, 255, 0.045), transparent 22%),
      radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.05), transparent 22%);
  }

  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: 0.085;
    background-image: radial-gradient(rgba(255, 255, 255, 0.38) 0.6px, transparent 0.6px);
    background-size: 3px 3px;
    mix-blend-mode: soft-light;
  }

  h1, h2, h3 { font-family: ${({ theme }) => theme.fonts.serif}; color: ${({ theme }) => theme.colors.text}; font-weight: 600; line-height: 0.94; letter-spacing: -0.06em; text-wrap: balance; }
  p, li { text-wrap: pretty; }
  a { color: inherit; text-decoration: none; }
  a:hover { color: ${({ theme }) => theme.colors.accent}; text-decoration: none; }
  button, input, textarea, select { font: inherit; }
  img { display: block; max-width: 100%; }
  ::selection { background: ${({ theme }) => theme.colors.accent}; color: ${({ theme }) => theme.colors.bg0}; }

  section { scroll-margin-top: 96px; }

  .skip-link {
    position: absolute;
    left: 20px;
    top: 16px;
    z-index: 30;
    transform: translateY(-180%);
    padding: 10px 14px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
  }

  .skip-link:focus {
    transform: translateY(0);
  }
`;

export default GlobalStyle;
