import { z } from "zod";

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  subjectMin: 3,
  subjectMax: 150,
  messageMin: 10,
  messageMax: 2000,
  honeypotMax: 200,
  maxPayloadBytes: 16 * 1024,
} as const;

const NO_NEWLINES_REGEX = /^[^\r\n]*$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your full name.")
    .min(
      CONTACT_LIMITS.nameMin,
      `Name must be at least ${CONTACT_LIMITS.nameMin} characters.`
    )
    .max(
      CONTACT_LIMITS.nameMax,
      `Name must be at most ${CONTACT_LIMITS.nameMax} characters.`
    )
    .regex(NO_NEWLINES_REGEX, "Name must be a single line."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(CONTACT_LIMITS.emailMax, "Email address is too long.")
    .regex(NO_NEWLINES_REGEX, "Email address must be a single line.")
    .pipe(z.email({ error: "Please enter a valid email address." })),
  subject: z
    .string()
    .trim()
    .min(1, "Please enter a subject.")
    .min(
      CONTACT_LIMITS.subjectMin,
      `Subject must be at least ${CONTACT_LIMITS.subjectMin} characters.`
    )
    .max(
      CONTACT_LIMITS.subjectMax,
      `Subject must be at most ${CONTACT_LIMITS.subjectMax} characters.`
    )
    .regex(NO_NEWLINES_REGEX, "Subject must be a single line."),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message.")
    .min(
      CONTACT_LIMITS.messageMin,
      `Message must be at least ${CONTACT_LIMITS.messageMin} characters.`
    )
    .max(
      CONTACT_LIMITS.messageMax,
      `Message must be at most ${CONTACT_LIMITS.messageMax} characters.`
    ),
});

export const contactSubmissionSchema = contactFormSchema.extend({
  hpField: z.string().max(CONTACT_LIMITS.honeypotMax).optional().default(""),
  website: z.string().max(CONTACT_LIMITS.honeypotMax).optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
export type ContactFieldName = keyof ContactFormValues;
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export type ContactApiResponse =
  | {
      ok: true;
      messageId: string;
    }
  | {
      ok: false;
      code:
        | "VALIDATION_ERROR"
        | "SPAM_DETECTED"
        | "PAYLOAD_TOO_LARGE"
        | "UNSUPPORTED_MEDIA_TYPE"
        | "INVALID_JSON"
        | "FORBIDDEN_ORIGIN"
        | "EMAIL_NOT_CONFIGURED"
        | "DELIVERY_FAILED";
      message: string;
      fieldErrors?: ContactFieldErrors;
    };

export function extractContactFieldErrors(
  error: z.ZodError
): ContactFieldErrors {
  const fieldErrors: ContactFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      typeof field === "string" &&
      (field === "name" ||
        field === "email" ||
        field === "subject" ||
        field === "message") &&
      !fieldErrors[field]
    ) {
      fieldErrors[field] = issue.message;
    }
  }

  return fieldErrors;
}
