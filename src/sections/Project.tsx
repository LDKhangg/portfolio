import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence, motion } from "motion/react";
import { Section, SectionAnchor, SectionHeading } from "@/components/layout";
import { content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const WorkSection = styled(Section)`
  position: relative;
  padding-top: 0;
  margin-top: clamp(36px, 5vw, 56px);
`;

const WorkContainer = styled(SectionAnchor)`
  scroll-margin-top: 124px;
`;

const Layout = styled.div`
  position: relative;
  z-index: 1;
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

const ExplorerBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

const ExplorerTitle = styled.div`
  display: grid;
  gap: 2px;

  strong {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.76rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
  }

  span {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.body};
  }
`;

const ExplorerMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
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
  gap: 4px;
`;

const TreeLine = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
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
  padding: 6px 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.04);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Caret = styled.span<{ $open?: boolean }>`
  width: 10px;
  height: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.body};
  transform: rotate(${({ $open }) => ($open ? "90deg" : "0deg")});
  transform-origin: center;
  transition: transform 160ms ease;

  &::before {
    content: ">";
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    line-height: 1;
  }
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
  width: 100%;
  max-width: 100%;
  min-height: 34px;
  padding: 5px 10px 5px 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  border-radius: 12px;

  ${({ $active, theme }) =>
    $active
      ? css`
          color: ${theme.colors.accent};
          background: rgba(255, 255, 255, 0.05);
        `
      : null}

  ${({ $reduced }) =>
    !$reduced && css`
      transition: transform 160ms ease, color 160ms ease;

      &:hover {
        transform: translateX(2px);
        background: rgba(255, 255, 255, 0.03);
      }
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
  }
`;

const EntryPrefix = styled.span<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.body)};
  opacity: ${({ $active }) => ($active ? 0.92 : 0.72)};
  flex: none;
`;

const EntryText = styled.span<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.86rem;
  letter-spacing: 0.02em;
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.body)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const EntryState = styled.span<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.body)};
  opacity: ${({ $active }) => ($active ? 0.76 : 0.5)};
  flex: none;
`;

const Shell = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 28px;
  overflow: hidden;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.05), transparent 24%),
    linear-gradient(180deg, rgba(61, 58, 75, 0.98) 0%, rgba(41, 39, 52, 0.98) 100%);
  box-shadow: 0 26px 56px rgba(0, 0, 0, 0.34);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.045) 0%, transparent 16%, transparent 84%, rgba(255, 255, 255, 0.02) 100%);
    opacity: 0.85;
  }
`;

const ShellBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.03) 100%);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.18), transparent);
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;

  span {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: background 160ms ease, transform 160ms ease, box-shadow 160ms ease;

    &:nth-child(1) {
      background: rgba(171, 88, 106, 0.7);
    }

    &:nth-child(2) {
      background: rgba(181, 147, 91, 0.68);
    }

    &:nth-child(3) {
      background: rgba(98, 152, 117, 0.68);
    }
  }

  &:hover span {
    transform: translateY(-1px);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.04);
  }

  &:hover span:nth-child(1) {
    background: rgba(208, 106, 129, 0.92);
  }

  &:hover span:nth-child(2) {
    background: rgba(223, 183, 112, 0.92);
  }

  &:hover span:nth-child(3) {
    background: rgba(123, 194, 145, 0.92);
  }
`;

const Path = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(242, 244, 250, 0.58);
`;

const ShellBody = styled.div`
  padding: 20px;
  display: grid;
  gap: 18px;
  min-height: 360px;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 100% 32px;
    opacity: 0.45;
  }
`;

const DetailMotion = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 16px;
  padding: 10px 6px 2px;
`;

const StaggerBlock = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

const Prompt = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: rgba(223, 227, 239, 0.72);
  position: relative;
  z-index: 1;
  min-height: 1.5em;

  strong {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 500;
  }
`;

const TypedText = styled.span`
  white-space: pre-wrap;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 0.62ch;
  margin-left: 2px;
  color: ${({ theme }) => theme.colors.accent};
  animation: shell-caret-blink 1s steps(1) infinite;

  @keyframes shell-caret-blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;

const DetailLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(236, 238, 245, 0.7);
  position: relative;
  z-index: 1;
  padding-top: 6px;
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
    color: rgba(228, 232, 243, 0.56);
  }
`;

const Role = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(232, 236, 245, 0.72);
  position: relative;
  z-index: 1;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.body};
  max-width: 64ch;
`;

const BulletList = styled.ul`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
  max-width: 68ch;
  position: relative;
  z-index: 1;
`;

const Bullet = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: start;
  color: rgba(231, 235, 244, 0.78);
  font-size: 0.95rem;
  line-height: 1.7;

  &::before {
    content: ">";
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
  position: relative;
  z-index: 1;

  span {
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.035);
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    color: rgba(238, 241, 248, 0.7);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  margin-top: 6px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const ProjectLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
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
  const commandText = useMemo(() => `open ${slugify(treeLabel(selectedProject.name))}`, [selectedProject.name]);
  const [typedCommand, setTypedCommand] = useState(reduced ? commandText : "");
  const [commandDone, setCommandDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setTypedCommand(commandText);
      setCommandDone(true);
      return;
    }

    setTypedCommand("");
    setCommandDone(false);

    let timer = 0;
    let index = 0;

    const tick = () => {
      index += 1;
      setTypedCommand(commandText.slice(0, index));

      if (index >= commandText.length) {
        setCommandDone(true);
        return;
      }

      timer = window.setTimeout(tick, index < 6 ? 38 : 26);
    };

    timer = window.setTimeout(tick, 120);

    return () => window.clearTimeout(timer);
  }, [commandText, reduced]);

  return (
    <WorkSection>
      <WorkContainer id="work">
        <SectionHeading index="01" title={content.projects.title} description={content.projects.description} />
        <Layout>
          <TreePanel>
            <ExplorerBar>
              <ExplorerTitle>
                <strong>Explorer</strong>
                <span>custom shell index</span>
              </ExplorerTitle>
              <ExplorerMeta>3 entries</ExplorerMeta>
            </ExplorerBar>
            <TreeHeading>
              <h3>Work index</h3>
              <p>`projects/` is already open. Pick a folder on the left to swap the project in the shell.</p>
            </TreeHeading>

            <TreeRoot>
              <RootRow>
                <Caret $open />
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
                      <Caret $open={active} />
                      <FolderStack $active={active} $reduced={reduced}>
                        <FolderLayer data-folder-layer="back-1" $tone="back-1" $active={active} />
                        <FolderLayer data-folder-layer="back-2" $tone="back-2" $active={active} />
                        <FolderLayer data-folder-layer="front" $tone="front" $active={active} />
                      </FolderStack>
                      <EntryPrefix $active={active}>{String(index + 1).padStart(2, "0")}</EntryPrefix>
                      <EntryText $active={active}>{treeLabel(project.name)}</EntryText>
                      <EntryState $active={active}>{active ? "open" : "file"}</EntryState>
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
                <strong>kane</strong>@portfolio:~$ <TypedText>{typedCommand}</TypedText>
                {!commandDone ? <Cursor aria-hidden="true">_</Cursor> : null}
              </Prompt>

              <AnimatePresence mode="wait">
                <DetailMotion
                  key={selectedProject.name}
                  initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={reduced ? { opacity: 1, y: 0, filter: "blur(0px)" } : commandDone ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(4px)" }}
                  exit={reduced ? undefined : { opacity: 0, y: -14, filter: "blur(4px)" }}
                  transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StaggerBlock initial={false} animate={reduced ? { opacity: 1, y: 0 } : commandDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ duration: 0.2, delay: commandDone ? 0.02 : 0 }}>
                    <DetailLabel>Selected project</DetailLabel>
                  </StaggerBlock>
                  <StaggerBlock initial={false} animate={reduced ? { opacity: 1, y: 0 } : commandDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.22, delay: commandDone ? 0.06 : 0 }}>
                    <DetailHeader>
                      <h3>{selectedProject.name}</h3>
                      <span>case file</span>
                    </DetailHeader>
                  </StaggerBlock>
                  <StaggerBlock initial={false} animate={reduced ? { opacity: 1, y: 0 } : commandDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.22, delay: commandDone ? 0.1 : 0 }}>
                    <Role>{selectedProject.role}</Role>
                  </StaggerBlock>
                  <StaggerBlock initial={false} animate={reduced ? { opacity: 1, y: 0 } : commandDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ duration: 0.24, delay: commandDone ? 0.14 : 0 }}>
                    <BulletList>
                      {bullets.map((item) => (
                        <Bullet key={item}>
                          <span>{item}</span>
                        </Bullet>
                      ))}
                    </BulletList>
                  </StaggerBlock>
                  <StaggerBlock initial={false} animate={reduced ? { opacity: 1, y: 0 } : commandDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.22, delay: commandDone ? 0.2 : 0 }}>
                    <Tags>
                      {selectedProject.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </Tags>
                  </StaggerBlock>
                  <StaggerBlock initial={false} animate={reduced ? { opacity: 1, y: 0 } : commandDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.22, delay: commandDone ? 0.24 : 0 }}>
                    <Footer>
                      {selectedProject.link ? <ProjectLink href={selectedProject.link} target="_blank" rel="noreferrer">{content.projects.openProject} ↗</ProjectLink> : <span />}
                    </Footer>
                  </StaggerBlock>
                </DetailMotion>
              </AnimatePresence>
            </ShellBody>
          </Shell>
        </Layout>
      </WorkContainer>
    </WorkSection>
  );
}
