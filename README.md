# Arpit Agarwal — Portfolio

A single-page editorial portfolio. Paper, ink, vermilion. Newsreader and Fraunces over JetBrains Mono. An interactive terminal in the masthead and a `⌘K` command palette for navigation.

## Stack

- **React 19** (no UI library, no CSS framework)
- **Vite 7** for the build
- **Inline CSS + CSS custom properties** for theming
- **IntersectionObserver** for scroll-triggered reveals

No `framer-motion`, no `styled-components`, no `tailwindcss`. ~245 KB JS / 74 KB gzip.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve the built site
npm run lint
```

## Structure

```
src/
  App.jsx                       — page composition + scroll-reveal observer
  components/
    common/                     — Topbar (Navbar.jsx), Footer
    sections/                   — Hero, About, Skills, Experience, Projects,
                                  Education, Contact
    ui/CommandPalette.jsx       — ⌘K palette
  data/                         — content (personal, experience, projects, skills)
  index.css                     — global styles + CSS variables
public/
  favicon.svg, og.svg           — brand assets
```

All content lives in `src/data/`. Update the JS objects there to change what's rendered.

## Deploy

Vercel auto-detects Vite. Import the repo, click deploy. No env vars, no build flags.
