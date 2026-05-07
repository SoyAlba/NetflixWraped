# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server with HMR (Vite)
npm run build     # Production build
npm run preview   # Preview built dist
npm run lint      # ESLint (flat config)
```

## Architecture

React 19 + Vite SPA. Two-screen flow: **Upload → Wrapped carousel**.

**State lives in `src/App.jsx`**: single `stats` object drives everything. No routing library — conditional render based on `stats` being null (upload screen) or populated (carousel).

**Data pipeline** (`src/utils/dataProcessor.js`):
- PapaParse reads Netflix CSV export
- Encoding fix layer handles Latin-1/UTF-8 mojibake from Netflix exports
- Title parser extracts show/season/episode from Spanish format: `"Show: Temporada N: Episode"`
- `computeStats()` returns 20+ metrics (top shows, binge day, streak, monthly breakdown, heatmap, etc.)

**Carousel** (`src/components/Wrapped.jsx`):
- 8 slides rendered in order, Framer Motion handles directional entry/exit
- Navigation: keyboard (arrows/space), touch swipe, dot indicators, arrow buttons

**Slides** (`src/components/slides/`): stateless, receive stats as props, self-contained animations with staggered delays.

## Key Conventions

- UI text in Spanish (months, days, labels)
- Netflix color scheme: `#E50914` red, `#141414` dark bg
- Slide pattern: dark gradient background + radial accent + Framer Motion variants with 0.2–1.4s staggered delays
- Transition timing: `0.45s cubic-bezier(0.4, 0, 0.2, 1)`
- Top shows capped at 8 in `computeStats()`
- "Current obsession" = last 14 days of watch history

## Adding a Slide

1. Create `src/components/slides/NewSlide.jsx` — follow existing stateless pattern
2. Add to slide array in `src/components/Wrapped.jsx`
3. Pass needed stats fields (verify they exist in `computeStats()` output)
