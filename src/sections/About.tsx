"use client";

// Directory: src/sections
// About: Short bio section with subtle animation.

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";

/**
 * About shares a concise personal intro and focus areas.
 */
export function About() {
  return (
    <section id="about" className="border-b border-zinc-200 py-16 dark:border-zinc-800">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            I craft fast, accessible web apps. My toolkit: Next.js, TypeScript,
            Tailwind, and a healthy respect for DX. I care about writing
            maintainable systems that ship quickly and delight users.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export default About;