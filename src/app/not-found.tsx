// Directory: src/app
// Not Found page for unknown routes or project slugs.

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="text-xl font-semibold">Not Found</div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">The page you were looking for doesn’t exist.</p>
      <Link href="/" className="text-sm text-blue-600 underline underline-offset-4">Go home</Link>
    </div>
  );
}