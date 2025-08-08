"use client";

// Directory: src/sections
// Hero: Above-the-fold intro with animated heading and CTA.

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Container from "@/components/Container";

/**
 * Hero presents the primary identity and call-to-action with subtle motion.
 */
export function Hero() {
  return (
    <section id="home" className="border-b border-zinc-200 py-2 dark:border-zinc-800">
      <Container>
        <div className="flex flex-col items-start gap-6 py-8">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Let&rsquo;s turn &lsquo;Vibe Coders&rsquo; into &lsquo;Reliable Shippers&rsquo;!
            </motion.h1>
          {/* <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400"
          >
            Full‑stack product tinkerer focused on Next.js, TypeScript, and
            thoughtful UX. Weekend projects welcome.
          </motion.p> */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#projects">
              <Button size="lg">Explore Projects</Button>
            </a>
            <a href="#contact">
              <Button variant="secondary" size="lg">
                Contact Me
              </Button>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;