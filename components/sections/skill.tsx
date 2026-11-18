"use client";

import React from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  Code2,
  Database,
  LayoutTemplate,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Separator } from "@/components/ui/separator";
import { highlightedSkills, skillCategories } from "@/data/skills";
import type { SkillCategoryId } from "@/types/skills";

const categoryIcons: Record<SkillCategoryId, LucideIcon> = {
  languages: Code2,
  frontend: LayoutTemplate,
  backend: Server,
  "data-auth": Database,
  ai: Sparkles,
  tools: Wrench,
};

export default function SkillSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="skill"
        aria-labelledby="skills-heading"
        className="relative w-full py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-16 scroll-mt-24 overflow-x-clip"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-8 -translate-x-1/2 h-72 w-full max-w-2xl rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center mb-10 md:mb-12">
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground tracking-wider uppercase">
              TECHNICAL TOOLKIT
            </span>
            <h2
              id="skills-heading"
              className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              Technical{" "}
              <span className="relative inline-block">
                Skills
                <span className="absolute -bottom-1 left-0 h-0.75 w-full rounded-full bg-primary/40" />
              </span>
            </h2>
            <p className="max-w-2xl text-muted-foreground text-sm md:text-base leading-relaxed">
              Languages, frameworks, databases, AI integrations, and engineering
              practices used across production applications and testing
              workflows.
            </p>
          </div>

          {/* Animated Highlight Flipper */}
          <div
            aria-hidden="true"
            className="mb-12 flex justify-center max-w-full"
          >
            <ContainerTextFlip
              words={highlightedSkills}
              interval={2800}
              animationDuration={400}
              className="text-2xl sm:text-4xl md:text-5xl px-5 py-2.5"
            />
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => {
              const Icon = categoryIcons[category.id];
              return (
                <motion.div
                  key={category.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.2),
                    ease: "easeOut",
                  }}
                >
                  <Card className="h-full rounded-2xl border border-border/80 bg-card/95 ring-0 [--card-spacing:--spacing(5)] shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md dark:bg-card/85">
                    <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          aria-hidden="true"
                          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/70 text-primary"
                        >
                          <Icon className="size-4" />
                        </div>
                        <CardTitle>
                          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-card-foreground">
                            {category.title}
                          </h3>
                        </CardTitle>
                      </div>

                      <Badge
                        variant="secondary"
                        className="shrink-0 border border-border/60 bg-secondary/80 text-xs font-medium text-secondary-foreground"
                      >
                        {category.items.length}
                      </Badge>
                    </CardHeader>

                    <div className="px-(--card-spacing)">
                      <Separator className="bg-border/70" />
                    </div>

                    <CardContent>
                      <ul
                        aria-label={`${category.title} skills`}
                        className="flex flex-wrap gap-1.5"
                      >
                        {category.items.map((skill) => (
                          <li key={skill}>
                            <Badge
                              variant="outline"
                              className="border-border/80 bg-muted/40 font-normal text-foreground/85 transition-colors hover:bg-muted/70"
                            >
                              {skill}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
