import styled from "styled-components";
import LogoLoop, { type LogoLoopItem } from "@/components/LogoLoop";
import { Section, SectionAnchor, SectionHeading } from "@/components/layout";
import { content } from "@/content";

const STACK_LOGOS: LogoLoopItem[] = [
  { src: `${import.meta.env.BASE_URL}tech-logos/openjdk.svg`, alt: "Java", href: "https://openjdk.org/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/spring.svg`, alt: "Spring", href: "https://spring.io/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/go.svg`, alt: "Go", href: "https://go.dev/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/react.svg`, alt: "React", href: "https://react.dev/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/typescript.svg`, alt: "TypeScript", href: "https://www.typescriptlang.org/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/postgresql.svg`, alt: "PostgreSQL", href: "https://www.postgresql.org/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/mysql.svg`, alt: "MySQL", href: "https://www.mysql.com/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/redis.svg`, alt: "Redis", href: "https://redis.io/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/rabbitmq.svg`, alt: "RabbitMQ", href: "https://www.rabbitmq.com/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/docker.svg`, alt: "Docker", href: "https://www.docker.com/" },
  { src: `${import.meta.env.BASE_URL}tech-logos/githubactions.svg`, alt: "GitHub Actions", href: "https://github.com/features/actions" },
];

const Flow = styled.div`
  display: grid;
  gap: 18px;
`;

const Shell = styled.div`
  display: grid;
  gap: 20px;
`;

const ConfigGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
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

const StackCopy = styled.p`
  color: ${({ theme }) => theme.colors.body};
  line-height: 1.65;
`;

const LoopPanel = styled.div`
  display: grid;
  gap: 12px;
  padding-top: 6px;
`;

const LoopFrame = styled.div`
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(255, 255, 255, 0.025);
  overflow: hidden;
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

const ConfigCard = styled.article`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
  display: grid;
  gap: 14px;
`;

const ConfigTitle = styled.h3`
  font-size: 1.55rem;
  margin: 0;
`;

const ConfigList = styled.div`
  display: grid;
  gap: 10px;

  p {
    padding-left: 12px;
    border-left: 2px solid ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.body};
    line-height: 1.55;
  }
`;

const CardCopy = styled.p`
  color: ${({ theme }) => theme.colors.body};
  line-height: 1.55;
  max-width: 40ch;
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
  const [neovimCard, ideavimCard] = content.config.cards;

  return (
    <Section>
      <SectionAnchor id="skills">
        <SectionHeading index="03" title={content.skills.title} />
        <Flow>
          <RepoLinks aria-label="Configuration repositories">
            {content.config.repoLinks.map((repo) => (
              <RepoLink key={repo.href} href={repo.href} target="_blank" rel="noreferrer">
                {repo.label}
              </RepoLink>
            ))}
          </RepoLinks>
          <Shell>
            <ConfigGrid>
              <ConfigCard>
                <Label>{neovimCard.kicker}</Label>
                <ConfigTitle>{neovimCard.title}</ConfigTitle>
                <CardCopy>My main editor for fast navigation, early feedback, and a quiet coding flow.</CardCopy>
                <ConfigList>
                  <p>LSP, completion, and diagnostics tuned to surface issues early.</p>
                  <p>grep-heavy navigation and quick file movement across projects.</p>
                  <p>UI kept quiet enough to stay readable for long sessions.</p>
                </ConfigList>
              </ConfigCard>

              <ConfigCard>
                <Label>Shell and workflow</Label>
                <ConfigTitle>zsh, zim, starship</ConfigTitle>
                <CardCopy>Small shell setup that keeps terminal work consistent with the editor.</CardCopy>
                <ConfigList>
                  <p>zsh as the daily shell with simple aliases and predictable behavior.</p>
                  <p>zim only where it reduces friction without bloating startup.</p>
                  <p>starship for compact repo and runtime context at a glance.</p>
                </ConfigList>
              </ConfigCard>
            </ConfigGrid>

            <StackBoard>
              <StackBoardHeader>
                <Label>Core stack</Label>
                <StackTitle>One tighter view of the tools I actually use instead of a wall of scattered chips.</StackTitle>
              </StackBoardHeader>

              <StackRows>
                {content.skills.groups.map((g) => (
                  <StackRow key={g.label}>
                    <Label>{g.label}</Label>
                    <StackCopy>{g.items}</StackCopy>
                  </StackRow>
                ))}
              </StackRows>

              <LoopPanel>
                <Label>Tool loop</Label>
                <LoopFrame>
                  <LogoLoop
                    logos={STACK_LOGOS}
                    speed={58}
                    gap={28}
                    logoHeight={34}
                    pauseOnHover
                    fadeOut
                    fadeOutColor="#403d4d"
                    scaleOnHover
                    ariaLabel="Core stack logos"
                  />
                </LoopFrame>
              </LoopPanel>
            </StackBoard>
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
