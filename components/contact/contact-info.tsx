"use client";

import React from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CONTACT_EMAIL = "krvpiyush@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91 63980 72914";
const CONTACT_PHONE_HREF = "tel:+916398072914";
const CONTACT_LOCATION = "Moradabad, Uttar Pradesh, India";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/Piyushkr001",
    ariaLabel: "Visit Piyush Kumar's GitHub profile (opens in a new tab)",
    icon: GithubLogoIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/piyushkr007",
    ariaLabel: "Visit Piyush Kumar's LinkedIn profile (opens in a new tab)",
    icon: LinkedinLogoIcon,
  },
];

export function ContactInfo() {
  const shouldReduceMotion = useReducedMotion();

  const transition = (delay: number) => ({
    duration: shouldReduceMotion ? 0 : 0.45,
    delay: shouldReduceMotion ? 0 : delay,
    ease: "easeOut" as const,
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-6">
        {/* Eyebrow & Collaboration Badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={transition(0)}
          className="flex flex-wrap items-center gap-2.5"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            LET&apos;S CONNECT
          </span>
          <Badge
            variant="secondary"
            className="rounded-full border border-border/70 bg-secondary/80 px-3 py-1 text-xs font-medium text-secondary-foreground"
          >
            <span
              aria-hidden="true"
              className="mr-1.5 size-1.5 rounded-full bg-emerald-500"
            />
            Open to meaningful collaborations
          </Badge>
        </motion.div>

        {/* Main Section Heading & Subtitle */}
        <div className="space-y-4">
          <motion.h2
            id="contact-heading"
            initial={shouldReduceMotion ? false : { y: 10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={transition(0.05)}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] leading-[1.12]"
          >
            Let&apos;s Build Something{" "}
            <span className="relative inline-block">
              Together.
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-0.75 w-full rounded-full bg-primary/40"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={transition(0.12)}
            className="max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground"
          >
            Have a project in mind, an opportunity to discuss, or an idea worth
            exploring? I&apos;d love to hear from you. Let&apos;s turn your
            ideas into meaningful digital experiences.
          </motion.p>
        </div>

        {/* Actionable Contact Details */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={transition(0.18)}
          className="space-y-3 pt-1"
        >
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group flex items-center gap-3.5 rounded-xl border border-border/80 bg-card/85 p-3.5 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-primary/35 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted/70 text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10"
            >
              <Mail className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">Email</p>
              <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {CONTACT_EMAIL}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
            />
          </a>

          <a
            href={CONTACT_PHONE_HREF}
            className="group flex items-center gap-3.5 rounded-xl border border-border/80 bg-card/85 p-3.5 shadow-2xs backdrop-blur-xs transition-all duration-200 hover:border-primary/35 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted/70 text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10"
            >
              <Phone className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">Phone</p>
              <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {CONTACT_PHONE_DISPLAY}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
            />
          </a>

          <div className="flex items-center gap-3.5 rounded-xl border border-border/80 bg-card/85 p-3.5 shadow-2xs backdrop-blur-xs">
            <div
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted/70 text-primary"
            >
              <MapPin className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">
                Location
              </p>
              <p className="text-sm font-medium text-foreground">
                {CONTACT_LOCATION}
              </p>
            </div>
          </div>
        </motion.div>

        <Separator className="bg-border/70" />

        {/* Social Links */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={transition(0.24)}
          className="space-y-2.5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Social Profiles
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {SOCIAL_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="outline"
                  size="lg"
                  className="h-10 cursor-pointer rounded-xl border-border/80 bg-card/80 px-4 font-medium text-foreground shadow-2xs transition-colors hover:border-primary/40 hover:bg-muted"
                  nativeButton={false}
                  render={(props) => (
                    <a
                      {...props}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                    >
                      <Icon className="mr-2 size-4" aria-hidden="true" />
                      {item.name}
                      <ArrowUpRight
                        className="ml-1.5 size-3.5 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
