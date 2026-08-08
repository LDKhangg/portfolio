import styled from "styled-components";
import { useLang } from "@/i18n";

const Bar = styled.header`
  position: sticky;
  top: 10px;
  z-index: 20;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding: 10px 10px 0;
`;

const Inner = styled.nav`
  width: fit-content;
  max-width: calc(100vw - 24px);
  pointer-events: auto;
  padding: 8px 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(12px) saturate(165%);
  box-shadow: 0 8px 16px rgba(16, 19, 24, 0.06);

  @media (max-width: 640px) {
    padding: 10px 12px;
  }
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Mark = styled.span`
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.surface};
  font-size: 0.62rem;
  letter-spacing: 0.04em;
`;

const Wordmark = styled.span`
  display: grid;
  gap: 1px;
  line-height: 1;

  strong {
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 600;
  }

  span {
    font-size: 0.54rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.body};
  }

  @media (max-width: 640px) {
    span {
      display: none;
    }
  }
`;

const Links = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;

  a { color: ${({ theme }) => theme.colors.body}; }
  a:hover { color: ${({ theme }) => theme.colors.accent}; text-decoration: none; }
  @media (max-width: 920px) { a.hide-md { display: none; } }
  @media (max-width: 640px) { gap: 12px; a.hide-sm { display: none; } }
`;

const LangBtn = styled.button`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  padding: 6px 9px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 999px;
  &:hover { border-color: ${({ theme }) => theme.colors.accent}; background: rgba(0, 122, 255, 0.06); }
`;

export function Navbar() {
  const { lang, toggle, t } = useLang();
  return (
    <Bar>
      <Inner>
        <Logo href="#top" aria-label="Le Duy Khang portfolio">
          <Mark>LK</Mark>
          <Wordmark>
            <strong>LDK</strong>
            <span>portfolio</span>
          </Wordmark>
        </Logo>
        <Links>
          <a href="#work">{t.nav.work}</a>
          <a href="#about" className="hide-sm hide-md">{t.nav.about}</a>
          <a href="#skills" className="hide-sm hide-md">{t.nav.skills}</a>
          <a href="#experience" className="hide-sm hide-md">{t.nav.experience}</a>
          <a href="#contact">{t.nav.contact}</a>
          <LangBtn type="button" onClick={toggle} aria-label={t.nav.langToggle}>
            {lang === "en" ? "VI" : "EN"}
          </LangBtn>
        </Links>
      </Inner>
    </Bar>
  );
}
