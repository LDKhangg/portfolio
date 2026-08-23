import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { content } from "@/content";

const NAV_ITEMS = [
  { id: "work", label: content.nav.work },
  { id: "about", label: content.nav.about, className: "hide-sm hide-md" },
  { id: "skills", label: content.nav.skills, className: "hide-sm hide-md" },
  { id: "experience", label: content.nav.experience, className: "hide-sm hide-md" },
  { id: "study", label: content.nav.study, className: "hide-sm hide-md" },
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
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0) 42%);
    pointer-events: none;
  }

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
  gap: 7px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : "rgba(241, 243, 250, 0.82)")};
  background: ${({ $active }) => ($active ? "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)" : "transparent")};
  box-shadow: ${({ $active }) => ($active ? "inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 8px 18px rgba(7, 8, 12, 0.16)" : "none")};
  transition: color 180ms ease, background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease, border-color 180ms ease;

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: ${({ $active, theme }) => ($active ? theme.colors.accent : "rgba(255, 255, 255, 0.18)")};
    box-shadow: ${({ $active, theme }) => ($active ? `0 0 0 4px ${theme.colors.line}` : "none")};
    transform: scale(${({ $active }) => ($active ? 1 : 0.72)});
    opacity: ${({ $active }) => ($active ? 1 : 0.72)};
    transition: transform 180ms ease, opacity 180ms ease, background-color 180ms ease, box-shadow 180ms ease;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    border: 1px solid ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.08)" : "transparent")};
    pointer-events: none;
  }

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%);
    transform: translateY(-1px) scale(1.01);

    &::before {
      background: ${({ theme }) => theme.colors.accent};
      opacity: 1;
      transform: scale(1);
    }
  }

  &:focus-visible {
    outline: none;
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255, 255, 255, 0.12);
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.accent}, 0 0 0 3px rgba(215, 211, 227, 0.14);
  }

  ${({ $active }) =>
    $active && css`
      font-weight: 600;
      letter-spacing: 0.14em;
    `}
`;

export function Navbar() {
  const avatarSrc = `${import.meta.env.BASE_URL}profile.jpg`;
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const navHeight = navRef.current?.getBoundingClientRect().height ?? 0;
    const top = window.scrollY + section.getBoundingClientRect().top - navHeight - 18;

    window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActiveId(id);
  };

  useEffect(() => {
    let visibleSections = new Map<string, number>();

    const updateFromHash = () => {
      const hashId = window.location.hash.replace(/^#/, "");
      if (hashId && sectionIds.includes(hashId)) {
        setActiveId(hashId);
      }
    };

    const updateFromScroll = () => {
      const firstSection = document.getElementById(sectionIds[0]);

      if (!firstSection) return;

      const activationY = firstSection.offsetTop - Math.min(window.innerHeight * 0.28, 220);

      if (window.scrollY < activationY) {
        setActiveId(null);
        return;
      }

      const nextActive = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

      if (nextActive) {
        setActiveId(nextActive);
        return;
      }

      const fallback = [...sectionIds].reverse().find((id) => {
        const section = document.getElementById(id);
        return section ? window.scrollY >= section.offsetTop - window.innerHeight * 0.35 : false;
      });

      setActiveId(fallback ?? sectionIds[0]);
    };

    updateFromHash();

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        updateFromScroll();
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    for (const section of sections) observer.observe(section);

    window.addEventListener("hashchange", updateFromHash);
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    updateFromScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [sectionIds]);

  return (
    <Bar>
        <Inner ref={navRef}>
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
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </Links>
      </Inner>
    </Bar>
  );
}
