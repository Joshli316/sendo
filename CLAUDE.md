# Sendō 宣道 — Japan Missions Research Platform

A bilingual (EN/JP), AI-powered research platform connecting 475 years of Christianity in Japan to today's international student ministry. Built by Frontier Commons Innovation Lab. Sister project to **XuanYan 宣研** (China).

## Tech Stack
- TypeScript/HTML single-page app
- Tailwind CSS (dark mode default)
- Vite for bundling
- Cloudflare Pages deployment
- Cloudflare Worker as API proxy for Claude API calls
- No framework — vanilla TypeScript with module bundling

## Structure
```
src/
  index.html          — Homepage
  css/
    main.css          — Tailwind + custom CSS vars
  ts/
    main.ts           — App init, router, language toggle
    i18n.ts           — Bilingual string management (EN/JP)
    timeline.ts       — Animated timeline component
    search.ts         — Full-text search across reports
    map.ts            — Animated spread map (Leaflet)
    chat.ts           — Ask the Archive RAG interface
  pages/
    research/         — 12 research report pages
    tools/            — Interactive tool pages (returnee, training, etc.)
    heritage/         — Hidden Christian / Kakure Kirishitan experience
    personas/         — AI conversation interfaces
    about/            — FC Innovation Lab story
  data/
    reports/          — Report content as JSON (EN + JP)
    timeline.json     — Timeline events (1549-2026)
    personas/         — Persona corpora (Xavier, Verbeck, Uchimura, etc.)
    map-data.json     — Geographic + temporal church data
  assets/
    fonts/            — Noto Serif JP + Inter + JetBrains Mono
    img/              — Sumi-e textures, vermillion accents, portraits
dist/                 — Built output
worker/
  src/index.ts        — CF Worker for Claude API proxy
```

## Entry Point
src/index.html

## Deployment
`wrangler pages deploy dist/`

## Conventions
- All user-facing strings go through i18n.ts — no hardcoded EN or JP text
- CSS custom properties for all colors (dark mode is default, light mode via toggle)
- Bilingual toggle persists to localStorage as `sendo-lang`
- Report content stored as structured JSON with `en` and `jp` fields
- Mobile-first responsive: 375px → 768px → 1024px → 1440px
- Monospace (JetBrains Mono) for data/stats, Serif (Noto Serif JP) for headings, Sans (Inter) for body
- Vermillion accent (#C8323C) on sumi charcoal (#0A0908) — never pure black or pure white
- Sumi-e ink-wash texture as subtle background accent, NOT decoration
- Torii gate motif (vermillion vertical line + horizontal cap) as visual punctuation
- Japanese text uses Noto Serif JP at display sizes (Chinese-style serifs are wrong for JP)
- For Japanese translations, mark AI-translated content with: "AI翻訳 — レビュー待ち" / "AI-translated — review pending"
- All API calls to Claude go through CF Worker proxy at /api/* — never expose API key in client

## Sister Project
XuanYan 宣研 (China) at ~/Desktop/Projects/XuanYan/. Same architecture, different content + aesthetic.
Sendo's design must be visually distinct from XuanYan — vermillion + sumi instead of gold + navy.

## Research Source
~/Desktop/Projects/Research/2026-04-09-japan-missions-scholarship/ (12 reports + NotebookLM deliverables)
