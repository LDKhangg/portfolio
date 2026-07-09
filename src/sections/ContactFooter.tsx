import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Blurb = styled.p` max-width: 560px; font-size: 1.05rem; margin-bottom: 24px; `;

const Email = styled.a`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  color: ${({ theme }) => theme.colors.text};
  &:hover { color: ${({ theme }) => theme.colors.accent}; text-decoration: none; }
`;

const Stats = styled.div`
  display: flex; gap: 16px; flex-wrap: wrap; margin: 48px 0;
  img { max-width: 100%; border: 1px solid ${({ theme }) => theme.colors.line}; border-radius: 6px; }
`;

const Foot = styled.footer`
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  padding: 32px 0 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
`;

const STATS =
  "https://github-readme-stats.vercel.app/api?username=LDKhangg&show_icons=true&hide_border=true&bg_color=12161C&text_color=94A3B8&title_color=E2E8F0&icon_color=7DD3FC";
const LANGS =
  "https://github-readme-stats.vercel.app/api/top-langs/?username=LDKhangg&layout=compact&hide_border=true&bg_color=12161C&text_color=94A3B8&title_color=E2E8F0";

export function ContactFooter() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <Section id="contact">
      <Container>
        <SectionHeading index="06" title={t.contact.title} />
        <Blurb>{t.contact.blurb}</Blurb>
        <Email href={`mailto:${t.contact.email}`}>{t.contact.email}</Email>
        <Stats>
          <img src={STATS} alt={t.contact.statsAlt} loading="lazy" height={165} />
          <img src={LANGS} alt={t.contact.langsAlt} loading="lazy" height={165} />
        </Stats>
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
