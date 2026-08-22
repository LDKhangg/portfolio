import { useState } from "react";
import styled, { css } from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 0.72fr) minmax(0, 1.28fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const TreePanel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 28px;
  padding: 22px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const TreeHeading = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 18px;

  h3 {
    font-size: 1rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts.mono};
    color: ${({ theme }) => theme.colors.accent};
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.body};
    max-width: 30ch;
  }
`;

const TreeRoot = styled.div`
  display: grid;
  gap: 8px;
`;

const TreeLine = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: start;
`;

const TreeSpine = styled.div`
  position: relative;
  width: 18px;
  min-height: 34px;

  &::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: ${({ theme }) => theme.colors.line};
  }

  &::after {
    content: "";
    position: absolute;
    left: 8px;
    top: 16px;
    width: 12px;
    height: 1px;
    background: ${({ theme }) => theme.colors.line};
  }
`;

const RootRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FolderIcon = styled.span<{ $active?: boolean; $small?: boolean }>`
  position: relative;
  width: ${({ $small }) => ($small ? "20px" : "22px")};
  height: ${({ $small }) => ($small ? "15px" : "16px")};
  border-radius: 4px;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.line)};
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 4px 10px ${({ theme }) => theme.colors.shadow};
  flex: none;

  &::before {
    content: "";
    position: absolute;
    left: 1px;
    bottom: calc(100% - 1px);
    width: ${({ $small }) => ($small ? "8px" : "9px")};
    height: ${({ $small }) => ($small ? "4px" : "5px")};
    border-radius: 3px 3px 0 0;
    border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.line)};
    border-bottom: 0;
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const EntryButton = styled.button<{ $active: boolean; $reduced: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  max-width: 100%;
  padding: 2px 8px 2px 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;

  ${({ $active, theme }) =>
    $active
      ? css`
          color: ${theme.colors.accent};
        `
      : null}

  ${({ $reduced }) =>
    !$reduced && css`
      transition: transform 160ms ease, color 160ms ease;

      &:hover {
        transform: translateX(2px);
      }
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
  }
`;

const EntryText = styled.span<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.86rem;
  letter-spacing: 0.02em;
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.body)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Shell = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.bg0} 0%, ${({ theme }) => theme.colors.bg1} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const ShellBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(255, 255, 255, 0.45);
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.line};
  }
`;

const Path = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const ShellBody = styled.div`
  padding: 20px;
  display: grid;
  gap: 18px;
  min-height: 360px;
`;

const Prompt = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.body};

  strong {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 500;
  }
`;

const DetailCard = styled.div`
  border-radius: 22px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(16, 19, 24, 0.08);
  box-shadow: 0 14px 28px rgba(16, 19, 24, 0.06);
  display: grid;
  gap: 16px;
`;

const DetailLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
  flex-wrap: wrap;

  h3 {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
  }

  span {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.body};
  }
`;

const Role = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.body};
  max-width: 64ch;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    background: rgba(255, 255, 255, 0.7);
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    color: ${({ theme }) => theme.colors.body};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const ProjectLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const Hint = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.body};
`;

const treeLabel = (name: string) => {
  if (name.startsWith("B2B Construction")) return "Procurement";
  if (name.startsWith("Fitness Studio")) return "Fitness SaaS";
  return name.split(" — ")[0];
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function Project() {
  const reduced = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProject = content.projects.items[selectedIndex];

  return (
    <Section id="work">
      <Container>
        <SectionHeading index="01" title={content.projects.title} description={content.projects.description} />
        <Layout>
          <TreePanel>
            <TreeHeading>
              <h3>Work index</h3>
              <p>`projects/` is already open. Pick a folder on the left to swap the project in the shell.</p>
            </TreeHeading>

            <TreeRoot>
              <RootRow>
                <FolderIcon $small />
                <span>projects/</span>
              </RootRow>

              {content.projects.items.map((project, index) => {
                const active = selectedIndex === index;

                return (
                  <TreeLine key={project.name}>
                    <TreeSpine aria-hidden="true" />
                    <EntryButton type="button" onClick={() => setSelectedIndex(index)} $active={active} $reduced={reduced} aria-pressed={active}>
                      <FolderIcon $active={active} />
                      <EntryText $active={active}>{String(index + 1).padStart(2, "0")} {treeLabel(project.name)}</EntryText>
                    </EntryButton>
                  </TreeLine>
                );
              })}
            </TreeRoot>
          </TreePanel>

          <Shell>
            <ShellBar>
              <Dots aria-hidden="true">
                <span />
                <span />
                <span />
              </Dots>
              <Path>{`~/portfolio/work/${slugify(treeLabel(selectedProject.name))}`}</Path>
            </ShellBar>
            <ShellBody>
              <Prompt>
                <strong>kane</strong>@portfolio:~$ open {slugify(treeLabel(selectedProject.name))}
              </Prompt>

              <DetailCard>
                <DetailLabel>Selected project</DetailLabel>
                <DetailHeader>
                  <h3>{selectedProject.name}</h3>
                  <span>case file</span>
                </DetailHeader>
                <Role>{selectedProject.role}</Role>
                <Description>{selectedProject.description}</Description>
                <Tags>
                  {selectedProject.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </Tags>
                <Footer>
                  {selectedProject.link ? <ProjectLink href={selectedProject.link} target="_blank" rel="noreferrer">{content.projects.openProject} ↗</ProjectLink> : <span />}
                  <Hint>Open another folder to swap the view.</Hint>
                </Footer>
              </DetailCard>
            </ShellBody>
          </Shell>
        </Layout>
      </Container>
    </Section>
  );
}
