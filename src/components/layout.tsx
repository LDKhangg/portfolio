import styled from "styled-components";

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 640px) {
    padding: 0 18px;
  }
`;

export const Section = styled.section`
  padding-top: ${({ theme }) => theme.sectionGap};
  &:last-of-type { padding-bottom: ${({ theme }) => theme.sectionGap}; }
`;

const HeadingWrap = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 32px;
  max-width: 760px;
`;

const Index = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.24em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4.6vw, 4rem);
  max-width: 12ch;
`;

const Description = styled.p`
  max-width: 60ch;
  font-size: 1.05rem;
`;

export function SectionHeading({ index, title, description }: { index: string; title: string; description?: string }) {
  return (
    <HeadingWrap>
      <Index>{index}</Index>
      <Title>{title}</Title>
      {description ? <Description>{description}</Description> : null}
    </HeadingWrap>
  );
}
