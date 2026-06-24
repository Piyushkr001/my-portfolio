"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
    <WavyBackground className="max-w-4xl mx-auto pb-40 px-4">
      <p
        className={`text-2xl md:text-4xl lg:text-7xl font-bold inter-var text-center transition-colors duration-500 ${headingColor}`}
      >
        Welcome to my Portfolio
      </p>
      <p
        className={`text-base md:text-lg mt-4 font-normal inter-var text-center transition-colors duration-500 ${subtextColor}`}
      >
       Full Stack Web Developer with hands-on experience in React.js, Next.js, TypeScript, REST APIs, and responsive web application development.
      </p>
      <div className="flex justify-center mt-8">
        <Button
          size="lg"
          className="cursor-pointer"
          nativeButton={false}
          render={(props) => (
            <a
              {...props}
              href="/Piyush__Resume.pdf"
              download="Piyush__Resume.pdf"
            >
              Download Resume <Download className="ml-2 size-5" />
            </a>
          )}
        />
      </div>
    </WavyBackground>
  );
}
