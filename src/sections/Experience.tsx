import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { content } from "@/content";

const List = styled.div`
  display: grid;
  gap: 16px;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 24px;
  padding: 24px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const Org = styled.h3`
  font-size: 1.2rem;
`;

const Role = styled.span`
  color: ${({ theme }) => theme.colors.body};
  font-size: 0.95rem;
  margin-left: 10px;
`;

const Time = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const Note = styled.p`
  max-width: 640px;
  font-size: 1rem;
  margin-top: 10px;
`;

export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <SectionHeading index="05" title={content.experience.title} description={content.experience.description} />
        <List>
          {content.experience.items.map((e) => (
            <Item key={e.org}>
              <Time>{e.time}</Time>
              <div>
                <Org>{e.org}<Role>{e.role}</Role></Org>
                <Note>{e.note}</Note>
              </div>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
}
