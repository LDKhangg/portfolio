import styled from "styled-components";
import { Container } from "@/components/layout";
import { useLang } from "@/i18n";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import DecryptedText from "@/components/DecryptedText";

const Wrap = styled.section`
  min-height: 92vh;
  display: flex; align-items: center;
  padding-top: 60px;
`;

const Greeting = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem; letter-spacing: 0.1em; margin-bottom: 16px;
`;

const Name = styled.h1`
  font-size: clamp(3rem, 9vw, 5.5rem);
  letter-spacing: -0.02em;
  margin-bottom: 24px;
`;

const Tagline = styled.p`
  max-width: 560px; font-size: 1.05rem; margin-bottom: 40px;
`;

const Ctas = styled.div`
  display: flex; gap: 16px; flex-wrap: wrap;
  a { font-family: ${({ theme }) => theme.fonts.mono}; font-size: 0.85rem; padding: 12px 22px; border-radius: 3px; }
  a:hover { text-decoration: none; }
`;

const Primary = styled.a`
  color: ${({ theme }) => theme.colors.bg0} !important;
  background: ${({ theme }) => theme.colors.accent};
  &:hover { filter: brightness(1.1); }
`;

const Ghost = styled.a`
  color: ${({ theme }) => theme.colors.text} !important;
  border: 1px solid ${({ theme }) => theme.colors.line};
  &:hover { border-color: ${({ theme }) => theme.colors.accent}; }
`;

export function HeroSection() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  return (
    <Wrap id="top">
      <Container>
        <Greeting>{t.hero.greeting}</Greeting>
        <Name>
          {reduced ? t.hero.name : <DecryptedText text={t.hero.name} animateOn="view" speed={60} />}
        </Name>
        <Tagline>{t.hero.tagline}</Tagline>
        <Ctas>
          <Primary href="#work">{t.hero.ctaWork}</Primary>
          <Ghost href="/cv/LeDuyKhang_Fullstack.pdf" target="_blank" rel="noreferrer">{t.hero.ctaCv}</Ghost>
        </Ctas>
      </Container>
    </Wrap>
  );
}
