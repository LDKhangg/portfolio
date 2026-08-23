import styled from "styled-components";
import { Section, SectionAnchor, SectionHeading } from "@/components/layout";
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

const StackBoard = styled.div`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
  display: grid;
  gap: 18px;
`;

const StackBoardHeader = styled.div`
  display: grid;
  gap: 8px;

  p {
    max-width: 58ch;
    color: ${({ theme }) => theme.colors.body};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const StackTitle = styled.h3`
  font-size: 1.45rem;
  line-height: 1.1;
`;

const StackRows = styled.div`
  display: grid;
  gap: 12px;
`;

const StackRow = styled.div`
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  &:first-child {
    padding-top: 0;
    border-top: 0;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
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
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 999px;
    padding: 5px 10px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255, 255, 255, 0.03);
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
    <Section>
      <SectionAnchor id="skills">
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
              <StackBoard>
                <StackBoardHeader>
                  <Label>Core stack</Label>
                  <StackTitle>Grouped tighter so the stack reads fast instead of scattering across the page.</StackTitle>
                </StackBoardHeader>

                <StackRows>
                  {content.skills.groups.map((g) => (
                    <StackRow key={g.label}>
                      <Label>{g.label}</Label>
                      <Items>
                        {g.items.split(" · ").map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </Items>
                    </StackRow>
                  ))}
                </StackRows>
              </StackBoard>
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
      </SectionAnchor>
    </Section>
  );
}
