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

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: clamp(120px, 16vw, 220px);
    z-index: 1;
    pointer-events: none;
    background:
      radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.12), transparent 34%),
      linear-gradient(180deg, rgba(49, 47, 60, 0) 0%, rgba(49, 47, 60, 0.42) 42%, ${({ theme }) => theme.colors.bg0} 100%);
    filter: blur(6px);
    opacity: 0.95;
  }
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
  z-index: 3;
  display: grid;
  justify-items: center;
`;

const Copy = styled.div`
  display: grid;
  gap: 18px;
  width: min(100%, 52rem);
  justify-items: center;
  text-align: center;
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
    border-color: rgba(215, 211, 227, 0.38);
    background: rgba(215, 211, 227, 0.1);
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

  &:hover {
    background: #ddd9e8;
    border-color: rgba(215, 211, 227, 0.52);
  }
`;

const Ghost = styled(Action)``;

export function HeroSection() {
  const reduced = useReducedMotion();
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
