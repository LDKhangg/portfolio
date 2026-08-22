import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { content } from "@/content";

const NAV_ITEMS = [
  { id: "work", label: content.nav.work },
  { id: "about", label: content.nav.about, className: "hide-sm hide-md" },
  { id: "config", label: content.nav.config, className: "hide-sm hide-md" },
  { id: "skills", label: content.nav.skills, className: "hide-sm hide-md" },
  { id: "experience", label: content.nav.experience, className: "hide-sm hide-md" },
  { id: "contact", label: content.nav.contact },
] as const;

const Bar = styled.header`
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding: 10px 10px 0;
`;

const Inner = styled.nav`
  width: fit-content;
  max-width: calc(100vw - 24px);
  pointer-events: auto;
  padding: 8px 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(84, 80, 101, 0.82) 0%, rgba(58, 55, 72, 0.9) 100%);
  backdrop-filter: blur(12px) saturate(165%);
  box-shadow: 0 12px 28px rgba(7, 8, 12, 0.28);

  @media (max-width: 640px) {
    padding: 10px 12px;
  }
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: rgba(248, 250, 255, 0.96);

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Wordmark = styled.span`
  line-height: 1;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(248, 250, 255, 0.96);

  @media (max-width: 640px) {
    display: none;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 920px) { a.hide-md { display: none; } }
  @media (max-width: 640px) { gap: 12px; a.hide-sm { display: none; } }
`;

const NavLink = styled.a<{ $active: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 999px;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : "rgba(241, 243, 250, 0.82)")};
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.12)" : "transparent")};
  box-shadow: ${({ $active }) => ($active ? "inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 6px 18px rgba(7, 8, 12, 0.14)" : "none")};
  transition: color 160ms ease, background-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255, 255, 255, 0.12);
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.accent}, 0 0 0 3px rgba(215, 211, 227, 0.14);
  }

  ${({ $active, theme }) =>
    $active && css`
      &::after {
        content: "";
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 6px;
        height: 1px;
        border-radius: 999px;
        background: ${theme.colors.accent};
        opacity: 0.95;
      }
    `}
`;

export function Navbar() {
  const avatarSrc = `${import.meta.env.BASE_URL}profile.jpg`;
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  useEffect(() => {
    const updateFromHash = () => {
      const hashId = window.location.hash.replace(/^#/, "");
      if (hashId && sectionIds.includes(hashId)) {
        setActiveId(hashId);
      }
    };

    updateFromHash();

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    for (const section of sections) observer.observe(section);

    window.addEventListener("hashchange", updateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [sectionIds]);

  return (
    <Bar>
      <Inner>
        <Logo href="#top" aria-label="Kane portfolio">
          <Avatar src={avatarSrc} alt="Kane" />
          <Wordmark>Kane</Wordmark>
        </Logo>
        <Links>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              className={item.className}
              $active={activeId === item.id}
              aria-current={activeId === item.id ? "location" : undefined}
            >
              {item.label}
            </NavLink>
          ))}
        </Links>
      </Inner>
    </Bar>
  );
}
