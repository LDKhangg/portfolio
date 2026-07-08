import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const Row = styled.div`
  display: flex; justify-content: space-between; gap: 16px;
  padding: 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  &:first-of-type { border-top: 1px solid ${({ theme }) => theme.colors.line}; }
`;

const Name = styled.span` color: ${({ theme }) => theme.colors.text}; `;
const Detail = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem; color: ${({ theme }) => theme.colors.body};
  white-space: nowrap;
`;

export function CourseworkCertifications() {
  const { t } = useLang();
  return (
    <Section>
      <Container>
        <SectionHeading index="05" title={t.certs.title} />
        {t.certs.items.map((c) => (
          <Row key={c.name}>
            <Name>{c.name}</Name>
            <Detail>{c.detail}</Detail>
          </Row>
        ))}
      </Container>
    </Section>
  );
}
