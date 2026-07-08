import styled from "styled-components";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";

const List = styled.div`
  display: grid; gap: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.line};
`;

const Item = styled.div`
  position: relative; padding: 0 0 40px 32px;
  &::before {
    content: ""; position: absolute; left: -5px; top: 8px;
    width: 9px; height: 9px; border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
  }
  &:last-child { padding-bottom: 8px; }
`;

const Org = styled.h3` font-size: 1.25rem; display: inline; `;
const Role = styled.span` color: ${({ theme }) => theme.colors.body}; font-size: 0.95rem; margin-left: 10px; `;
const Time = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem; color: ${({ theme }) => theme.colors.accent};
  margin: 6px 0 8px;
`;
const Note = styled.p` max-width: 640px; font-size: 0.95rem; `;

export function Experience() {
  const { t } = useLang();
  return (
    <Section id="experience">
      <Container>
        <SectionHeading index="04" title={t.experience.title} />
        <List>
          {t.experience.items.map((e) => (
            <Item key={e.org}>
              <Org>{e.org}</Org>
              <Role>{e.role}</Role>
              <Time>{e.time}</Time>
              <Note>{e.note}</Note>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
}
