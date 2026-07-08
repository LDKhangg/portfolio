import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLang } from "./LanguageContext";

function Probe() {
  const { lang, toggle, t } = useLang();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="tagline">{t.hero.tagline}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

const renderProbe = () =>
  render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>
  );

beforeEach(() => localStorage.clear());

test("defaults to en and exposes dictionary", () => {
  renderProbe();
  expect(screen.getByTestId("lang").textContent).toBe("en");
  expect(screen.getByTestId("tagline").textContent).toMatch(/Fullstack/);
});

test("toggle switches to vi and persists", () => {
  renderProbe();
  fireEvent.click(screen.getByText("toggle"));
  expect(screen.getByTestId("lang").textContent).toBe("vi");
  expect(localStorage.getItem("ldk-lang")).toBe("vi");
});

test("restores persisted language", () => {
  localStorage.setItem("ldk-lang", "vi");
  renderProbe();
  expect(screen.getByTestId("lang").textContent).toBe("vi");
});
