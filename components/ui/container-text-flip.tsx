"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
  /** Visual variant for container styling */
  variant?: "default" | "subtle";
}

export function ContainerTextFlip({
  words = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Bootstrap",
    "Gemini",
    "TypeScript",
    "React",
    "Next.js",
    "NextUI",
    "Clerk",
    "Shadcn",
    "Aceternity UI",
    "Tailwind CSS",
    "SQL",
    "Git",
    "GitHub",
  ],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 450,
  variant = "default",
}: ContainerTextFlipProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState<number | "auto">("auto");
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const safeWords = words.length > 0 ? words : [""];
  const activeIndex = shouldReduceMotion
    ? 0
    : currentWordIndex % safeWords.length;
  const activeWord = safeWords[activeIndex];

  useEffect(() => {
    if (shouldReduceMotion || safeWords.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % safeWords.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [safeWords.length, interval, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !containerRef.current || !measureRef.current) {
      return;
    }

    const updateWidth = () => {
      if (!containerRef.current || !measureRef.current) return;
      const styles = window.getComputedStyle(containerRef.current);
      const horizontalChrome =
        parseFloat(styles.paddingLeft) +
        parseFloat(styles.paddingRight) +
        parseFloat(styles.borderLeftWidth) +
        parseFloat(styles.borderRightWidth);
      const textWidth = measureRef.current.getBoundingClientRect().width;
      setWidth(Math.ceil(textWidth + horizontalChrome + 2));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [activeWord, shouldReduceMotion]);

  const variantClasses =
    variant === "subtle"
      ? "rounded-xl border border-border/80 bg-card/90 px-3 py-1 text-base sm:text-lg md:text-xl font-semibold text-foreground shadow-xs"
      : cn(
          "rounded-lg px-4 pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl dark:text-white",
          "[background:linear-gradient(to_bottom,#f3f4f6,#e5e7eb)]",
          "shadow-[inset_0_-1px_#d1d5db,inset_0_0_0_1px_#d1d5db,_0_4px_8px_#d1d5db]",
          "dark:[background:linear-gradient(to_bottom,#374151,#1f2937)]",
          "dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]"
        );

  const durationSeconds = animationDuration / 1000;

  return (
    <motion.div
      ref={containerRef}
      animate={
        width !== "auto" && !shouldReduceMotion ? { width } : undefined
      }
      transition={{ duration: durationSeconds * 0.8, ease: "easeInOut" }}
      className={cn(
        "relative inline-flex max-w-full items-center justify-center overflow-hidden whitespace-nowrap align-middle",
        variantClasses,
        className
      )}
    >
      {/* Hidden sizer keeps width transitions accurate independent of AnimatePresence exit timing */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none invisible absolute whitespace-nowrap",
          textClassName
        )}
      >
        {activeWord}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={activeWord}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{
            duration: shouldReduceMotion ? 0 : durationSeconds * 0.65,
            ease: "easeOut",
          }}
          className={cn("inline-block truncate", textClassName)}
        >
          {activeWord}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
