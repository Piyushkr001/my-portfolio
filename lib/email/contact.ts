import { Resend } from "resend";
import type { ContactFormValues } from "@/lib/validations/contact";

export const DEFAULT_CONTACT_TO_EMAIL = "krvpiyush@gmail.com";

export interface ContactEmailConfigStatus {
  configured: boolean;
  missingEnv: string[];
  toEmail: string;
  fromEmail: string | null;
  apiKey: string | null;
}

export function getContactEmailConfig(): ContactEmailConfigStatus {
  const apiKey = process.env.RESEND_API_KEY?.trim() || null;
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || null;
  const toEmail =
    process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_CONTACT_TO_EMAIL;

  const missingEnv: string[] = [];
  if (!apiKey) {
    missingEnv.push("RESEND_API_KEY");
  }
  if (!fromEmail) {
    missingEnv.push("CONTACT_FROM_EMAIL");
  }

  return {
    configured: missingEnv.length === 0,
    missingEnv,
    toEmail,
    fromEmail,
    apiKey,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export type SendContactEmailResult =
  | { ok: true; messageId: string }
  | { ok: false; code: "EMAIL_NOT_CONFIGURED"; missingEnv: string[] }
  | { ok: false; code: "DELIVERY_FAILED" };

export async function sendContactEmail(
  values: ContactFormValues
): Promise<SendContactEmailResult> {
  const config = getContactEmailConfig();

  if (!config.configured || !config.apiKey || !config.fromEmail) {
    return {
      ok: false,
      code: "EMAIL_NOT_CONFIGURED",
      missingEnv: config.missingEnv,
    };
  }

  const safeName = sanitizeHeaderValue(values.name);
  const safeEmail = sanitizeHeaderValue(values.email);
  const safeSubject = sanitizeHeaderValue(values.subject);
  const normalizedMessage = values.message.replace(/\r\n/g, "\n").trim();

  const textBody = [
    "New Portfolio Contact Inquiry",
    "-----------------------------",
    `Name: ${safeName}`,
    `Email: ${safeEmail}`,
    `Subject: ${safeSubject}`,
    "",
    "Message:",
    normalizedMessage,
  ].join("\n");

  const htmlBody = `<!doctype html>
<html lang="en">
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #171717; line-height: 1.6; margin: 0; padding: 24px; background-color: #fafafa;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 24px;">
      <h2 style="margin: 0 0 16px; font-size: 18px; color: #0a0a0a;">New Portfolio Contact Message</h2>
      <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(safeName)} (${escapeHtml(safeEmail)})</p>
      <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
      <hr style="border: 0; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(normalizedMessage)}</p>
    </div>
  </body>
</html>`;

  try {
    const resend = new Resend(config.apiKey);
    const { data, error } = await resend.emails.send({
      from: config.fromEmail,
      to: [config.toEmail],
      replyTo: safeEmail,
      subject: `[Portfolio] ${safeSubject}`,
      text: textBody,
      html: htmlBody,
    });

    if (error || !data?.id) {
      if (process.env.NODE_ENV !== "production" && error) {
        console.error(
          `[contact] Email delivery failed (${error.name}): ${error.message}`
        );
      }
      return { ok: false, code: "DELIVERY_FAILED" };
    }

    return { ok: true, messageId: data.id };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "[contact] Unexpected email delivery error:",
        err instanceof Error ? err.message : "Unknown error"
      );
    }
    return { ok: false, code: "DELIVERY_FAILED" };
  }
}
