import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { content } from "@/content";

const Intro = styled.p`
  max-width: 760px;
  margin-bottom: 24px;
  font-size: 1.05rem;
`;

const RepoLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: -8px 0 24px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;

const Card = styled.article`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const Kicker = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 1.7rem;
  margin-bottom: 16px;
`;

const List = styled.div`
  display: grid;
  gap: 12px;

  p {
    padding-left: 14px;
    border-left: 2px solid ${({ theme }) => theme.colors.line};
  }
`;

const Principles = styled.div`
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Pill = styled.span`
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

export function ConfigSetup() {
  return (
    <Section id="config">
      <Container>
        <SectionHeading index="03" title={content.config.title} description={content.config.description} />
        <Intro>{content.config.intro}</Intro>
        <RepoLinks aria-label="Configuration repositories">
          {content.config.repoLinks.map((repo) => (
            <RepoLink key={repo.href} href={repo.href} target="_blank" rel="noreferrer">
              {repo.label}
            </RepoLink>
          ))}
        </RepoLinks>
        <Grid>
          {content.config.cards.map((card) => (
            <Card key={card.title}>
              <Kicker>{card.kicker}</Kicker>
              <Title>{card.title}</Title>
              <List>
                {card.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </List>
            </Card>
          ))}
        </Grid>
        <Principles aria-label={content.config.principlesLabel}>
          {content.config.principles.map((principle) => (
            <Pill key={principle}>{principle}</Pill>
          ))}
        </Principles>
      </Container>
    </Section>
  );
}
