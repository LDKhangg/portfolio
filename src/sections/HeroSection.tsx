import styled from "styled-components";
import { motion } from "motion/react";
import { Container } from "@/components/layout";
import { content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PersonalConsole } from "@/components/PersonalConsole";

const Wrap = styled.section`
  min-height: calc(100dvh - 72px);
  display: flex;
  align-items: center;
  padding: clamp(52px, 9vw, 92px) 0 clamp(72px, 10vw, 120px);
`;

const HeroShell = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  align-items: center;
  gap: clamp(24px, 4vw, 56px);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

const Copy = styled.div`
  display: grid;
  gap: 20px;
  max-width: 44rem;
`;

const Intro = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.img`
  width: 84px;
  height: 84px;
  object-fit: cover;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 36px ${({ theme }) => theme.colors.shadow};
  flex: 0 0 auto;

  @media (max-width: 640px) {
    width: 72px;
    height: 72px;
    border-radius: 20px;
  }
`;

const IntroText = styled.div`
  display: grid;
  gap: 8px;
`;

const Greeting = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

const Name = styled.h1`
  font-size: clamp(4.2rem, 10vw, 8.6rem);
  letter-spacing: -0.09em;
  line-height: 0.92;
  max-width: 8ch;
`;

const Tagline = styled.p`
  max-width: 32rem;
  font-size: 1.08rem;
  line-height: 1.9;
`;

const Facts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Fact = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const Ctas = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Action = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text} !important;
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;

  &:hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.accent};
    background: rgba(0, 122, 255, 0.05);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Primary = styled(Action)`
  background: ${({ theme }) => theme.colors.accent};
  color: #fff !important;
  border-color: ${({ theme }) => theme.colors.accent};
  &:hover { background: #0064d8; }
`;

const Ghost = styled(Action)``;

export function HeroSection() {
  const reduced = useReducedMotion();
  const avatarSrc = `${import.meta.env.BASE_URL}profile.jpg`;
  const cvSrc = `${import.meta.env.BASE_URL}LeDuyKhang_FullStack_Developer.pdf`;
  return (
    <Wrap id="top">
      <HeroShell>
        <Copy>
          <Intro>
            <Avatar src={avatarSrc} alt={content.hero.name} />
            <IntroText>
              <Greeting>{content.hero.greeting}</Greeting>
            </IntroText>
          </Intro>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Name>{content.hero.name}</Name>
          </motion.div>
          <Tagline>{content.hero.tagline}</Tagline>
          <Facts>
            {content.hero.facts.map((fact) => (
              <Fact key={fact}>{fact}</Fact>
            ))}
          </Facts>
          <Ctas>
            <Primary href="#work">{content.hero.ctaWork}</Primary>
            <Ghost href={cvSrc} target="_blank" rel="noreferrer">{content.hero.ctaCv}</Ghost>
          </Ctas>
        </Copy>
        <PersonalConsole />
      </HeroShell>
    </Wrap>
  );
}
