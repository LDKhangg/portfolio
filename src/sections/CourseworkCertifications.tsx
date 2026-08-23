import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { content } from "@/content";

const Grid = styled.div`
  display: grid;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Name = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const Detail = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.body};
  white-space: nowrap;
`;

export function CourseworkCertifications() {
  return (
    <Section>
      <Container>
        <SectionHeading index="06" title={content.certs.title} description={content.certs.description} />
        <Grid>
          {content.certs.items.map((c) => (
            <Row key={c.name}>
              <Name>{c.name}</Name>
              <Detail>{c.detail}</Detail>
            </Row>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
