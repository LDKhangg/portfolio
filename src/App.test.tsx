import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme } from "./theme";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [];
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverMock,
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverMock,
  });

  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({ ok: false, json: async () => ({}) }) as unknown as Promise<Response>
    )
  );
});

function renderApp() {
  return render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

test("surfaces Kane branding and a config section entry point", () => {
  renderApp();

  expect(screen.getAllByText(/kane/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: /config/i }).getAttribute("href")).toBe("#config");
  expect(screen.getByRole("heading", { name: /config/i, level: 2 })).toBeTruthy();
  expect(screen.getByText(/over 1 year of real project experience/i)).toBeTruthy();
  expect(screen.getByText(/learning how to make the editor work for me instead of the other way around/i)).toBeTruthy();
});
