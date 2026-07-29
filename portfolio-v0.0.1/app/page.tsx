"use client";

import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import ExperienceEducation from "./sections/ExperienceEducation";
import Skills from "./sections/Skills";
import About from "./sections/About";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-surface">
      <Hero />
      <Projects />
      <Skills />
      <ExperienceEducation />
      <About />
      <Contact />
    </main>
  );
}
