"use client";

// Directory: src/sections
// Projects: Highlight recent work with animated cards.

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";

export type Project = {
  title: string;
  description: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description: "A performant, animated site built with Next.js and Tailwind.",
    link: "#",
  },
  {
    title: "Open Source Starter",
    description: "A clean template with CI, linting, and tests configured.",
    link: "#",
  },
  {
    title: "Tiny SaaS",
    description: "Weekend product with auth, billing, and deployment pipeline.",
    link: "#",
  },
];

/**
 * Projects renders a responsive grid of project summaries.
 */
export function Projects() {
  return (
    <section id="projects" className="border-b border-zinc-200 py-16 dark:border-zinc-800">
      <Container>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            A few things I enjoyed building recently.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target={p.link?.startsWith("http") ? "_blank" : undefined}
              rel={p.link?.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group rounded-lg border border-zinc-200 p-5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="mb-2 text-base font-medium">{p.title}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">{p.description}</div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;