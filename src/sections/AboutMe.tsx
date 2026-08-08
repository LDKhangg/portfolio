import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Wrap = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Body = styled.div`
  max-width: 680px;
  display: grid;
  gap: 18px;
  align-content: start;
  font-size: 1.06rem;
`;

const Panel = styled.aside`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const Fact = styled.div`
  padding: 14px 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.line};
  }
`;

const FactLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 8px;
`;

const FactValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

export function AboutMe() {
  const { t } = useLang();
  return (
    <Section id="about">
      <Container>
        <SectionHeading index="02" title={t.about.title} description={t.about.description} />
        <Wrap>
          <Body>
            {t.about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Body>
          <Panel>
            {t.about.facts.map((fact) => (
              <Fact key={fact.label}>
                <FactLabel>{fact.label}</FactLabel>
                <FactValue>{fact.value}</FactValue>
              </Fact>
            ))}
          </Panel>
        </Wrap>
      </Container>
    </Section>
  );
}
