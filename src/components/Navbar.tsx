import styled from "styled-components";
import { content } from "@/content";

const Bar = styled.header`
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
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

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

const Wordmark = styled.span`
  line-height: 1;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;

  @media (max-width: 640px) {
    display: none;
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

export function Navbar() {
  const avatarSrc = `${import.meta.env.BASE_URL}profile.jpg`;
  return (
    <Bar>
      <Inner>
        <Logo href="#top" aria-label="Kane portfolio">
          <Avatar src={avatarSrc} alt="Kane" />
          <Wordmark>Kane</Wordmark>
        </Logo>
        <Links>
          <a href="#work">{content.nav.work}</a>
          <a href="#about" className="hide-sm hide-md">{content.nav.about}</a>
          <a href="#config" className="hide-sm hide-md">{content.nav.config}</a>
          <a href="#skills" className="hide-sm hide-md">{content.nav.skills}</a>
          <a href="#experience" className="hide-sm hide-md">{content.nav.experience}</a>
          <a href="#contact">{content.nav.contact}</a>
        </Links>
      </Inner>
    </Bar>
  );
}
