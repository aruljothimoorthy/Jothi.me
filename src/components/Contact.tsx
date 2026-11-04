import { useEffect, useState, type FormEvent } from "react";
import {
  BookOpen,
  Brain,
  ClipboardList,
  Code2,
  FlaskConical,
  Lightbulb,
  Mail,
  Search,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, SectionLabel, Magnetic, TiltCard } from "@/components/motion";
import { CONTACT_TO, sendContactMessage } from "@/lib/api/contact.functions";

const emptyForm = { name: "", email: "", phone: "", message: "" };

const workflowSteps = [
  { label: "IDEA", Icon: Lightbulb, color: "#fbbf24", glow: "rgba(251,191,36,0.35)" },
  { label: "PLAN", Icon: ClipboardList, color: "#fb923c", glow: "rgba(251,146,60,0.35)" },
  { label: "AI HELP", Icon: Brain, color: "#c084fc", glow: "rgba(192,132,252,0.35)" },
  { label: "CODE", Icon: Code2, color: "#60a5fa", glow: "rgba(96,165,250,0.35)" },
  { label: "REVIEW", Icon: Search, color: "#f472b6", glow: "rgba(244,114,182,0.35)" },
  { label: "TEST", Icon: FlaskConical, color: "#f87171", glow: "rgba(248,113,113,0.35)" },
  { label: "LEARN", Icon: BookOpen, color: "#e2e8f0", glow: "rgba(226,232,240,0.25)" },
] as const;

class FormActivationNeededError extends Error {
  constructor() {
    super(
      `Check ${CONTACT_TO} for an email from FormSubmit and click “Activate Form”. This is a one-time step — then submit again.`,
    );
    this.name = "FormActivationNeededError";
  }
}

/**
 * FormSubmit's /ajax endpoint often omits CORS headers, so browser fetch fails.
 * A classic form POST into a hidden iframe avoids CORS entirely.
 */
async function sendViaFormSubmitClient(payload: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  if (typeof window !== "undefined" && window.location.protocol === "file:") {
    throw new Error(
      "Open this site with a web server (npm run dev), not as a local HTML file.",
    );
  }

  const iframeName = `formsubmit_${Date.now()}`;
  const iframe = document.createElement("iframe");
  iframe.name = iframeName;
  iframe.title = "FormSubmit";
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://formsubmit.co/${CONTACT_TO}`;
  form.target = iframeName;
  form.style.display = "none";

  const fields: Record<string, string> = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone || "—",
    message: payload.message,
    _replyto: payload.email,
    _subject: `Portfolio contact from ${payload.name}`,
    _template: "table",
    _captcha: "false",
  };

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();

  // Cross-origin iframe responses can't be read; give FormSubmit time to accept.
  await new Promise((resolve) => window.setTimeout(resolve, 1800));
  form.remove();
  iframe.remove();
}

function WorkflowCard() {
  return (
    <div className="card-hover-lift glass-strong rounded-3xl border border-white/10 p-5 sm:p-6 light:border-[#E2E8F0]">
      <p className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
        Workflow
      </p>
      {/* Container horizontal scroll ஆம்போது shadow cut ஆகாம இருக்க pt-3 pb-2 சேர்க்கப்பட்டுள்ளது */}
      <div className="mt-4 flex items-start justify-between gap-1 overflow-x-auto pt-3 pb-2 sm:gap-0">
        {workflowSteps.map((step, i) => {
          const Icon = step.Icon;
          return (
            <div key={step.label} className="flex min-w-0 flex-1 items-start">
              <div className="flex w-full flex-col items-center text-center">
                {/* Icon box-க்கு மேல glow shadow தெரியறதுக்கு சரியான padding & box-shadow scale */}
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-black/30 transition-transform hover:scale-105 sm:h-12 sm:w-12 light:border-[#E2E8F0] light:bg-white"
                  style={{
                    boxShadow: `0 0 20px ${step.glow}`,
                    color: step.color,
                  }}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <span className="mt-2.5 max-w-[4.5rem] font-mono text-[8px] leading-tight tracking-wide text-muted-foreground uppercase sm:text-[9px]">
                  {step.label}
                </span>
              </div>
              {i < workflowSteps.length - 1 ? (
                <div
                  className="mt-6 hidden h-px flex-1 bg-gradient-to-r from-white/25 to-white/10 sm:block"
                  aria-hidden
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "activate"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => {
      setStatus("idle");
      setForm(emptyForm);
    }, 5000);
    return () => clearTimeout(t);
  }, [status]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      message: form.message.trim(),
    };

    try {
      const result = await sendContactMessage({ data: payload });

      if (result?.ok === true) {
        setStatus("success");
        return;
      }

      if (result?.needsClientFallback) {
        await sendViaFormSubmitClient(payload);
        setStatus("success");
        return;
      }

      throw new Error("Message was not confirmed as sent. Please try again.");
    } catch (err) {
      if (err instanceof FormActivationNeededError) {
        setStatus("activate");
        setErrorMsg(err.message);
        return;
      }
      setStatus("error");
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" &&
              err &&
              "message" in err &&
              typeof (err as { message: unknown }).message === "string"
            ? (err as { message: string }).message
            : "Something went wrong. Please try again.";
      setErrorMsg(message);
    }
  };

  const fieldClass = (id: string) =>
    `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm outline-none transition light:bg-white light:border-[#CBD5E1] light:text-[#0F172A] ${
      focused === id
        ? "border-cyan/50 shadow-[0_0_24px_rgba(103,232,249,0.15)] light:border-[#0891B2] light:shadow-[0_0_0_3px_rgba(8,145,178,0.12)]"
        : "border-white/10 light:border-[#CBD5E1] light:hover:border-[#94A3B8]"
    }`;

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-16 sm:px-5 lg:py-20">
      <div className="pointer-events-none absolute right-[-10%] bottom-0 h-[420px] w-[420px] rounded-full bg-cyan/12 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Get In Touch</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="m-typo-section mt-4 mb-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build <span className="gradient-text">something</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="m-typo-body mb-10 max-w-lg text-sm text-muted-foreground sm:mb-12">
            Have a project, collaboration, or opportunity in mind? Drop a message — I&apos;ll get
            back soon.
          </p>
        </Reveal>

        <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:gap-8">
          <Reveal delay={0.1}>
            <WorkflowCard />
          </Reveal>

          <Reveal delay={0.16}>
            <div className="card-hover-lift glass-strong neon-border mx-auto w-full max-w-3xl rounded-3xl">
            <TiltCard maxTilt={4} className="mx-auto w-full p-6 sm:p-8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[320px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-cyan/15 text-cyan">
                    <Send size={22} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">
                    Message sent successfully!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out — I&apos;ll reply shortly.
                  </p>
                </motion.div>
              ) : status === "activate" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[320px] flex-col items-center justify-center px-2 text-center"
                >
                  <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-amber-400/15 text-amber-300">
                    <Mail size={22} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">
                    One-time email activation
                  </h3>
                  <ol className="mt-4 max-w-md space-y-2 text-left text-sm text-muted-foreground">
                    <li>
                      1. Open your inbox:{" "}
                      <span className="text-cyan">{CONTACT_TO}</span>
                    </li>
                    <li>
                      2. Find the email from <span className="text-foreground">FormSubmit</span>{" "}
                      (check Spam/Promotions too).
                    </li>
                    <li>
                      3. Click the <span className="text-foreground">Activate Form</span> link.
                    </li>
                    <li>4. Come back here and send your message again.</li>
                  </ol>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMsg("");
                    }}
                    data-cursor="hover"
                    className="btn-secondary mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-6 py-3 text-sm font-medium text-cyan transition hover:bg-cyan hover:text-primary-foreground"
                  >
                    I&apos;ve activated — try again
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="flex items-center gap-2.5">
                    <Mail size={18} className="text-cyan" />
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      Send a Message
                    </h3>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                        Name
                      </span>
                      <input
                        required
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={fieldClass("name")}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                        Email
                      </span>
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@mail.com"
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={fieldClass("email")}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      Phone
                      <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[8px] tracking-wider text-muted-foreground/80 normal-case light:border-[#CBD5E1]">
                        Optional
                      </span>
                    </span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="Phone number (optional)"
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      className={fieldClass("phone")}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      Message
                    </span>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="What's on your mind?"
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`resize-none ${fieldClass("message")}`}
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-sm text-destructive" role="alert">
                      {errorMsg || "Failed to send message. Please try again."}
                    </p>
                  )}

                  <div className="flex justify-center pt-1">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        data-cursor="hover"
                        className="btn-primary m-typo-btn inline-flex items-center justify-center gap-2 rounded-full border border-cyan/40 bg-black/40 px-6 py-3.5 text-sm font-medium text-cyan shadow-[0_0_24px_rgba(94,239,255,0.12)] transition hover:bg-cyan hover:text-primary-foreground disabled:opacity-60"
                      >
                        <Send size={16} />
                        {status === "sending" ? "Sending..." : "Send Message"}
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </TiltCard>
            </div>
          </Reveal>
        </div>

        <footer className="mt-14 px-2 text-center font-mono text-[10px] tracking-wider text-muted-foreground sm:mt-20 sm:text-[11px]">
          © 2026 Aruljothi K · Crafted with motion & intention.
        </footer>
      </div>
    </section>
  );
}
