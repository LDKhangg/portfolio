import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/layout";
import { useLang } from "@/i18n";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CONTRIBUTION_GRAPH_URL = "https://ghchart.rshah.org/007AFF/LDKhangg";
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
  latestUpdate: {
    repo: string;
    repoLabel: string;
    url: string;
    message: string;
    pushedAt: string;
    relativeRepo: string;
    available: boolean;
  };
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
  latestUpdate: {
    repo: "",
    repoLabel: "",
    url: "https://github.com/LDKhangg",
    message: "",
    pushedAt: "",
    relativeRepo: "",
    available: false,
  },
};

const Shell = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 18px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const MainStack = styled.div`
  display: grid;
  gap: 18px;
`;

const Panel = styled(motion.article)`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 30px;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.surface} 0%, ${({ theme }) => theme.colors.surfaceSoft} 100%);
  box-shadow: 0 18px 40px ${({ theme }) => theme.colors.shadow};
`;

const ProgressPanel = styled(Panel)`
  padding: 24px;
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
  gap: 24px;
  align-items: center;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const LatestPanel = styled(Panel)`
  padding: 24px;
  display: grid;
  gap: 14px;
  align-content: start;
`;

const GraphPanel = styled(Panel)`
  padding: 24px;
  display: grid;
  gap: 18px;
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

const GaugeSvg = styled.svg`
  width: min(100%, 280px);
  height: auto;
  overflow: visible;
`;

const CenterCopy = styled.div`
  display: grid;
  justify-items: center;
  gap: 6px;
`;

const Total = styled.div`
  font-size: clamp(2.6rem, 5vw, 4rem);
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
  gap: 14px;
`;

const LabelBlock = styled.div`
  display: grid;
  gap: 8px;
`;

const ProgressNote = styled.p`
  max-width: 36ch;
`;

const GraphFrame = styled.a`
  display: block;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(247, 247, 244, 0.96) 100%);
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const GraphMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const GraphImg = styled.img`
  width: 100%;
  display: block;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
`;

const Breakdown = styled.div`
  display: grid;
  gap: 10px;
`;

const BreakdownRow = styled.div`
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) auto;
  gap: 12px;
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
  height: 10px;
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
  font-size: 1rem;
  line-height: 1.75;
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

const Action = styled.a`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const FooterLine = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.body};
`;

function formatDate(value: string, locale: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function ringOffsets(total: number, easy: number, medium: number, hard: number) {
  const circumference = 2 * Math.PI * 84;
  const safeTotal = Math.max(total, 1);
  const easyLength = (easy / safeTotal) * circumference;
  const mediumLength = (medium / safeTotal) * circumference;
  const hardLength = (hard / safeTotal) * circumference;

  return {
    circumference,
    easyLength,
    mediumLength,
    hardLength,
    mediumOffset: circumference - easyLength,
    hardOffset: circumference - easyLength - mediumLength,
  };
}

export function CodingActivity() {
  const { lang, t } = useLang();
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
  const latest = data.latestUpdate;
  const maxBucket = Math.max(easy, medium, hard, 1);
  const ring = ringOffsets(totalSolved, easy, medium, hard);
  const progressStateLabel = status === "loading"
    ? t.activity.loadingLabel
    : status === "error"
      ? t.activity.unavailableLabel
      : t.activity.solvedLabel;

  return (
    <Section id="activity">
      <Container>
        <SectionHeading index="04" title={t.activity.title} description={t.activity.description} />
        <Shell>
          <MainStack>
            <ProgressPanel
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <GaugeWrap href={repoUrl} target="_blank" rel="noreferrer">
                <GaugeSvg viewBox="0 0 220 220" aria-hidden="true">
                  <circle cx="110" cy="110" r="84" fill="none" stroke="rgba(16, 19, 24, 0.08)" strokeWidth="20" />
                  <circle
                    cx="110"
                    cy="110"
                    r="84"
                    fill="none"
                    stroke="#67C587"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${ring.easyLength} ${ring.circumference}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 110 110)"
                  />
                  <circle
                    cx="110"
                    cy="110"
                    r="84"
                    fill="none"
                    stroke="#E7B44C"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${ring.mediumLength} ${ring.circumference}`}
                    strokeDashoffset={ring.mediumOffset}
                    transform="rotate(-90 110 110)"
                  />
                  <circle
                    cx="110"
                    cy="110"
                    r="84"
                    fill="none"
                    stroke="#D96262"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${ring.hardLength} ${ring.circumference}`}
                    strokeDashoffset={ring.hardOffset}
                    transform="rotate(-90 110 110)"
                  />
                  <foreignObject x="42" y="58" width="136" height="106">
                    <CenterCopy>
                      <Total>{status === "ready" ? totalSolved : "--"}</Total>
                      <Unit>{progressStateLabel}</Unit>
                    </CenterCopy>
                  </foreignObject>
                </GaugeSvg>
              </GaugeWrap>

              <ProgressMeta>
                <LabelBlock>
                  <Kicker>{t.activity.progressLabel}</Kicker>
                  <ProgressNote>{t.activity.progressNote}</ProgressNote>
                </LabelBlock>
                <Breakdown>
                  <BreakdownRow>
                    <BreakdownLabel>{t.activity.easyLabel}</BreakdownLabel>
                    <BreakdownBar $color="#67C587" $width={status === "ready" ? (easy / maxBucket) * 100 : 0} />
                    <BreakdownValue>{status === "ready" ? easy : "--"}</BreakdownValue>
                  </BreakdownRow>
                  <BreakdownRow>
                    <BreakdownLabel>{t.activity.mediumLabel}</BreakdownLabel>
                    <BreakdownBar $color="#E7B44C" $width={status === "ready" ? (medium / maxBucket) * 100 : 0} />
                    <BreakdownValue>{status === "ready" ? medium : "--"}</BreakdownValue>
                  </BreakdownRow>
                  <BreakdownRow>
                    <BreakdownLabel>{t.activity.hardLabel}</BreakdownLabel>
                    <BreakdownBar $color="#D96262" $width={status === "ready" ? (hard / maxBucket) * 100 : 0} />
                    <BreakdownValue>{status === "ready" ? hard : "--"}</BreakdownValue>
                  </BreakdownRow>
                </Breakdown>
                <FooterLine>
                  {t.activity.refreshed} · {status === "ready" ? formatDate(data.generatedAt, lang) : status === "loading" ? t.activity.loadingLabel : t.activity.unavailableLabel}
                </FooterLine>
              </ProgressMeta>
            </ProgressPanel>

            <GraphPanel
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <LabelBlock>
                <Kicker>{t.activity.contributionLabel}</Kicker>
                <ProgressNote>{t.activity.contributionNote}</ProgressNote>
              </LabelBlock>
              <GraphFrame href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
                <GraphMeta>
                  <span>LDKhangg</span>
                  <span>{t.activity.contributionAction}</span>
                </GraphMeta>
                <GraphImg src={CONTRIBUTION_GRAPH_URL} alt={t.activity.contributionAlt} loading="lazy" />
              </GraphFrame>
            </GraphPanel>
          </MainStack>

          <LatestPanel
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Kicker>{t.activity.latestLabel}</Kicker>
            <UpdateMessage>
              {status === "loading"
                ? t.activity.loadingLabel
                : latest.available && latest.message
                  ? latest.message
                  : t.activity.unavailableLabel}
            </UpdateMessage>
            <RepoLine>
              <span>{t.activity.repositoryLabel}</span>
              <span>{status === "loading" ? t.activity.loadingLabel : latest.available ? latest.repoLabel || latest.relativeRepo : t.activity.unavailableLabel}</span>
            </RepoLine>
            <RepoLine>
              <span>{t.activity.updatedLabel}</span>
              <span>{status === "loading" ? t.activity.loadingLabel : latest.available ? formatDate(latest.pushedAt, lang) : t.activity.unavailableLabel}</span>
            </RepoLine>
            <UpdateMessage>{t.activity.latestNote}</UpdateMessage>
            {status === "ready" && latest.available ? (
              <Action href={latest.url} target="_blank" rel="noreferrer">
                {t.activity.latestAction} ↗
              </Action>
            ) : null}
          </LatestPanel>
        </Shell>
      </Container>
    </Section>
  );
}
