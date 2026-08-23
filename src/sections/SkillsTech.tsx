import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { content } from "@/content";

const Intro = styled.p`
  max-width: 760px;
  margin-bottom: 24px;
  font-size: 1.05rem;
`;

const Flow = styled.div`
  display: grid;
  gap: 18px;
`;

const Shell = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: grid;
  gap: 16px;
`;

const SideColumn = styled.div`
  display: grid;
  gap: 16px;
  align-content: start;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const Cell = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const RepoLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RepoLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: transform 160ms ease, border-color 160ms ease, background-color 160ms ease, color 160ms ease;

  &:hover {
    text-decoration: none;
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.accent};
    background: rgba(255, 255, 255, 0.06);
    color: ${({ theme }) => theme.colors.accent};
  }
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

const ConfigCard = styled.article`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const ConfigTitle = styled.h3`
  font-size: 1.55rem;
  margin-bottom: 16px;
`;

const ConfigList = styled.div`
  display: grid;
  gap: 12px;

  p {
    padding-left: 14px;
    border-left: 2px solid ${({ theme }) => theme.colors.line};
  }
`;

const Principles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Principle = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export function SkillsTech() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading index="03" title={content.skills.title} description={content.skills.description} />
        <Flow>
          <Intro>{content.config.intro}</Intro>
          <RepoLinks aria-label="Configuration repositories">
            {content.config.repoLinks.map((repo) => (
              <RepoLink key={repo.href} href={repo.href} target="_blank" rel="noreferrer">
                {repo.label}
              </RepoLink>
            ))}
          </RepoLinks>
          <Shell>
            <MainColumn>
              <Grid>
                {content.skills.groups.map((g) => (
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
            </MainColumn>

            <SideColumn>
              {content.config.cards.map((card) => (
                <ConfigCard key={card.title}>
                  <Label>{card.kicker}</Label>
                  <ConfigTitle>{card.title}</ConfigTitle>
                  <ConfigList>
                    {card.items.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </ConfigList>
                </ConfigCard>
              ))}
            </SideColumn>
          </Shell>
          <Principles aria-label={content.config.principlesLabel}>
            {content.config.principles.map((principle) => (
              <Principle key={principle}>{principle}</Principle>
            ))}
          </Principles>
        </Flow>
      </Container>
    </Section>
  );
}
