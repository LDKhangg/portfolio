import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Grid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1px; background: ${({ theme }) => theme.colors.line};
  border: 1px solid ${({ theme }) => theme.colors.line};
`;

const Cell = styled.div`
  background: ${({ theme }) => theme.colors.bg1};
  padding: 28px 24px;
`;

const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 12px;
`;

const Items = styled.p`
  font-size: 0.92rem; line-height: 1.9;
`;

export function SkillsTech() {
  const { t } = useLang();
  return (
    <Section id="skills">
      <Container>
        <SectionHeading index="03" title={t.skills.title} />
        <Grid>
          {t.skills.groups.map((g) => (
            <Cell key={g.label}>
              <Label>{g.label}</Label>
              <Items>{g.items}</Items>
            </Cell>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
