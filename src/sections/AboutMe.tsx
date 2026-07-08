import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Body = styled.div`
  max-width: 680px;
  display: grid; gap: 20px;
  font-size: 1.02rem;
`;

export function AboutMe() {
  const { t } = useLang();
  return (
    <Section id="about">
      <Container>
        <SectionHeading index="02" title={t.about.title} />
        <Body>
          {t.about.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Body>
      </Container>
    </Section>
  );
}
