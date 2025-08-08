"use client";

// Directory: src/components
// Navbar: Sticky top navigation with anchor links to sections.

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Navbar renders a site brand and anchor links. It remains visible on scroll.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/50">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#" className="font-semibold tracking-tight">
          <span>Personal Site</span>
        </Link>
        <div className="hidden gap-6 text-sm sm:flex">
          <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
          <a href="#about" className="opacity-80 hover:opacity-100">About</a>
          <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden sm:block">
            <Button size="sm">Get in touch</Button>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;