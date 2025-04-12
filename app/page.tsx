// import Image from "next/image";
import { Hero } from "./components/Hero";
import { Projects } from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import About from "@/components/sections/about";
import SkillSection from "@/components/sections/skill";

export default function Home() {
  return (
    <>
      <Hero />
      <About/>
      <SkillSection/>
      <Projects />
      <Contact/>
    </>
  );
}
