import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";

const root = resolve(__dirname, "..");

describe("site branding metadata", () => {
  test("uses Kane tab metadata instead of the default React branding", () => {
    const html = readFileSync(resolve(root, "index.html"), "utf8");
    const manifest = readFileSync(resolve(root, "public/manifest.json"), "utf8");

    expect(html).toContain("<title>Kane - Fullstack Developer</title>");
    expect(html).toContain('content="Kane - Fullstack developer building useful B2B products and keyboard-first workflows."');
    expect(html).toContain('href="/favicon.svg"');

    expect(manifest).toContain('"short_name": "Kane"');
    expect(manifest).toContain('"name": "Kane Portfolio"');
    expect(manifest).not.toContain("React App");
    expect(manifest).not.toContain("Create React App Sample");
  });
});
