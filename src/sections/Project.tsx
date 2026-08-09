import styled from "styled-components";
import { motion } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/layout";
import { content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Rows = styled.div`
  display: grid;
  gap: 18px;
`;

const Row = styled(motion.article)`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
  gap: 28px;
  padding: 30px;
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  border: 1px solid ${({ theme }) => theme.colors.line};
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
  color: inherit;
  align-items: start;

  &:hover { text-decoration: none; }

  &[data-reverse="true"] {
    grid-template-columns: minmax(220px, 0.8fr) minmax(0, 1.2fr);
  }

  &[data-reverse="true"] > :first-child {
    order: 2;
  }

  &[data-reverse="true"] > :last-child {
    order: 1;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;

    &[data-reverse="true"] > :first-child,
    &[data-reverse="true"] > :last-child {
      order: 0;
    }
  }
`;

const Meta = styled.div`
  display: grid;
  gap: 10px;
`;

const Num = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const Name = styled.h3`
  font-size: clamp(1.7rem, 3.2vw, 2.5rem);
  max-width: 14ch;
`;

const Role = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const Desc = styled.p`
  max-width: 62ch;
  font-size: 1rem;
  margin-top: 16px;
`;

const Tags = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  margin-top: 18px;

  span {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    padding: 4px 10px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 999px;
    color: ${({ theme }) => theme.colors.body};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const Link = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};

  &:hover {
    text-decoration: none;
  }
`;

export function Project() {
  const reduced = useReducedMotion();
  return (
    <Section id="work">
      <Container>
        <SectionHeading index="01" title={content.projects.title} description={content.projects.description} />
        <Rows>
          {content.projects.items.map((p, i) => (
            p.link ? (
              <Row
                key={p.name}
                as="a"
                href={p.link}
                target="_blank"
                rel="noreferrer"
                data-reverse={i % 2 === 1}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Meta>
                  <Num>{String(i + 1).padStart(2, "0")}</Num>
                  <Name>{p.name}</Name>
                  <Role>{p.role}</Role>
                  <Desc>{p.description}</Desc>
                  <Link>{content.projects.openProject} ↗</Link>
                </Meta>
                <div>
                  <Role>{content.projects.stackLabel}</Role>
                  <Tags>
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </Tags>
                </div>
              </Row>
            ) : (
              <Row
                key={p.name}
                as="article"
                data-reverse={i % 2 === 1}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Meta>
                  <Num>{String(i + 1).padStart(2, "0")}</Num>
                  <Name>{p.name}</Name>
                  <Role>{p.role}</Role>
                  <Desc>{p.description}</Desc>
                </Meta>
                <div>
                  <Role>{content.projects.stackLabel}</Role>
                  <Tags>
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </Tags>
                </div>
              </Row>
            )
          ))}
        </Rows>
      </Container>
    </Section>
  );
}
