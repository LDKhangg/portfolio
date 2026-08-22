import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { content } from "@/content";

const Wrap = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Body = styled.div`
  max-width: 680px;
  display: grid;
  gap: 18px;
  align-content: start;
  font-size: 1.06rem;
`;

const IntroCard = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 18px;
  align-items: center;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    justify-items: start;
  }
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

const IntroRole = styled.p`
  color: ${({ theme }) => theme.colors.body};
  line-height: 1.7;
`;

const Panel = styled.aside`
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
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
    <Section id="about">
      <Container>
        <SectionHeading index="02" title={content.about.title} description={content.about.description} />
        <Wrap>
          <Body>
            <IntroCard>
              <Avatar src={avatarSrc} alt={content.hero.name} />
              <IntroMeta>
                <Eyebrow>{content.hero.greeting}</Eyebrow>
                <IntroName>{content.hero.name}</IntroName>
                <IntroRole>Fullstack developer focused on backend-heavy systems, practical product work, and clean keyboard-first workflows.</IntroRole>
              </IntroMeta>
            </IntroCard>
            {content.about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Body>
          <Panel>
            {content.about.facts.map((fact) => (
              <Fact key={fact.label}>
                <FactLabel>{fact.label}</FactLabel>
                <FactValue>{fact.value}</FactValue>
              </Fact>
            ))}
          </Panel>
        </Wrap>
      </Container>
    </Section>
  );
}
