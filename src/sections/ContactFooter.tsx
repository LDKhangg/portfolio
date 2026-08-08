import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Blurb = styled.p`
  max-width: 560px;
  font-size: 1.05rem;
  margin-bottom: 24px;
`;

const Email = styled.a`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(2rem, 6vw, 4rem);
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.06em;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
`;

const Foot = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 32px 0 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export function ContactFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <Section id="contact">
      <Container>
        <SectionHeading index="07" title={t.contact.title} description={t.contact.description} />
        <Blurb>{t.contact.blurb}</Blurb>
        <Email href={`mailto:${t.contact.email}`}>{t.contact.email}</Email>
        <Foot>
          <span>© {year} {t.hero.name}</span>
          <span>
            <a href="https://github.com/LDKhangg" target="_blank" rel="noreferrer">GitHub</a>
            {" · "}
            <a href="https://www.linkedin.com/in/kane06092004/" target="_blank" rel="noreferrer">LinkedIn</a>
          </span>
          <span>{t.contact.footer}</span>
        </Foot>
      </Container>
    </Section>
  );
}
