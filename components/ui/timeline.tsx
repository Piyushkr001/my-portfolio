"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  subtitle?: string;
  isActive?: boolean;
  content: React.ReactNode;
}

export interface TimelineProps {
  data: TimelineEntry[];
  header?: React.ReactNode;
  className?: string;
}

export const Timeline = ({ data, header, className }: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => {
      setHeight(element.getBoundingClientRect().height);
    };

    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn(
        "relative w-full bg-background text-foreground font-sans px-4 md:px-8 lg:px-16 overflow-x-clip",
        className
      )}
      ref={containerRef}
    >
      {header ? (
        <div className="max-w-7xl mx-auto">{header}</div>
      ) : null}

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto pb-8 md:pb-16"
      >
        {data.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className={cn(
              "flex justify-start md:gap-8 lg:gap-10",
              index === 0 ? "pt-2 md:pt-6" : "pt-10 md:pt-16"
            )}
          >
            <div className="sticky top-28 md:top-36 z-30 flex flex-col md:flex-row items-center self-start md:w-64 lg:w-76 shrink-0">
              <div
                aria-hidden="true"
                className="absolute left-0 md:left-3 flex size-8 md:size-10 items-center justify-center rounded-full bg-background border border-border/60 shadow-xs"
              >
                <div
                  className={cn(
                    "size-3 md:size-3.5 rounded-full border transition-colors",
                    item.isActive
                      ? "bg-primary border-primary/40 ring-4 ring-primary/15"
                      : "bg-muted border-border"
                  )}
                />
              </div>

              <div className="hidden md:block md:pl-16 lg:pl-18">
                <p
                  className={cn(
                    "text-lg lg:text-xl font-bold tracking-tight leading-snug",
                    item.isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </p>
                {item.subtitle ? (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                    {item.subtitle}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="relative w-full min-w-0 pl-11 sm:pl-12 md:pl-0">
              <div className="md:hidden mb-3 text-left">
                <p
                  className={cn(
                    "text-base sm:text-lg font-bold tracking-tight",
                    item.isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </p>
                {item.subtitle ? (
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80">
                    {item.subtitle}
                  </p>
                ) : null}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        <div
          aria-hidden="true"
          style={{
            height: `${height}px`,
          }}
          className="pointer-events-none absolute left-[15px] md:left-[31px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          <motion.div
            style={
              shouldReduceMotion
                ? { height, opacity: 0.85 }
                : { height: heightTransform, opacity: opacityTransform }
            }
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
