import styled from "styled-components";
import { motion } from "motion/react";
import { Container } from "@/components/layout";
import GradientWaves from "@/components/GradientWaves";
import { content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Wrap = styled.section`
  position: relative;
  isolation: isolate;
  overflow: clip;
  min-height: calc(100dvh - 72px);
  display: flex;
  align-items: center;
  padding: clamp(52px, 9vw, 92px) 0 clamp(72px, 10vw, 120px);
  background:
    radial-gradient(circle at 50% 115%, rgba(255, 255, 255, 0.22), transparent 26%),
    linear-gradient(180deg, #14131b 0%, #111018 42%, #171720 100%);
  color: rgba(244, 247, 255, 0.88);
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 1;
`;

const BackgroundVeil = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 86%, rgba(255, 255, 255, 0.3), transparent 18%),
    radial-gradient(circle at 52% 58%, rgba(255, 255, 255, 0.08), transparent 32%),
    linear-gradient(180deg, rgba(9, 10, 15, 0.12) 0%, rgba(9, 10, 15, 0.04) 34%, rgba(9, 10, 15, 0.2) 100%);
`;

const HeroShell = styled(Container)`
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
`;

const Copy = styled.div`
  display: grid;
  gap: 20px;
  width: min(100%, 52rem);
  justify-items: center;
  text-align: center;
`;

const Intro = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: center;
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
  justify-items: center;
`;

const Greeting = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: #8ab4ff;
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

const Name = styled.h1`
  font-size: clamp(4.2rem, 10vw, 8.6rem);
  letter-spacing: -0.09em;
  line-height: 0.92;
  max-width: 8ch;
  color: #f7f9ff;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  text-align: center;
`;

const Tagline = styled.p`
  max-width: 32rem;
  font-size: 1.08rem;
  line-height: 1.9;
  color: rgba(229, 234, 246, 0.82);
  text-align: center;
`;

const Facts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Fact = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(230, 236, 249, 0.75);
`;

const Ctas = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Action = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 12px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #eef3ff !important;
  backdrop-filter: blur(10px);
  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;

  &:hover {
    text-decoration: none;
    border-color: rgba(138, 180, 255, 0.6);
    background: rgba(138, 180, 255, 0.12);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Primary = styled(Action)`
  background: #f4f7ff;
  color: #14131b !important;
  border-color: rgba(255, 255, 255, 0.65);
  &:hover { background: #dfe9ff; }
`;

const Ghost = styled(Action)``;

export function HeroSection() {
  const reduced = useReducedMotion();
  const avatarSrc = `${import.meta.env.BASE_URL}profile.jpg`;
  const cvSrc = `${import.meta.env.BASE_URL}LeDuyKhang_FullStack_Developer.pdf`;
  return (
    <Wrap id="top">
      <Background aria-hidden="true">
        <GradientWaves
          horizonColor="#23212b"
          waveColor="#5f5a67"
          crestColor="#d9d6de"
          speed={reduced ? 0.12 : 0.22}
          amplitude={reduced ? 2.2 : 3.8}
          waveScale={0.9}
          waveRatio={0.84}
          swell={reduced ? 30 : 46}
          turbulence={reduced ? 16 : 28}
          tilt={1.12}
          zoom={0.9}
          height={4.4}
          fogDepth={44}
          detail={reduced ? "low" : "medium"}
          brightness={0.94}
          opacity={0.96}
          mouseInteraction={!reduced}
          parallaxStrength={0.18}
          grain={!reduced}
          grainIntensity={0.05}
        />
      </Background>
      <BackgroundVeil aria-hidden="true" />
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
      </HeroShell>
    </Wrap>
  );
}
