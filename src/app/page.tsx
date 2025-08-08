// Directory: src/app
// Home page composes the site sections for the landing experience.

import Navbar from "@/components/Navbar";
import { SolarSystem } from "@/sections/SolarSystem";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
// import { Anime3D } from "@/sections/Anime3D";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <SolarSystem />
        {/* <Anime3D /> */}
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  );
}
