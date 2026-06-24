import React from "react";
import { ContainerTextFlip } from "../ui/container-text-flip";

export default function SkillSection() {
  return (
    <section
      id="skill"
      className="flex flex-col justify-center items-center gap-10 mt-5 p-10"
    >
      <h2 className="text-4xl font-bold">Skills</h2>

      <ContainerTextFlip
        words={[
          "JavaScript",
          "TypeScript",
          "React.js",
          "Next.js",
          "Node.js",
          "REST APIs",
          "Next.js API Routes",
          "Server Actions",
          "Tailwind CSS",
          "Shadcn UI",
          "NextUI",
          "Bootstrap",
          "PostgreSQL",
          "MongoDB",
          "Drizzle ORM",
          "JWT Authentication",
          "Clerk",
          "Git",
          "GitHub",
          "Vercel",
          "Vite",
          "Responsive Design",
          "Performance Optimization",
          "SEO",
          "Debugging",
        ]}
      />
    </section>
  );
}