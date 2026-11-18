// import Image from "next/image";
import { Hero } from "./components/Hero";
import About from "@/components/sections/about";
import ExperienceSection from "@/components/sections/experience";
import SkillSection from "@/components/sections/skill";
import { Projects } from "@/components/sections/projects";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="scroll-mt-24"
      >
        <ExperienceSection />
      </section>
      <SkillSection />
      <Projects />
      <Contact />
    </>
  );
}
