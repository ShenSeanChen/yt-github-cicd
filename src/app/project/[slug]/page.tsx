// Directory: src/app/project/[slug]
// Dynamic project page rendering a 3D solar system of topics.

import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Link from "next/link";
import SolarSystemClient from "@/components/solar/SolarSystemClient";
import { projects } from "@/lib/projects";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div className="font-sans">
      <div className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/50">
        <Container>
          <div className="flex h-12 items-center justify-between">
            <Link href="/" className="text-sm opacity-80 hover:opacity-100">← Back</Link>
            <div className="text-sm font-medium">{project.title}</div>
            <div />
          </div>
        </Container>
      </div>

      <section className="py-8">
        <Container>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
        </Container>
        <SolarSystemClient color={project.color} topics={project.topics} />
      </section>
    </div>
  );
}