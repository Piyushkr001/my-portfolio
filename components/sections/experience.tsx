"use client";

import React from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  BarChart3,
  Building2,
  Calendar,
  Code2,
  Layers,
  LayoutTemplate,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { experiences } from "@/data/experience";
import type { Experience, ExperienceCategory } from "@/types/experience";

const categoryIcons: Record<ExperienceCategory, LucideIcon> = {
  "qa-maintenance": ShieldCheck,
  fullstack: Layers,
  internship: Code2,
  "data-analytics": BarChart3,
  frontend: LayoutTemplate,
};

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const CategoryIcon = categoryIcons[experience.category];
  const dateRange = `${experience.startDate} – ${experience.endDate}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.2),
        ease: "easeOut",
      }}
    >
      <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/95 ring-0 [--card-spacing:--spacing(5)] md:[--card-spacing:--spacing(6)] shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md dark:bg-card/85">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <div
                aria-hidden="true"
                className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/70 text-primary shadow-2xs"
              >
                <CategoryIcon className="size-5" />
              </div>
              <div className="min-w-0">
                <CardTitle>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground leading-snug">
                    {experience.position}
                  </h3>
                </CardTitle>
                <CardDescription className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground/85">
                  <Building2
                    className="size-3.5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span>{experience.company}</span>
                </CardDescription>
              </div>
            </div>

            <Badge
              variant="secondary"
              className="w-fit shrink-0 border border-border/60 bg-secondary/80 font-medium text-secondary-foreground"
            >
              {experience.isCurrent ? (
                <span
                  aria-hidden="true"
                  className="mr-1 size-1.5 rounded-full bg-emerald-500"
                />
              ) : null}
              {experience.employmentType}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-xs sm:text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{dateRange}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{experience.location}</span>
            </span>
          </div>
        </CardHeader>

        <div className="px-(--card-spacing)">
          <Separator className="bg-border/70" />
        </div>

        <CardContent className="flex flex-col gap-4">
          <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
            {experience.responsibilities.map((responsibility) => (
              <li key={responsibility} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
                />
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>

          <div className="pt-1">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              {experience.technologiesLabel ?? "Technologies"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-border/80 bg-muted/40 font-normal text-foreground/85 transition-colors hover:bg-muted/70"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const timelineData: TimelineEntry[] = experiences.map((experience, idx) => ({
    title: `${experience.startDate} – ${experience.endDate}`,
    isActive: experience.isCurrent,
    content: <ExperienceCard experience={experience} index={idx} />,
  }));

  const sectionHeader = (
    <div className="flex flex-col items-center gap-4 text-center mb-12 md:mb-16">
      <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground tracking-wider uppercase">
        MY CAREER JOURNEY
      </span>
      <h2
        id="experience-heading"
        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
      >
        Professional{" "}
        <span className="relative inline-block">
          Experience
          <span className="absolute -bottom-1 left-0 h-0.75 w-full rounded-full bg-primary/40" />
        </span>
      </h2>
      <p className="max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed">
        Building meaningful digital experiences through professional
        engagements, full-stack development, and continuous learning.
      </p>
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative w-full py-20 md:py-24 overflow-x-clip">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-8 -translate-x-1/2 h-80 w-full max-w-2xl rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Timeline data={timelineData} header={sectionHeader} />
      </div>
    </MotionConfig>
  );
}
