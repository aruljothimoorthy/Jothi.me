import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const CONTACT_TO = "aruljothi128r@gmail.com";

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z
    .string()
    .max(40)
    .optional()
    .transform((value) => {
      const trimmed = value?.trim();
      return trimmed ? trimmed : undefined;
    }),
  message: z.string().min(1).max(5000),
});

export type ContactPayload = z.infer<typeof contactSchema>;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function phoneLine(data: ContactPayload) {
  const phone = data.phone?.trim();
  return phone ? phone : "—";
}

async function sendWithResend(data: ContactPayload, apiKey: string) {
  const from = process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_TO],
      reply_to: data.email,
      subject: `Portfolio contact from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${phoneLine(data)}\n\n${data.message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phoneLine(data))}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok || body?.error) {
    console.error("Resend error:", body);
    throw new Error("Failed to send message. Please try again later.");
  }
}

async function sendWithFormspree(data: ContactPayload, formId: string) {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: phoneLine(data),
      message: data.message,
      _replyto: data.email,
      _subject: `Portfolio contact from ${data.name}`,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok || body?.error || body?.ok === false) {
    console.error("Formspree error:", body);
    throw new Error("Failed to send message. Please try again later.");
  }
}

/**
 * Server mailer for Resend / Formspree only.
 * Web3Forms free tier must run in the browser (Contact.tsx) — server calls are blocked.
 */
export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const resendKey = process.env.RESEND_API_KEY?.trim();
    const formspreeId = process.env.FORMSPREE_FORM_ID?.trim();

    if (!resendKey && !formspreeId) {
      return { ok: false as const, needsClientFallback: true as const };
    }

    try {
      if (resendKey) {
        await sendWithResend(data, resendKey);
      } else if (formspreeId) {
        await sendWithFormspree(data, formspreeId);
      }
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Failed to send message. Please try again later.");
    }

    return { ok: true as const, needsClientFallback: false as const };
  });
