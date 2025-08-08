// Directory: src/lib
// Project metadata used by the 3D galaxy and solar system scenes.

export type ProjectTopic = {
  title: string;
  description?: string;
  link?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  description: string;
  color: string;
  topics: ProjectTopic[];
};

export const projects: ProjectMeta[] = [
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    description: "Animated Next.js site with crisp UX and CI guardrails.",
    color: "#A78BFA",
    topics: [
      { title: "Landing UX", description: "Hero, navbar, responsive grid." },
      { title: "Animations", description: "Framer motion and 3D." },
      { title: "CI/CD", description: "Type, lint, build on PR." },
    ],
  },
  {
    slug: "starter",
    title: "Open Source Starter",
    description: "Clean template: ESLint, Prettier, tests, and scripts.",
    color: "#34D399",
    topics: [
      { title: "Linting", description: "Strict + autofix setup." },
      { title: "Tests", description: "Vitest/Jest baseline." },
      { title: "Release", description: "Semver and changelog." },
    ],
  },
  {
    slug: "tiny-saas",
    title: "Tiny SaaS",
    description: "Weekend product with auth, billing, and deploys.",
    color: "#F472B6",
    topics: [
      { title: "Auth", description: "Clerk/Auth.js basics." },
      { title: "Billing", description: "Stripe subscriptions." },
      { title: "Deploy", description: "Vercel/Lovable flow." },
    ],
  },
];