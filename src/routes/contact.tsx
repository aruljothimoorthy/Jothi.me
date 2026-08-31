import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aruljothi K" },
      {
        name: "description",
        content: "Get in touch with Aruljothi K.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="relative min-h-screen px-4 pt-20 sm:px-5 lg:pt-20">
      <Contact />
    </main>
  );
}
