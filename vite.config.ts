import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

/** GitHub Pages project site: https://aruljothimoorthy.github.io/Jothi.me/ */
const GITHUB_PAGES_BASE = "/Jothi.me/";

const portfolioRoutes = [
  "/",
  "/about",
  "/projects",
  "/experience",
  "/skills",
  "/certificates",
  "/contact",
] as const;

export default defineConfig({
  base: GITHUB_PAGES_BASE,
  server: {
    port: 3000,
    // Avoid Windows EBUSY crashes when asset files are open or being copied
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
      router: {
        basepath: "/Jothi.me",
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
      },
      pages: portfolioRoutes.map((path) => ({ path })),
    }),
    viteReact(),
    tailwindcss(),
  ],
});
