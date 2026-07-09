import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Rows = styled.div` display: grid; `;

const Row = styled.a`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 24px;
  padding: 40px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  color: inherit;
  transition: background 0.25s ease;
  &:first-of-type { border-top: 1px solid ${({ theme }) => theme.colors.line}; }
  &:hover { text-decoration: none; background: ${({ theme }) => theme.colors.card}; }
  &:hover h3 { color: ${({ theme }) => theme.colors.accent}; }
  @media (max-width: 640px) { grid-template-columns: 1fr; gap: 8px; }
`;

const Num = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1rem; color: ${({ theme }) => theme.colors.accent};
  padding-top: 6px;
`;

const Name = styled.h3`
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  transition: color 0.25s ease;
`;

const Role = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
  margin: 6px 0 12px;
`;

const Desc = styled.p` max-width: 720px; font-size: 0.97rem; margin-bottom: 16px; `;

const Tags = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
  span {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.72rem; padding: 3px 10px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 999px;
    color: ${({ theme }) => theme.colors.body};
  }
`;

export function Project() {
  const { t } = useLang();
  return (
    <Section id="work">
      <Container>
        <SectionHeading index="01" title={t.projects.title} />
        <Rows>
          {t.projects.items.map((p, i) => (
            <Row
              key={p.name}
              href={p.link ?? undefined}
              target={p.link ? "_blank" : undefined}
              rel={p.link ? "noreferrer" : undefined}
              as={p.link ? "a" : "div"}
            >
              <Num>{String(i + 1).padStart(2, "0")}</Num>
              <div>
                <Name>{p.name} {p.link ? "↗" : ""}</Name>
                <Role>{p.role}</Role>
                <Desc>{p.description}</Desc>
                <Tags>
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </Tags>
              </div>
            </Row>
          ))}
        </Rows>
      </Container>
    </Section>
  );
}
