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
          <LangBtn onClick={toggle} aria-label={t.nav.langToggle}>
            {lang === "en" ? "VN" : "EN"}
          </LangBtn>
        </Links>
      </Inner>
    </Bar>
  );
}
