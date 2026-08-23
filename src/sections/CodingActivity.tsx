import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import { Container, Section, SectionAnchor, SectionHeading } from "@/components/layout";
import { content } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CONTRIBUTION_GRAPH_URL = "https://ghchart.rshah.org/6f6a82/LDKhangg";
const GITHUB_PROFILE_URL = "https://github.com/LDKhangg";

type ActivityData = {
  generatedAt: string;
  leetcodeProgress: {
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    repoUrl: string;
  };
  latestUpdates: {
    repo: string;
    repoLabel: string;
    url: string;
    message: string;
    pushedAt: string;
    relativeRepo: string;
    available: boolean;
  }[];
};

const FALLBACK: ActivityData = {
  generatedAt: "",
  leetcodeProgress: {
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    repoUrl: "https://github.com/LDKhangg/leetcode",
  },
  latestUpdates: [],
};

const Shell = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 14px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const MainStack = styled.div`
  display: grid;
  gap: 14px;
`;

const ActivityAnchor = styled(SectionAnchor)`
  scroll-margin-top: 96px;
`;

const Panel = styled(motion.article)`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 26px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const ProgressPanel = styled(Panel)`
  padding: 8px 20px;
  display: grid;
  grid-template-columns: minmax(184px, 248px) minmax(0, 1fr);
  gap: 14px;
  align-items: center;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const LatestPanel = styled(Panel)`
  padding: 20px;
  display: grid;
  gap: 12px;
  align-content: start;
`;

const UpdatesList = styled.div`
  display: grid;
  gap: 10px;
`;

const UpdateItem = styled.a`
  display: grid;
  gap: 8px;
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surface};
  color: inherit;

  &:hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const GraphPanel = styled(Panel)`
  padding: 14px 20px 20px;
  display: grid;
  gap: 14px;
`;

const GraphCopy = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const GraphAside = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const Kicker = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const GaugeWrap = styled.a`
  display: grid;
  place-items: center;
  text-decoration: none;
  color: inherit;
`;

const GaugeVisual = styled.div`
  position: relative;
  width: min(100%, 208px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
`;

const CenterCopy = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 6px;
`;

const GaugeRing = styled.div<{ $gradient: string }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: ${({ $gradient }) => $gradient};

  &::after {
    content: "";
    position: absolute;
    inset: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.line};
  }
`;

const Total = styled.div`
  font-size: clamp(1.9rem, 3.8vw, 2.9rem);
  line-height: 0.9;
  letter-spacing: -0.08em;
`;

const Unit = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const ProgressMeta = styled.div`
  display: grid;
  gap: 10px;
`;

const LabelBlock = styled.div`
  display: grid;
  gap: 4px;
`;

const ProgressNote = styled.p`
  margin: 0;
  max-width: 32ch;
  font-size: 0.98rem;
  line-height: 1.55;
`;

const GraphFrame = styled.a`
  display: block;
  padding: 16px 16px 12px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(250, 249, 252, 0.98) 0%, rgba(236, 232, 244, 0.98) 100%);
  color: inherit;
  overflow-x: auto;
  overflow-y: hidden;

  &:hover {
    text-decoration: none;
  }
`;

const GraphScroll = styled.div`
  min-width: 620px;
`;

const GraphMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(73, 69, 89, 0.78);

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const GraphImg = styled.img`
  width: 100%;
  min-width: 620px;
  display: block;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: inset 0 0 0 1px rgba(73, 69, 89, 0.08);
`;

const Breakdown = styled.div`
  display: grid;
  gap: 8px;
`;

const BreakdownRow = styled.div`
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;

  @media (max-width: 520px) {
    grid-template-columns: 86px minmax(0, 1fr) auto;
  }
`;

const BreakdownLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const BreakdownBar = styled.span<{ $color: string; $width: number }>`
  height: 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bg1};
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    width: ${({ $width }) => `${$width}%`};
    min-width: ${({ $width }) => ($width > 0 ? "10px" : "0")};
    height: 100%;
    border-radius: inherit;
    background: ${({ $color }) => $color};
  }
`;

const BreakdownValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.text};
`;

const UpdateMessage = styled.p`
  font-size: 0.92rem;
  line-height: 1.55;
`;

const UpdateTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const RepoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(255, 255, 255, 0.04);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const DateBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const CommitMessage = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};
`;

const RepoLine = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

const FooterLine = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

function formatDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function allocateSegments(values: number[], total: number, minVisible: number, full: number) {
  const safeTotal = Math.max(total, 1);
  const rawLengths = values.map((value) => (value / safeTotal) * full);
  const nonZeroIndexes = rawLengths
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value > 0)
    .map(({ index }) => index);

  let lengths = [...rawLengths];

  if (nonZeroIndexes.length > 0) {
    const boosted = nonZeroIndexes.filter((index) => lengths[index] < minVisible);

    if (boosted.length > 0) {
      let extraNeeded = 0;
      for (const index of boosted) {
        extraNeeded += minVisible - lengths[index];
        lengths[index] = minVisible;
      }

      const shrinkable = nonZeroIndexes.filter((index) => !boosted.includes(index));
      const shrinkableTotal = shrinkable.reduce((sum, index) => sum + lengths[index], 0);

      if (shrinkableTotal > 0) {
        for (const index of shrinkable) {
          const ratio = lengths[index] / shrinkableTotal;
          lengths[index] = Math.max(minVisible, lengths[index] - extraNeeded * ratio);
        }
      }
    }
  }

  return lengths;
}

function ringGradient(total: number, easy: number, medium: number, hard: number) {
  const [easyDeg, mediumDeg, hardDeg] = allocateSegments([easy, medium, hard], total, 10, 360);
  const easyEnd = easyDeg;
  const mediumEnd = easyEnd + mediumDeg;
  const hardEnd = mediumEnd + hardDeg;

  return `conic-gradient(from -90deg, #67C587 0deg ${easyEnd}deg, #E7B44C ${easyEnd}deg ${mediumEnd}deg, #D96262 ${mediumEnd}deg ${hardEnd}deg, rgba(16, 19, 24, 0.08) ${hardEnd}deg 360deg)`;
}

export function CodingActivity() {
  const reduced = useReducedMotion();
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    const activityPath = `${import.meta.env.BASE_URL}activity.json`;

    fetch(activityPath, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load activity data"))))
      .then((data: ActivityData) => {
        if (active) {
          setActivity(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (active) {
          setActivity(null);
          setStatus("error");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const data = activity ?? FALLBACK;
  const { totalSolved, easy, medium, hard, repoUrl } = data.leetcodeProgress;
  const latestUpdates = data.latestUpdates;
  const maxBucket = Math.max(easy, medium, hard, 1);
  const ring = ringGradient(totalSolved, easy, medium, hard);
  const progressStateLabel = status === "loading"
    ? content.activity.loadingLabel
    : status === "error"
      ? content.activity.unavailableLabel
      : content.activity.solvedLabel;

  return (
    <Section>
      <ActivityAnchor id="activity">
        <SectionHeading index="04" title={content.activity.title} description={content.activity.description} />
        <Shell>
          <MainStack>
            <ProgressPanel
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <GaugeWrap href={repoUrl} target="_blank" rel="noreferrer">
                <GaugeVisual aria-hidden="true">
                  <GaugeRing $gradient={ring} />
                  <div>
                    <CenterCopy>
                      <Total>{status === "ready" ? totalSolved : "--"}</Total>
                      <Unit>{progressStateLabel}</Unit>
                    </CenterCopy>
                  </div>
                </GaugeVisual>
              </GaugeWrap>

              <ProgressMeta>
                <LabelBlock>
                  <Kicker>{content.activity.progressLabel}</Kicker>
                  <ProgressNote>{content.activity.progressNote}</ProgressNote>
                </LabelBlock>
                <Breakdown>
                  <BreakdownRow>
                    <BreakdownLabel>{content.activity.easyLabel}</BreakdownLabel>
                    <BreakdownBar $color="#67C587" $width={status === "ready" ? (easy / maxBucket) * 100 : 0} />
                    <BreakdownValue>{status === "ready" ? easy : "--"}</BreakdownValue>
                  </BreakdownRow>
                  <BreakdownRow>
                    <BreakdownLabel>{content.activity.mediumLabel}</BreakdownLabel>
                    <BreakdownBar $color="#E7B44C" $width={status === "ready" ? (medium / maxBucket) * 100 : 0} />
                    <BreakdownValue>{status === "ready" ? medium : "--"}</BreakdownValue>
                  </BreakdownRow>
                  <BreakdownRow>
                    <BreakdownLabel>{content.activity.hardLabel}</BreakdownLabel>
                    <BreakdownBar $color="#D96262" $width={status === "ready" ? (hard / maxBucket) * 100 : 0} />
                    <BreakdownValue>{status === "ready" ? hard : "--"}</BreakdownValue>
                  </BreakdownRow>
                </Breakdown>
                <FooterLine>
                  {content.activity.refreshed} · {status === "ready" ? formatDate(data.generatedAt) : status === "loading" ? content.activity.loadingLabel : content.activity.unavailableLabel}
                </FooterLine>
              </ProgressMeta>
            </ProgressPanel>

            <GraphPanel
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <GraphCopy>
                <LabelBlock>
                  <Kicker>{content.activity.contributionLabel}</Kicker>
                  <ProgressNote>{content.activity.contributionNote}</ProgressNote>
                </LabelBlock>
                <GraphAside>{status === "ready" ? `Snapshot ${formatDate(data.generatedAt)}` : content.activity.loadingLabel}</GraphAside>
              </GraphCopy>
              <GraphFrame href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
                <GraphScroll>
                  <GraphMeta>
                    <span>LDKhangg</span>
                    <span>{content.activity.contributionAction}</span>
                  </GraphMeta>
                  <GraphImg src={CONTRIBUTION_GRAPH_URL} alt={content.activity.contributionAlt} loading="lazy" />
                </GraphScroll>
              </GraphFrame>
            </GraphPanel>
          </MainStack>

          <LatestPanel
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Kicker>{content.activity.latestLabel}</Kicker>
            <UpdateMessage>{content.activity.latestNote}</UpdateMessage>
            {status === "loading" ? <UpdateMessage>{content.activity.loadingLabel}</UpdateMessage> : null}
            {status === "error" ? <UpdateMessage>{content.activity.unavailableLabel}</UpdateMessage> : null}
            {status === "ready" ? (
              latestUpdates.length > 0 ? <UpdatesList>
                {latestUpdates.slice(0, 4).map((update) => (
                  <UpdateItem key={`${update.repo}-${update.pushedAt}`} href={update.url} target="_blank" rel="noreferrer">
                    <UpdateTop>
                      <RepoBadge>{update.repoLabel || update.relativeRepo}</RepoBadge>
                      <DateBadge>{formatDate(update.pushedAt)}</DateBadge>
                    </UpdateTop>
                    <CommitMessage>{update.message}</CommitMessage>
                    <RepoLine>
                      <span>{content.activity.latestListLabel}</span>
                      <span>{content.activity.latestAction} ↗</span>
                    </RepoLine>
                  </UpdateItem>
                ))}
              </UpdatesList> : <UpdateMessage>{content.activity.unavailableLabel}</UpdateMessage>
            ) : null}
          </LatestPanel>
        </Shell>
      </ActivityAnchor>
    </Section>
  );
}
