import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  base: "/portfolio/", // GitHub Pages project site: served at ldkhangg.github.io/portfolio/
  plugins: [react(), svgr()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    environment: "jsdom",
    globals: true,
  },
} as never);
