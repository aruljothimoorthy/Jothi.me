import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aruljothi K — Premium Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Aruljothi K — MERN Stack Developer building full-stack web applications with MongoDB, Express.js, React.js, and Node.js.",
      },
      { property: "og:title", content: "Aruljothi K — Premium Portfolio" },
      {
        property: "og:description",
        content: "Cinematic, motion-rich personal portfolio.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Experience />
      <Contact />
    </main>
  );
}
