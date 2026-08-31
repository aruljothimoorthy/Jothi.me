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

function isTruthySuccess(value: unknown) {
  return value === true || value === "true" || value === 1 || value === "1";
}

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

async function sendWithWeb3Forms(data: ContactPayload, accessKey: string) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio contact from ${data.name}`,
      from_name: data.name,
      email: data.email,
      phone: phoneLine(data),
      message: data.message,
      replyto: data.email,
      to: CONTACT_TO,
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok || !isTruthySuccess(body?.success)) {
    console.error("Web3Forms error:", body);
    throw new Error(
      typeof body?.message === "string"
        ? body.message
        : "Failed to send message. Please try again later.",
    );
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
 * Server-only mailer for Resend / Web3Forms / Formspree.
 * FormSubmit is intentionally NOT used here — it requires a browser Origin
 * and fails with "open this page through a web server" when called from Node.
 * The client falls back to FormSubmit when needsClientFallback is true.
 */
export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const resendKey = process.env.RESEND_API_KEY?.trim();
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY?.trim();
    const formspreeId = process.env.FORMSPREE_FORM_ID?.trim();

    if (!resendKey && !web3Key && !formspreeId) {
      return { ok: false as const, needsClientFallback: true as const };
    }

    try {
      if (resendKey) {
        await sendWithResend(data, resendKey);
      } else if (web3Key) {
        await sendWithWeb3Forms(data, web3Key);
      } else if (formspreeId) {
        await sendWithFormspree(data, formspreeId);
      }
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Failed to send message. Please try again later.");
    }

    return { ok: true as const, needsClientFallback: false as const };
  });
