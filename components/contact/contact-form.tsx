"use client";

import React, { useMemo, useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_LIMITS,
  contactFormSchema,
  extractContactFieldErrors,
  type ContactApiResponse,
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactFormValues,
} from "@/lib/validations/contact";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const FIELD_ORDER: ContactFieldName[] = ["name", "email", "subject", "message"];

function buildMailtoHref(
  recipientEmail: string,
  values: ContactFormValues
): string {
  const params = new URLSearchParams();
  const subject = values.subject.trim();
  const bodyLines = [
    values.message.trim(),
    values.name.trim() ? `\n— ${values.name.trim()}` : "",
    values.email.trim() ? `(${values.email.trim()})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (subject) {
    params.set("subject", subject);
  }
  if (bodyLines) {
    params.set("body", bodyLines);
  }

  const query = params.toString();
  return query ? `mailto:${recipientEmail}?${query}` : `mailto:${recipientEmail}`;
}

export interface ContactFormProps {
  emailConfigured: boolean;
  missingEnv?: string[];
  recipientEmail: string;
}

export function ContactForm({
  emailConfigured,
  missingEnv,
  recipientEmail,
}: ContactFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<ContactFieldName, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runtimeUnavailable, setRuntimeUnavailable] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const providerUnavailable = !emailConfigured || runtimeUnavailable;

  const formRef = useRef<HTMLFormElement>(null);

  const mailtoHref = useMemo(
    () => buildMailtoHref(recipientEmail, values),
    [recipientEmail, values]
  );

  const validateSingleField = (
    field: ContactFieldName,
    nextValues: ContactFormValues
  ) => {
    const parsed = contactFormSchema.safeParse(nextValues);
    if (parsed.success) {
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
      return;
    }

    const allErrors = extractContactFieldErrors(parsed.error);
    setErrors((prev) => {
      const next = { ...prev };
      if (allErrors[field]) {
        next[field] = allErrors[field];
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleFieldChange = (field: ContactFieldName, value: string) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    if (statusMessage) {
      setStatusMessage(null);
    }
    if (touched[field] || errors[field]) {
      validateSingleField(field, nextValues);
    }
  };

  const handleFieldBlur = (field: ContactFieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateSingleField(field, values);
  };

  const focusFirstError = (fieldErrors: ContactFieldErrors) => {
    const firstField = FIELD_ORDER.find((field) => Boolean(fieldErrors[field]));
    if (!firstField || !formRef.current) return;
    const element = formRef.current.querySelector<HTMLElement>(
      `[name="${firstField}"]`
    );
    element?.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setStatusMessage(null);
    setTouched({ name: true, email: true, subject: true, message: true });

    const validation = contactFormSchema.safeParse(values);
    if (!validation.success) {
      const fieldErrors = extractContactFieldErrors(validation.error);
      setErrors(fieldErrors);
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...validation.data,
          hpField: honeypot,
        }),
      });

      let payload: ContactApiResponse | null = null;
      try {
        payload = (await response.json()) as ContactApiResponse;
      } catch {
        payload = null;
      }

      if (response.ok && payload?.ok) {
        setValues(INITIAL_VALUES);
        setHoneypot("");
        setErrors({});
        setTouched({});
        setRuntimeUnavailable(false);
        setStatusMessage({
          type: "success",
          text: "Your message was sent successfully.",
        });
        toast.success("Your message was sent successfully.");
        return;
      }

      if (payload && !payload.ok) {
        if (payload.fieldErrors) {
          setErrors(payload.fieldErrors);
          focusFirstError(payload.fieldErrors);
        }
        if (payload.code === "EMAIL_NOT_CONFIGURED") {
          setRuntimeUnavailable(true);
        }
      }

      const errorText =
        "Unable to send your message. Please try again or contact me by email.";
      setStatusMessage({ type: "error", text: errorText });
      toast.error(errorText);
    } catch {
      const errorText =
        "Unable to send your message. Please try again or contact me by email.";
      setStatusMessage({ type: "error", text: errorText });
      toast.error(errorText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.45,
          delay: shouldReduceMotion ? 0 : 0.16,
          ease: "easeOut",
        }}
      >
        <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 ring-0 shadow-sm backdrop-blur-md [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)] dark:bg-card/85">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/35 to-transparent"
          />

          <CardHeader className="gap-1.5">
            <CardTitle>
              <h3 className="text-xl font-semibold tracking-tight text-card-foreground sm:text-2xl">
                Send Me a Message
              </h3>
            </CardTitle>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground">
              Share a few details, and I&apos;ll be happy to explore how we can
              work together.
            </CardDescription>
          </CardHeader>

          <div className="px-(--card-spacing)">
            <Separator className="bg-border/70" />
          </div>

          <CardContent className="space-y-5">
            {providerUnavailable ? (
              <div
                role="status"
                className="flex flex-col gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle
                    className="mt-0.5 size-4 shrink-0 text-foreground"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">
                      Direct form delivery is not configured yet
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      You can still compose your message below and open it
                      directly in your email app using the button below.
                    </p>
                    {missingEnv && missingEnv.length > 0 ? (
                      <p className="font-mono text-[11px] text-muted-foreground">
                        Missing server env: {missingEnv.join(", ")}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 cursor-pointer rounded-lg px-3.5 font-medium"
                    nativeButton={false}
                    render={(props) => (
                      <a {...props} href={mailtoHref}>
                        <Mail className="mr-1.5 size-3.5" aria-hidden="true" />
                        Email {recipientEmail}
                      </a>
                    )}
                  />
                </div>
              </div>
            ) : null}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              {/* Accessible honeypot field hidden from human visitors and browser autofill */}
              <div
                aria-hidden="true"
                className="sr-only"
                style={{ position: "absolute", left: "-9999px" }}
              >
                <label htmlFor="contact-hp-field">Leave this field empty</label>
                <input
                  id="contact-hp-field"
                  name="hpField"
                  type="text"
                  tabIndex={-1}
                  autoComplete="new-password"
                  data-1p-ignore="true"
                  data-lpignore="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <FieldGroup className="gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field data-invalid={Boolean(errors.name) || undefined}>
                    <FieldLabel htmlFor="contact-name">
                      Full Name{" "}
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                    </FieldLabel>
                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      maxLength={CONTACT_LIMITS.nameMax}
                      placeholder="Your full name"
                      value={values.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("name")}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      className="h-10 rounded-lg px-3"
                    />
                    <FieldError id="contact-name-error">
                      {errors.name}
                    </FieldError>
                  </Field>

                  <Field data-invalid={Boolean(errors.email) || undefined}>
                    <FieldLabel htmlFor="contact-email">
                      Email Address{" "}
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                    </FieldLabel>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={CONTACT_LIMITS.emailMax}
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("email")}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      className="h-10 rounded-lg px-3"
                    />
                    <FieldError id="contact-email-error">
                      {errors.email}
                    </FieldError>
                  </Field>
                </div>

                <Field data-invalid={Boolean(errors.subject) || undefined}>
                  <FieldLabel htmlFor="contact-subject">
                    Subject{" "}
                    <span aria-hidden="true" className="text-destructive">
                      *
                    </span>
                  </FieldLabel>
                  <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    autoComplete="off"
                    maxLength={CONTACT_LIMITS.subjectMax}
                    placeholder="What would you like to discuss?"
                    value={values.subject}
                    onChange={(e) =>
                      handleFieldChange("subject", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("subject")}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject ? "contact-subject-error" : undefined
                    }
                    className="h-10 rounded-lg px-3"
                  />
                  <FieldError id="contact-subject-error">
                    {errors.subject}
                  </FieldError>
                </Field>

                <Field data-invalid={Boolean(errors.message) || undefined}>
                  <div className="flex items-center justify-between gap-2">
                    <FieldLabel htmlFor="contact-message">
                      Message{" "}
                      <span aria-hidden="true" className="text-destructive">
                        *
                      </span>
                    </FieldLabel>
                    <span
                      id="contact-message-count"
                      className="text-xs tabular-nums text-muted-foreground"
                    >
                      {values.message.length}/{CONTACT_LIMITS.messageMax}
                    </span>
                  </div>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    maxLength={CONTACT_LIMITS.messageMax}
                    placeholder="Tell me about your project, opportunity, or idea..."
                    value={values.message}
                    onChange={(e) =>
                      handleFieldChange("message", e.target.value)
                    }
                    onBlur={() => handleFieldBlur("message")}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message
                        ? "contact-message-error contact-message-count"
                        : "contact-message-count"
                    }
                    className="min-h-32 resize-y rounded-lg px-3 py-2.5"
                  />
                  <FieldError id="contact-message-error">
                    {errors.message}
                  </FieldError>
                </Field>
              </FieldGroup>

              {statusMessage ? (
                <div
                  role="status"
                  aria-live="polite"
                  className={
                    statusMessage.type === "success"
                      ? "flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-foreground"
                      : "flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive"
                  }
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <AlertCircle
                      className="mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <div className="space-y-1">
                    <p>{statusMessage.text}</p>
                    {statusMessage.type === "error" ? (
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-1 text-xs font-medium underline underline-offset-4 hover:opacity-80"
                      >
                        <Mail className="size-3.5" aria-hidden="true" />
                        Open in your email client ({recipientEmail})
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-11 w-full cursor-pointer rounded-xl px-6 font-medium shadow-xs sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 size-4" aria-hidden="true" />
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-full cursor-pointer rounded-xl px-3.5 text-xs font-medium text-muted-foreground hover:text-foreground sm:w-auto"
                  nativeButton={false}
                  render={(props) => (
                    <a {...props} href={mailtoHref}>
                      <Mail className="mr-1.5 size-3.5" aria-hidden="true" />
                      Prefer your email app?
                    </a>
                  )}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </MotionConfig>
  );
}
