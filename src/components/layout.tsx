import styled from "styled-components";
import DepthText from "./DepthText";

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 640px) {
    padding: 0 18px;
  }
`;

export const SectionAnchor = styled(Container)`
  scroll-margin-top: 72px;
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
  display: inline-block;
  width: fit-content;
  font-size: clamp(2rem, 4.6vw, 4rem);
  line-height: 0.92;
`;

const TitleDepthWrap = styled.span`
  display: inline-block;
  width: fit-content;
  max-width: 100%;

  .depth-text__face,
  .depth-text__layer {
    font-family: ${({ theme }) => theme.fonts.sans};
  }

  @media (max-width: 640px) {
    transform: scale(0.98);
    transform-origin: left center;
  }
`;

const Description = styled.p`
  max-width: 60ch;
  font-size: 1.05rem;
`;

export function SectionHeading({ index, title, description }: { index: string; title: string; description?: string }) {
  return (
    <HeadingWrap>
      <Index>{index}</Index>
      <Title>
        <TitleDepthWrap>
          <DepthText
            text={title}
            layers={18}
            depth={1.2}
            faceColor="#f3f5fb"
            depthColor="rgba(215, 211, 227, 0.42)"
            tilt={3.8}
            pointerTracking={false}
            smoothing={0.12}
            perspective={760}
            autoOrbit={false}
            orbitSpeed={0}
            fontSize="clamp(2rem, 4.6vw, 4rem)"
            fontWeight={850}
            shadow
          />
        </TitleDepthWrap>
      </Title>
      {description ? <Description>{description}</Description> : null}
    </HeadingWrap>
  );
}
