import styled from "styled-components";
import { motion } from "motion/react";
import { content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Panel = styled(motion.section)`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 30px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 247, 0.98) 100%);
  box-shadow: 0 26px 60px rgba(16, 19, 24, 0.09);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(255, 255, 255, 0.75);
`;

const Dots = styled.div`
  display: flex;
  gap: 7px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.line};
  }

  span:first-child { background: #ff5f57; }
  span:nth-child(2) { background: #febc2e; }
  span:nth-child(3) { background: #28c840; }
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const Body = styled.div`
  padding: 22px 20px 20px;
  display: grid;
  gap: 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  line-height: 1.65;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.body};
  text-transform: lowercase;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const Cursor = styled.span`
  display: inline-block;
  width: 0.68ch;
  color: ${({ theme }) => theme.colors.accent};
  margin-left: 0.15ch;
  animation: blink 1.1s steps(1, end) infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export function PersonalConsole() {
  const reduced = useReducedMotion();
  const heroConsole = content.hero.console;

  return (
    <Panel
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <Header>
        <Dots aria-hidden="true">
          <span />
          <span />
          <span />
        </Dots>
        <Title>{heroConsole.title}</Title>
        <Title>{heroConsole.version}</Title>
      </Header>
      <Body>
        <Row>
          <Prompt>$</Prompt>
          <div>
            {heroConsole.command}<span aria-hidden="true">_</span>
            <Cursor>█</Cursor>
          </div>
        </Row>
        {heroConsole.rows.map((line, index) => (
          <Row
            key={line.label}
            initial={reduced ? false : { opacity: 0, x: 10 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: 0.08 * (index + 1), ease: [0.16, 1, 0.3, 1] }}
          >
            <Label>{line.label}</Label>
            <Value>{line.value}</Value>
          </Row>
        ))}
      </Body>
    </Panel>
  );
}
