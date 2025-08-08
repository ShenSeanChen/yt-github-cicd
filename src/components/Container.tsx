"use client";

// Directory: src/components
// Container: Page width constraint for consistent layout spacing.

import React from "react";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Container constrains content to a readable width with responsive padding.
 */
export function Container({ children, className }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className ?? ""}`}>{children}</div>;
}

export default Container;