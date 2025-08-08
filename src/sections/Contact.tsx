"use client";

// Directory: src/sections
// Contact: Call-to-action with email link.

import React from "react";
import { motion } from "framer-motion";
import Container from "@/components/Container";
import { Button } from "@/components/ui/Button";

/**
 * Contact provides a simple CTA to reach out.
 */
export function Contact() {
  return (
    <section id="contact" className="py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start gap-4 rounded-xl border border-zinc-200 p-8 dark:border-zinc-800"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Have an idea or feedback? I’d love to hear from you.
          </p>
          <a href="mailto:hello@example.com">
            <Button size="lg">Email me</Button>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

export default Contact;