"use client";

import React from "react";
import Image from "next/image";
import { Code2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[330px] lg:max-w-[370px]">
      {/* Layer 1: Restrained soft gradient glow behind portrait card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-sky-500/15 via-primary/10 to-purple-500/12 blur-2xl dark:from-sky-500/20 dark:via-primary/15 dark:to-purple-500/18"
      />

      <CardContainer
        containerClassName="w-full py-2 sm:py-4 lg:py-0"
        className="w-full"
        maxTilt={10}
      >
        {/* Layer 2: Glassmorphic rounded portrait card */}
        <CardBody className="group/card relative h-auto w-full rounded-3xl border border-border/80 bg-card/85 p-3.5 sm:p-4 backdrop-blur-md shadow-[0_18px_45px_-15px_rgba(0,0,0,0.14)] transition-shadow duration-300 hover:border-primary/35 hover:shadow-[0_26px_60px_-15px_rgba(0,0,0,0.2)] dark:bg-card/80 dark:shadow-[0_22px_55px_-15px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_28px_65px_-15px_rgba(0,0,0,0.85)]">
          {/* Subtle cursor-responsive lighting highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 [background:radial-gradient(280px_circle_at_var(--glare-x)_var(--glare-y),rgba(255,255,255,0.45),transparent_70%)] dark:[background:radial-gradient(280px_circle_at_var(--glare-x)_var(--glare-y),rgba(255,255,255,0.12),transparent_70%)]"
          />

          {/* Top edge accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
          />

          {/* Layer 3: Elevated portrait image preserving 1:1 square aspect ratio */}
          <CardItem translateZ={60} className="w-full">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-shadow duration-300 group-hover/card:shadow-xl dark:border-white/15">
              <Image
                src="/images/piyush-portrait.png"
                alt="Portrait of Piyush Kumar, Full-Stack Developer"
                width={1024}
                height={1024}
                priority
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 304px, 340px"
                className="h-full w-full object-cover object-center select-none"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5"
              />
            </div>
          </CardItem>

          {/* Layer 4: Subtle foreground metadata bar */}
          <div className="mt-3.5 flex items-center justify-between gap-2 px-1">
            <CardItem translateZ={28} className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-card-foreground">
                Piyush Kumar
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Full-Stack Developer
              </p>
            </CardItem>

            <CardItem translateZ={36} className="shrink-0">
              <Badge
                variant="secondary"
                className="border border-border/60 bg-secondary/80 font-mono text-[11px] font-medium text-secondary-foreground"
              >
                <Code2
                  className="mr-1 size-3 text-primary"
                  aria-hidden="true"
                />
                Next.js · TS
              </Badge>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
