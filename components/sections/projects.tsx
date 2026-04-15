"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLinkIcon } from "lucide-react";

interface Project {
  images: string;
  link: string;
  title: string;
  tag: string;
}

const projects: Project[] = [
  {
    images:
      "https://image.thum.io/get/width/1200/crop/800/https://blogging-platform-tau.vercel.app/",
    link: "https://blogging-platform-tau.vercel.app/",
    title: "Blogging Platform",
    tag: "Full Stack",
  },
  {
    images:
      "https://image.thum.io/get/width/1200/crop/800/https://excel-analytic.vercel.app/",
    link: "https://excel-analytic.vercel.app/",
    title: "Excel Analytics",
    tag: "Data Viz",
  },
  {
    images:
      "https://image.thum.io/get/width/1200/crop/800/https://ai-content-fawn.vercel.app/",
    link: "https://ai-content-fawn.vercel.app/",
    title: "AI Content Generator",
    tag: "AI / LLM",
  },
  {
    images:
      "https://image.thum.io/get/width/1200/crop/800/https://uiuxmock.vercel.app/",
    link: "https://uiuxmock.vercel.app/",
    title: "UI/UX Mock Tool",
    tag: "Design Tool",
  },
  {
    images:
      "https://www.talentlms.com/blog/wp-content/uploads/2024/05/AI_Learning_29May2024_big-.png",
    link: "https://online-learning-platform-ecru.vercel.app/",
    title: "Online Learning Platform",
    tag: "EdTech",
  },
  {
    images:
      "https://play-lh.googleusercontent.com/HOnQyPxVCPr7W50rXUp6bu1-UZo2bM_GuQ9coNItncFrP117qbkadZpc60qVmJ5-kw=w526-h296-rw",
    link: "https://github.com/Piyushkr001/Weather_Forcasting_App",
    title: "Weather Forecast App",
    tag: "Mobile",
  },
  {
    images: "https://i.ytimg.com/vi/dS95PJntXxQ/maxresdefault.jpg",
    link: "https://github.com/Piyushkr001/zero2hero",
    title: "Zero2Hero",
    tag: "Open Source",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center mb-16">
        <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground tracking-wider uppercase">
          My Work
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Featured{" "}
          <span className="relative inline-block">
            Projects
            <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/40" />
          </span>
        </h2>
        <p className="max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed">
          A curated collection of live apps, tools, and experiments — each
          solving a real problem.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {projects.map((project, idx) => (
          <motion.div key={idx} variants={cardVariants}>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              {/* Browser chrome bar */}
              <div className="flex items-center gap-1.5 bg-muted/60 border-b border-border px-3 py-2">
                <span className="size-2.5 rounded-full bg-red-400/80" />
                <span className="size-2.5 rounded-full bg-yellow-400/80" />
                <span className="size-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 flex-1 rounded-sm bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground truncate">
                  {project.link.replace(/^https?:\/\//, "")}
                </span>
              </div>

              {/* Screenshot with overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={project.images}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <ExternalLinkIcon className="size-6 text-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    View Project
                  </span>
                </div>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-sm font-semibold text-foreground truncate">
                  {project.title}
                </p>
                <span className="ml-3 shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                  {project.tag}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}