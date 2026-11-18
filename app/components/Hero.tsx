"use client";

import React from "react";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Download, Mail } from "lucide-react";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

import { HeroPortrait } from "@/components/hero/hero-portrait";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Separator } from "@/components/ui/separator";
import { Spotlight } from "@/components/ui/spotlight";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const HERO_ROLES = [
  "Full-Stack Developer",
  "React & Next.js Developer",
  "AI Application Developer",
  "Software Developer",
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/Piyushkr001",
    ariaLabel: "GitHub Profile (opens in a new tab)",
    icon: GithubLogoIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/piyushkr007",
    ariaLabel: "LinkedIn Profile (opens in a new tab)",
    icon: LinkedinLogoIcon,
  },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const transition = (delay: number) => ({
    duration: shouldReduceMotion ? 0 : 0.45,
    delay: shouldReduceMotion ? 0 : delay,
    ease: "easeOut" as const,
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="hero-heading"
        className="relative flex w-full items-center overflow-hidden bg-background text-foreground pt-24 pb-16 sm:pt-28 sm:pb-20 lg:min-h-[92svh] lg:py-24"
      >
        {/* Subtle grid & radial ambient backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] bg-size-[24px_24px] opacity-60 mask-[radial-gradient(ellipse_80%_65%_at_50%_35%,black_25%,transparent_100%)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] dark:opacity-80" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-4xl rounded-full bg-primary/5 blur-3xl" />
        </div>

        {/* Aceternity Spotlight */}
        <Spotlight
          className="-top-40 left-0 md:-top-24 md:left-48 text-sky-500/45 dark:text-white"
          fill="currentColor"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            {/* Left Column: Primary Introduction */}
            <div className="flex flex-col items-start gap-6 lg:col-span-7">
              {/* 1. Intro Badge */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition(0)}
              >
                <Badge
                  variant="outline"
                  className="rounded-full border-border/80 bg-muted/60 px-3 py-1 text-[11px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground shadow-2xs backdrop-blur-xs"
                >
                  <span
                    aria-hidden="true"
                    className="mr-1.5 size-1.5 rounded-full bg-primary/70"
                  />
                  FULL-STACK DEVELOPER
                </Badge>
              </motion.div>

              {/* 2. Primary Heading & 3. Animated Professional Designation */}
              <div className="space-y-3">
                <motion.h1
                  id="hero-heading"
                  initial={shouldReduceMotion ? false : { y: 8 }}
                  animate={{ y: 0 }}
                  transition={transition(0.06)}
                  className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.08]"
                >
                  Hi, I&apos;m{" "}
                  <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent dark:from-white dark:via-neutral-100 dark:to-neutral-400">
                    Piyush Kumar.
                  </span>
                </motion.h1>

                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={transition(0.12)}
                  className="flex flex-wrap items-center gap-2.5 pt-1 text-base sm:text-lg md:text-xl font-medium text-muted-foreground"
                >
                  <span>I build as a</span>
                  <span className="sr-only">
                    Full-Stack Developer, React &amp; Next.js Developer, AI
                    Application Developer, and Software Developer.
                  </span>
                  <span aria-hidden="true" className="inline-flex max-w-full">
                    <ContainerTextFlip
                      words={HERO_ROLES}
                      interval={3500}
                      animationDuration={450}
                      variant="subtle"
                      textClassName="tracking-tight"
                    />
                  </span>
                </motion.div>
              </div>

              {/* 4. Supporting Description (remains visible at opacity 1 even without JS) */}
              <motion.p
                initial={shouldReduceMotion ? false : { y: 10 }}
                animate={{ y: 0 }}
                transition={transition(0.18)}
                className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
              >
                I build scalable, accessible, and user-focused web applications
                using React, Next.js, TypeScript, Node.js, and PostgreSQL. From
                responsive interfaces and reliable APIs to AI-powered
                experiences, I turn complex ideas into practical digital
                products.
              </motion.p>

              {/* 5. Call-to-Action Buttons */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition(0.24)}
                className="flex w-full flex-wrap items-center gap-3 pt-1"
              >
                <Button
                  size="lg"
                  className="h-10 cursor-pointer rounded-xl px-5 font-medium shadow-xs"
                  nativeButton={false}
                  render={(props) => (
                    <Link {...props} href="#projects">
                      View Projects
                      <ArrowUpRight
                        className="ml-1.5 size-4"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                />

                <Button
                  variant="outline"
                  size="lg"
                  className="h-10 cursor-pointer rounded-xl px-5 font-medium"
                  nativeButton={false}
                  render={(props) => (
                    <Link {...props} href="#contacts">
                      Contact Me
                      <Mail className="ml-1.5 size-4" aria-hidden="true" />
                    </Link>
                  )}
                />

                <Button
                  variant="ghost"
                  size="lg"
                  className="h-10 cursor-pointer rounded-xl px-4 font-medium text-muted-foreground hover:text-foreground"
                  nativeButton={false}
                  render={(props) => (
                    <a
                      {...props}
                      href="/Piyush__Resume.pdf"
                      download="Piyush__Resume.pdf"
                    >
                      Download Resume
                      <Download className="ml-1.5 size-4" aria-hidden="true" />
                    </a>
                  )}
                />
              </motion.div>

              {/* 6. Social Links & Credibility Statement */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition(0.3)}
                className="flex w-full flex-col gap-4 pt-2"
              >
                <Separator className="max-w-xl bg-border/70" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <TooltipProvider>
                    <div className="flex items-center gap-2">
                      {SOCIAL_LINKS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Tooltip key={item.name}>
                            <TooltipTrigger
                              render={(props) => (
                                <a
                                  {...props}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={item.ariaLabel}
                                  className={cn(
                                    buttonVariants({
                                      variant: "outline",
                                      size: "icon",
                                    }),
                                    "size-9 rounded-full border-border/80 bg-background/80 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
                                    props.className
                                  )}
                                >
                                  <Icon
                                    className="size-4"
                                    aria-hidden="true"
                                  />
                                </a>
                              )}
                            />
                            <TooltipContent>{item.name}</TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TooltipProvider>

                  <span
                    aria-hidden="true"
                    className="hidden h-4 w-px bg-border sm:block"
                  />

                  <p className="inline-flex items-start sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2
                      className="mt-0.5 sm:mt-0 size-4 shrink-0 text-primary/80"
                      aria-hidden="true"
                    />
                    <span>
                      Experience supporting digital platforms serving 1,000+
                      users across 30+ locations.
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 7. Right Column: Interactive 3D Portrait */}
            <motion.div
              initial={shouldReduceMotion ? false : { y: 12 }}
              animate={{ y: 0 }}
              transition={transition(0.22)}
              className="flex justify-center lg:col-span-5 lg:justify-end"
            >
              <HeroPortrait />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
