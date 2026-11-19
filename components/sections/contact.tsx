import React from "react";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { getContactEmailConfig } from "@/lib/email/contact";

export default function Contact() {
  const emailConfig = getContactEmailConfig();
  const devMissingEnv =
    process.env.NODE_ENV !== "production" ? emailConfig.missingEnv : undefined;

  return (
    <section
      id="contacts"
      aria-labelledby="contact-heading"
      className="relative w-full overflow-hidden border-t border-border/60 bg-background py-20 md:py-28 scroll-mt-24"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-4xl rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Subtle Aceternity Background Beams */}
      <BackgroundBeams className="text-muted-foreground/60 opacity-35 dark:opacity-65" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
          <div className="lg:col-span-7">
            <ContactForm
              emailConfigured={emailConfig.configured}
              missingEnv={devMissingEnv}
              recipientEmail={emailConfig.toEmail}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
