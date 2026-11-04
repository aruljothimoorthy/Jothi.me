
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

// GitHub Pages uses /Jothi.me/.
// Vercel uses the domain root.
const isGitHubPages = process.env.GITHUB_PAGES === "true";

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
  base: isGitHubPages ? "/Jothi.me/" : "/",

  server: {
    port: 3000,
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
        basepath: isGitHubPages ? "/Jothi.me" : "/",
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
      },
      pages: portfolioRoutes.map((path) => ({ path })),
    }),

    nitro(),
    viteReact(),
    tailwindcss(),
  ],
});
