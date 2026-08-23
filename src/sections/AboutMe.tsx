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
  gap: 20px;
  align-content: start;
  font-size: 1.06rem;
`;

const IntroShell = styled.div`
  position: relative;
  display: grid;
  gap: 16px;
`;

const SideColumn = styled.div`
  display: grid;
  gap: 16px;
  align-content: start;
`;

const BodyCard = styled.div`
  padding: 22px 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.04), transparent 42%);
    pointer-events: none;
  }

  p + p {
    margin-top: 16px;
  }
`;

const Panel = styled.aside`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const ContactPanel = styled(Panel)`
  display: grid;
  gap: 14px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.06), transparent 36%);
    pointer-events: none;
  }
`;

const ContactEyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const ContactBlurb = styled.p`
  color: ${({ theme }) => theme.colors.body};
  line-height: 1.7;
`;

const ContactEmail = styled.a`
  width: fit-content;
  max-width: 100%;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(1rem, 2.2vw, 1.55rem);
  line-height: 1.12;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.025em;
  overflow-wrap: anywhere;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 13px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.surfaceSoft};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const ContactFoot = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
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
  gap: 10px;
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
  max-width: 46ch;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
  font-size: 1rem;
`;

const IntroRole = styled.p`
  color: ${({ theme }) => theme.colors.body};
  line-height: 1.7;
`;

const FocusRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FocusPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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

export function AboutMe() {
  const avatarSrc = `${import.meta.env.BASE_URL}profile.jpg`;

  return (
    <Section>
      <AboutAnchor id="about">
        <SectionHeading index="02" title={content.about.title} description={content.about.description} />
        <Wrap>
          <Body>
            <IntroShell>
              <IntroCard>
                <IntroRail aria-hidden="true" />
                <Avatar src={avatarSrc} alt={content.hero.name} />
                <IntroMeta>
                  <Eyebrow>Software Engineer</Eyebrow>
                  <IntroName>{content.hero.name}</IntroName>
                  <IntroLead>Backend-heavy product work, practical system design, and a workflow that stays fast under real use.</IntroLead>
                  <IntroRole>I spend most of my time around Java and Spring, while actively growing into Go and Python without losing the frontend and product sense needed to ship complete work.</IntroRole>
                  <FocusRow aria-label="Current focus">
                    <FocusPill>Java</FocusPill>
                    <FocusPill>Spring Boot</FocusPill>
                    <FocusPill>Go</FocusPill>
                    <FocusPill>Python</FocusPill>
                    <FocusPill>React</FocusPill>
                  </FocusRow>
                </IntroMeta>
              </IntroCard>
            </IntroShell>
            <BodyCard>
              {content.about.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </BodyCard>
          </Body>
          <SideColumn>
            <Panel>
              {content.about.facts.map((fact) => (
                <Fact key={fact.label}>
                  <FactLabel>{fact.label}</FactLabel>
                  <FactValue>{fact.value}</FactValue>
                </Fact>
              ))}
            </Panel>
            <ContactPanel>
              <ContactEyebrow>{content.contact.title}</ContactEyebrow>
              <ContactBlurb>{content.contact.blurb}</ContactBlurb>
              <ContactEmail href={`mailto:${content.contact.email}`}>{content.contact.email}</ContactEmail>
              <ContactLinks>
                <ContactLink href="https://github.com/LDKhangg" target="_blank" rel="noreferrer">GitHub</ContactLink>
                <ContactLink href="https://www.linkedin.com/in/kane06092004/" target="_blank" rel="noreferrer">LinkedIn</ContactLink>
              </ContactLinks>
              <ContactFoot>{content.contact.footer}</ContactFoot>
            </ContactPanel>
          </SideColumn>
        </Wrap>
      </AboutAnchor>
    </Section>
  );
}
