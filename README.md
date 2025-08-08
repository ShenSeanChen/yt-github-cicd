# Personal Site (Next.js + 3D Solar System)

A vibe-friendly, reliable personal website built with Next.js 15, Tailwind, and React Three Fiber. It ships fast, looks wow, and stays safe with tiny guardrails.

## Quickstart

1) Clone and install
```bash
git clone <your-repo-url>
cd personal-site
npm i
```

2) Run locally
```bash
npm run dev
# open http://localhost:3000
```

3) Build (sanity check)
```bash
npm run build
```

## What’s inside
- Interactive 3D Solar System home (click planets to view project details)
- Clean sections: Hero, Projects, About, Contact
- TypeScript, ESLint, Tailwind pre-configured

## “Vibe → reliable” workflow (solo friendly)

- **Main = your live show**
  - Don’t push straight to `main`.
  - Make a branch: `git switch -c feat/my-change`.

- **Preview = dress rehearsal**
  - Connect GitHub repo to Vercel or Lovable.
  - Every PR gets a Preview URL you can click and share.

- **Robot check = tiny safety tunnel (optional but recommended)**
  - Add `.github/workflows/ci.yml` to run: `tsc`, `eslint`, `next build` on PRs.
  - In repo Settings → Branch protection on `main`: require PR + passing checks.

- **Ship = one smooth move**
  - Merge PR → auto deploy to Production.
  - If you want a pause: require one approval (you) via GitHub Environments.

- **Secrets = keep keys off-stage**
  - Put example keys in `.env.example` (no real values).
  - Store real values in Vercel/Lovable (Preview vs Production).

## Make your first change (example)

1) Create a branch
```bash
git switch -c feat/update-hero-copy
```

2) Edit the text in `src/sections/Hero.tsx` and save.

3) Local check (fast):
```bash
npx tsc --noEmit && npm run lint && npm run build
```

4) Commit and push
```bash
git add -A
git commit -m "feat(hero): sharper intro copy"
git push -u origin feat/update-hero-copy
```

5) Open PR
- Confirm checks are green (or fix red).
- Click the Preview URL and review the change.

6) Merge → Deploy
- Merge when happy. If prod is gated, approve the deploy.
- If something’s off, rollback from the host dashboard.

## Files you’ll touch most
- `src/sections/SolarSystem.tsx` — the 3D home scene
- `src/sections/Hero.tsx` — headline & CTAs
- `src/sections/Projects.tsx` — project grid
- `src/lib/projects.ts` — project metadata (titles, colors, topics)

## Optional: Minimal CI file
Create `.github/workflows/ci.yml`:
```yaml
name: CI
on:
  pull_request:
    branches: [ main ]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run lint --if-present
      - run: npm run build
```

## Troubleshooting
- Build fails on `_document` or favicon: this repo includes a minimal `src/pages/_document.tsx` and `app/icon.ico` to keep Next happy.
- 3D feels heavy: lower star counts in `SolarSystem.tsx` or disable Bloom.

---

Happy shipping! Keep the vibes—add just enough guardrails to never ship oopsies.
