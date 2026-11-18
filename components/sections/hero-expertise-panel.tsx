import React from "react";
import { Code2, Layers, Server, Sparkles, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ExpertiseItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const expertiseAreas: ExpertiseItem[] = [
  {
    title: "Full-Stack Web Applications",
    description:
      "Responsive, accessible interfaces and end-to-end workflows using React, Next.js, and TypeScript.",
    icon: Layers,
  },
  {
    title: "REST APIs & Databases",
    description:
      "Structured API endpoints, authentication, RBAC, and relational data modeling with Node.js and PostgreSQL.",
    icon: Server,
  },
  {
    title: "Generative AI Integration",
    description:
      "Prompt workflows, structured LLM responses, and practical AI-assisted user experiences.",
    icon: Sparkles,
  },
];

export function HeroExpertisePanel() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
      {/* Subtle radial glow behind card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-tr from-sky-500/12 via-primary/5 to-purple-500/10 blur-2xl dark:from-sky-500/15 dark:via-primary/10 dark:to-purple-500/15"
      />

      <Card className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/90 ring-0 backdrop-blur-md shadow-lg [--card-spacing:--spacing(4)] sm:[--card-spacing:--spacing(5)] dark:bg-card/80">
        {/* Top subtle edge highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent"
        />

        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2 rounded-full bg-muted-foreground/30" />
              <span className="size-2 rounded-full bg-muted-foreground/30" />
              <span className="size-2 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="truncate font-mono text-xs text-muted-foreground">
              core-capabilities.ts
            </span>
          </div>

          <Badge
            variant="secondary"
            className="shrink-0 border border-border/60 bg-secondary/80 font-mono text-[11px] font-medium text-secondary-foreground"
          >
            Next.js · TypeScript
          </Badge>
        </CardHeader>

        <div className="px-(--card-spacing)">
          <Separator className="bg-border/70" />
        </div>

        <CardContent className="space-y-3">
          <h2 className="sr-only">Core Technical Expertise</h2>
          {expertiseAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="group rounded-xl border border-border/70 bg-background/70 p-3.5 transition-colors duration-200 hover:border-primary/30 hover:bg-muted/40 dark:bg-background/40"
              >
                <div className="flex items-start gap-3">
                  <div
                    aria-hidden="true"
                    className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-muted/70 text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10"
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold tracking-tight text-card-foreground">
                      {area.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pt-1">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 truncate font-mono text-[11px] text-foreground/85">
                <Code2
                  className="size-3.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="truncate">
                  React · Next.js · Node.js · PostgreSQL
                </span>
              </span>
              <span className="hidden sm:inline shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                Full-Stack
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
