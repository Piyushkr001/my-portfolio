"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent rendering until after hydration to avoid mismatch
    return null;
  }

  const isDark = theme === "dark";
  const headingColor = isDark ? "text-white" : "text-zinc-900";
  const subtextColor = isDark ? "text-neutral-300" : "text-zinc-600";

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p
        className={`text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center transition-colors duration-500 ${headingColor}`}
      >
        Welcome to my Portfolio
      </p>
      <p
        className={`text-base md:text-lg mt-4 font-normal inter-var text-center transition-colors duration-500 ${subtextColor}`}
      >
        I'm a full-stack developer with a passion for building innovative web
        applications.
      </p>
    </WavyBackground>
  );
}
