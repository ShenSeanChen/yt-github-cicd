"use client";

// Directory: src/components/ui
// Button: A small, composable button component with variants and sizes.
// Google style: concise comments that explain purpose and usage.

import React from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type AppButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/**
 * Button renders a semantic button with simple variant and size styling.
 * Defaults favor accessibility and sensible hover/active states.
 */
export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...rest
}: AppButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-black text-white hover:bg-zinc-800 focus-visible:ring-black ring-offset-white dark:ring-offset-zinc-950",
    secondary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-400 ring-offset-white dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:ring-offset-zinc-950",
    ghost:
      "bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      className={twMerge(base, variantClasses[variant], sizeClasses[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;