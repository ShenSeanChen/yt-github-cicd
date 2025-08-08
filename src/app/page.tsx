// Directory: src/app
// Home page composes the site sections for the landing experience.

import Navbar from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  );
}
