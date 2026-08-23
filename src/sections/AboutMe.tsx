import styled from "styled-components";
import { Section, SectionAnchor, SectionHeading } from "@/components/layout";
import { content } from "@/content";

const AboutAnchor = styled(SectionAnchor)`
  scroll-margin-top: 20px;
`;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(280px, 0.82fr);
  gap: 26px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Body = styled.div`
  display: grid;
  gap: 0;
  align-content: start;
  font-size: 1.06rem;
`;

const SideColumn = styled.div`
  display: grid;
  gap: 16px;
  align-content: start;
`;

const Panel = styled.aside`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const IntroCard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 20px;
  align-items: start;
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 28px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.08), transparent 36%), linear-gradient(135deg, rgba(255, 255, 255, 0.04), transparent 48%);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 48px ${({ theme }) => theme.colors.shadow};
    border-color: rgba(255, 255, 255, 0.18);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    justify-items: start;
  }
`;

const IntroTop = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 20px;
  align-items: start;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const IntroRail = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.04) 100%);
`;

const Avatar = styled.img`
  width: 104px;
  height: 104px;
  object-fit: cover;
  border-radius: 28px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  box-shadow: 0 12px 26px ${({ theme }) => theme.colors.shadow};
`;

const IntroMeta = styled.div`
  display: grid;
  gap: 8px;
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const IntroName = styled.h3`
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  line-height: 1;
`;

const IntroLead = styled.p`
  max-width: 34ch;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.55;
  font-size: 0.98rem;
`;

const IntroBody = styled.div`
  grid-column: 1 / -1;
  padding-top: 4px;

  p + p {
    margin-top: 16px;
  }
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

const FactLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  overflow-wrap: anywhere;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
`;

export function AboutMe() {
  const avatarSrc = `${import.meta.env.BASE_URL}profile.jpg`;

  return (
    <Section>
      <AboutAnchor id="about">
        <SectionHeading index="02" title={content.about.title} description={content.about.description} />
        <Wrap>
          <Body>
            <IntroCard>
              <IntroRail aria-hidden="true" />
              <IntroTop>
                <Avatar src={avatarSrc} alt={content.hero.name} />
                <IntroMeta>
                  <Eyebrow>Software Engineer</Eyebrow>
                  <IntroName>{content.hero.name}</IntroName>
                  <IntroLead>Backend-heavy engineer focused on practical systems, clean product thinking, and workflows that stay fast under real use.</IntroLead>
                </IntroMeta>
              </IntroTop>
              <IntroBody>
                {content.about.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </IntroBody>
            </IntroCard>
          </Body>
          <SideColumn>
            <Panel>
              {content.about.facts.map((fact) => (
                <Fact key={fact.label}>
                  <FactLabel>{fact.label}</FactLabel>
                  <FactValue>{fact.value}</FactValue>
                </Fact>
              ))}
              <Fact>
                <FactLabel>{content.contact.title}</FactLabel>
                <FactValue>
                  <FactLink href={`mailto:${content.contact.email}`}>{content.contact.email}</FactLink>
                </FactValue>
              </Fact>
            </Panel>
          </SideColumn>
        </Wrap>
      </AboutAnchor>
    </Section>
  );
}
