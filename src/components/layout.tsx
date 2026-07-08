import styled from "styled-components";

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 24px;
`;

export const Section = styled.section`
  padding-top: ${({ theme }) => theme.sectionGap};
  &:last-of-type { padding-bottom: ${({ theme }) => theme.sectionGap}; }
`;

const HeadingWrap = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  padding-bottom: 16px;
`;

const Index = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.1em;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.6rem);
`;

export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <HeadingWrap>
      <Index>{index} —</Index>
      <Title>{title}</Title>
    </HeadingWrap>
  );
}
