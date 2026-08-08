import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const Cell = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 14px;
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 999px;
    padding: 6px 10px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceSoft};
  }
`;

export function SkillsTech() {
  const { t } = useLang();
  return (
    <Section id="skills">
      <Container>
        <SectionHeading index="03" title={t.skills.title} description={t.skills.description} />
        <Grid>
          {t.skills.groups.map((g) => (
            <Cell key={g.label}>
              <Label>{g.label}</Label>
              <Items>
                {g.items.split(" · ").map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </Items>
            </Cell>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
