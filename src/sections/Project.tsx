import { useState } from "react";
import styled, { css } from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const WorkSection = styled(Section)`
  padding-top: clamp(88px, 10vw, 120px);
`;

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
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.28);
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

const FolderStack = styled.span<{ $active?: boolean; $small?: boolean; $reduced?: boolean }>`
  position: relative;
  width: ${({ $small }) => ($small ? "20px" : "22px")};
  height: ${({ $small }) => ($small ? "15px" : "16px")};
  display: inline-block;
  perspective: 900px;
  flex: none;

  ${({ $reduced }) =>
    !$reduced && css`
      &:hover [data-folder-layer="back-1"] {
        transform: rotateX(-18deg) translateY(-0.5px);
      }

      &:hover [data-folder-layer="back-2"] {
        transform: rotateX(-30deg) translateY(-1px);
      }

      &:hover [data-folder-layer="front"] {
        transform: rotateX(-46deg) translateY(1px);
      }
    `}

  ${({ $active, $reduced }) =>
    $active &&
    !$reduced &&
    css`
      [data-folder-layer="back-1"] {
        transform: rotateX(-18deg) translateY(-0.5px);
      }

      [data-folder-layer="back-2"] {
        transform: rotateX(-30deg) translateY(-1px);
      }

      [data-folder-layer="front"] {
        transform: rotateX(-46deg) translateY(1px);
      }
    `}
`;

const FolderLayer = styled.span<{ $tone: "back-1" | "back-2" | "front"; $active?: boolean; $small?: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 4px;
  transform-origin: bottom center;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;

  ${({ $tone, $active, $small, theme }) => {
    if ($tone === "back-1") {
      return css`
        inset: 1px 0 0 0;
        border: 1px solid rgba(227, 231, 242, ${$active ? 0.5 : 0.3});
        background: rgba(205, 208, 221, 0.72);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.16);
      `;
    }

    if ($tone === "back-2") {
      return css`
        inset: 0.5px;
        border: 1px solid rgba(227, 231, 242, ${$active ? 0.58 : 0.38});
        background: rgba(226, 228, 237, 0.84);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.14);
      `;
    }

    return css`
      border: 1px solid ${$active ? theme.colors.accent : "rgba(227, 231, 242, 0.5)"};
      background: linear-gradient(180deg, rgba(239, 240, 245, 0.96) 0%, rgba(219, 221, 231, 0.96) 100%);
      box-shadow: ${$active ? "inset 0 10px 14px rgba(235, 237, 244, 0.7), inset 0 -10px 14px rgba(179, 181, 194, 0.34), 0 8px 12px rgba(0, 0, 0, 0.16)" : "0 3px 8px rgba(0, 0, 0, 0.14)"};

      &::before {
        content: "";
        position: absolute;
        left: 1px;
        bottom: calc(100% - 1px);
        width: ${$small ? "8px" : "9px"};
        height: ${$small ? "4px" : "5px"};
        border-radius: 3px 3px 0 0;
        border: 1px solid ${$active ? theme.colors.accent : "rgba(227, 231, 242, 0.5)"};
        border-bottom: 0;
        background: rgba(239, 240, 245, 0.96);
      }
    `;
  }}
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
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.32);
`;

const ShellBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(255, 255, 255, 0.05);
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
  background: linear-gradient(180deg, rgba(27, 26, 37, 0.94) 0%, rgba(20, 19, 28, 0.98) 100%);
  border: 1px solid rgba(227, 233, 248, 0.1);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.32);
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
    color: ${({ theme }) => theme.colors.text};
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

const BulletList = styled.ul`
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  max-width: 68ch;
`;

const Bullet = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: start;
  color: ${({ theme }) => theme.colors.body};
  font-size: 0.95rem;
  line-height: 1.7;

  &::before {
    content: "*";
    color: ${({ theme }) => theme.colors.accent};
    font-family: ${({ theme }) => theme.fonts.mono};
    transform: translateY(1px);
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    background: rgba(255, 255, 255, 0.05);
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

const projectBullets = (name: string, description: string) => {
  if (name.startsWith("Locker R")) {
    return [
      "Graduation startup project that received 50 million VND in funding support from FPT University.",
      "Built a smart-locker IoT platform covering locker usage flow, device communication, and real-time status tracking.",
      "Implemented the system with Java 21, Spring Boot, Spring Cloud, RabbitMQ, MQTT, PostgreSQL, Docker, and WebSocket/STOMP.",
    ];
  }

  if (name.startsWith("B2B Construction")) {
    return [
      "B2B procurement system for construction quote, bid, contract, and invoice workflows.",
      "Focused on backend implementation for the internal business flow and data handling.",
      description,
    ];
  }

  if (name.startsWith("Fitness Studio")) {
    return [
      "Operations SaaS for a fitness franchise spanning membership, staff, and branch workflows.",
      "Worked across product features used by internal teams running day-to-day operations.",
      description,
    ];
  }

  return [description];
};

export function Project() {
  const reduced = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProject = content.projects.items[selectedIndex];
  const bullets = projectBullets(selectedProject.name, selectedProject.description);

  return (
    <WorkSection id="work">
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
                <FolderStack $small $reduced={reduced}>
                  <FolderLayer data-folder-layer="back-1" $tone="back-1" $small />
                  <FolderLayer data-folder-layer="back-2" $tone="back-2" $small />
                  <FolderLayer data-folder-layer="front" $tone="front" $small />
                </FolderStack>
                <span>projects/</span>
              </RootRow>

              {content.projects.items.map((project, index) => {
                const active = selectedIndex === index;

                return (
                  <TreeLine key={project.name}>
                    <TreeSpine aria-hidden="true" />
                    <EntryButton type="button" onClick={() => setSelectedIndex(index)} $active={active} $reduced={reduced} aria-pressed={active}>
                      <FolderStack $active={active} $reduced={reduced}>
                        <FolderLayer data-folder-layer="back-1" $tone="back-1" $active={active} />
                        <FolderLayer data-folder-layer="back-2" $tone="back-2" $active={active} />
                        <FolderLayer data-folder-layer="front" $tone="front" $active={active} />
                      </FolderStack>
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
                <BulletList>
                  {bullets.map((item) => (
                    <Bullet key={item}>
                      <span>{item}</span>
                    </Bullet>
                  ))}
                </BulletList>
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
    </WorkSection>
  );
}
