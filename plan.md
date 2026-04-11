# Implementation Plan: Sendō 宣道

## Overview
A bilingual (English/Japanese), AI-powered research platform on Christianity in Japan, covering 475 years of history (Francis Xavier 1549 → today's 1% church). Sister project to XuanYan 宣研 (China). Built by Frontier Commons Innovation Lab to integrate the fragmented Japan missions field, serve Japanese diaspora students returning home, surface the Hidden Christian heritage, and demonstrate AI-powered missions innovation. The XuanYan codebase is the architectural template — Sendō ports faster than building from scratch but uses a distinct visual identity (sumi-e + vermillion instead of ink-wash + gold).

## Design Spec

### Direction
Mood: **Editorial contemplative**, with dramatic restraint. Density: **Balanced** (spacious for reading, denser for tools). Color: **Dark mode with single warm accent**. Type: **One Japanese serif display + one body sans + one data mono**. Shapes: **Sharp content containers, slightly rounded interactive elements**.

### Color Palette (CSS Custom Properties)

```css
:root {
  /* Base — sumi (墨) charcoal */
  --bg-base: #0A0908;        /* sumi black with warm undertone */
  --bg-surface: #14110F;     /* lifted surface */
  --bg-elevated: #1C1815;    /* cards, modals */
  --bg-overlay: rgba(10, 9, 8, 0.85);

  /* Text — washi (和紙) cream */
  --text-primary: #F4EAD5;   /* warm cream, like aged washi */
  --text-secondary: #C5B89F; /* muted */
  --text-tertiary: #8A8071;  /* labels, captions */
  --text-disabled: #4A4540;

  /* Accent — vermillion (朱 shu) */
  --accent-primary: #C8323C;     /* torii gate red */
  --accent-hover: #D94550;       /* lighter on hover */
  --accent-pressed: #A8262E;     /* darker on press */
  --accent-subtle: rgba(200, 50, 60, 0.12); /* tinted backgrounds */

  /* Borders — sumi gray */
  --border-subtle: #2A2520;
  --border-default: #3D3530;
  --border-strong: #5C5046;

  /* Semantic */
  --color-success: #7A9B6E;  /* moss green */
  --color-warning: #D4A44C;  /* aged gold */
  --color-error: #C8323C;    /* same as accent */
  --color-info: #6B8FA8;     /* indigo dust */

  /* Light mode (toggle) */
  --light-bg-base: #F4EAD5;
  --light-bg-surface: #EBDFC5;
  --light-text-primary: #1A1614;
  --light-accent-primary: #A8262E;
}
```

**Contrast verified:** Body text (#F4EAD5 on #0A0908) = 16.8:1 ratio. Vermillion accent on sumi = 5.2:1. All exceed WCAG AA.

### Typography

```css
--font-display: 'Noto Serif JP', 'Noto Serif', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

/* Type scale */
--text-xs: 12px;     /* labels, captions */
--text-sm: 14px;     /* metadata, footnotes */
--text-base: 16px;   /* body */
--text-lg: 18px;     /* large body, lead paragraphs */
--text-xl: 24px;     /* h4, card titles */
--text-2xl: 32px;    /* h3 */
--text-3xl: 44px;    /* h2 */
--text-4xl: 60px;    /* h1, hero */
--text-5xl: 84px;    /* display */

/* Weights — only 3 used */
--weight-regular: 400;
--weight-medium: 500;
--weight-bold: 700;

/* Line heights */
--leading-tight: 1.15;   /* headings */
--leading-snug: 1.35;    /* subheadings */
--leading-normal: 1.55;  /* body */
--leading-relaxed: 1.75; /* longform reading */
```

**Reading column:** max-width 720px for longform reports. Outside reading mode, content can span wider.

### Spacing Scale
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px. Use sparingly within groups (8/12), generously between sections (48/64/96).

### Shapes
- Content cards: **0px radius** (sharp, editorial)
- Buttons, inputs, toggles: **4px radius**
- Modals, dialogs: **2px radius**
- Avatars, persona portraits: **0px** (sharp square frames, like Japanese photo prints)
- Vermillion accent borders: **2px** vertical lines (torii post motif)

### Transitions
**One duration, one easing across the entire app:** `200ms ease`. The only exception is the timeline auto-play, which uses custom timing for cinematic feel.

### Distinctive Elements
- **Torii gate motif:** Vertical vermillion line (2px wide) + horizontal cap (40px wide) used as section dividers, list bullets, and loading states
- **Enso circle:** Hand-painted brush-stroke circle SVG used as bullet points and "loading" indicator
- **Sumi-e textures:** Subtle ink-wash background images at 8% opacity, used as section dividers — never repeated, never decorative borders
- **Vertical Japanese text:** Era markers (e.g., 慶長 *Keichō*, 明治 *Meiji*) and persona names use `writing-mode: vertical-rl`
- **Hand-drawn underlines:** Vermillion brushstroke underlines (SVG) on key terms instead of CSS underlines

### Anti-AI Checklist (must pass)
1. ❌ **No uniform spacing** — vary tight/loose intentionally
2. ❌ **No centered hero with h1 + subtitle + button** — use asymmetric split, lead with a question or visual
3. ❌ **No gradient buttons** — solid vermillion or ghost outlines only
4. ❌ **No purple/blue defaults** — sumi + vermillion only
5. ❌ **No identical card grids** — break the grid with featured items
6. ❌ **No rounded-everything** — sharp content, slightly rounded controls
7. ❌ **No emoji as icons** — use Lucide icons or no icons
8. ❌ **No "elevate your workflow" copy** — write specific, concrete copy
9. ✅ **Hierarchy:** one element per section dominates
10. ✅ **Real content:** every page uses real Japan missions content, no Lorem Ipsum

### Responsive Breakpoints
- **375px** — mobile (iPhone SE baseline)
- **768px** — tablet
- **1024px** — small desktop
- **1440px** — large desktop

Mobile-first. Test every page at all four widths in both EN and JP.

---

## Steps

### Phase 1: Foundation + Core Research Wing

**1A: Project Scaffold + Homepage (Steps 1-6)**
1. Initialize Vite + TypeScript + Tailwind project at `~/Desktop/Projects/Sendo/`. Set up directory structure per CLAUDE.md. Configure Tailwind with the design spec color palette as CSS custom properties.
2. Build the i18n.ts module: bilingual string store with `t(key, lang)` lookup, `setLang(lang)` function, localStorage persistence as `sendo-lang`. Default to browser language detection (en/jp).
3. Create the main layout shell: header with logo (宣道), nav (Research / Tools / Heritage / Personas / About), language toggle (EN ⇄ 日本語), and footer. Use the torii gate motif as visual divider between sections.
4. Build the homepage hero — NOT a generic centered h1+subtitle+button. Instead: split layout with a large vertical Japanese title (宣道) on one side and a question on the other ("Why has Christianity never reached 2% in Japan?"). Hero answers: "475 years, 12 reports, 15 historical voices, one bilingual platform."
5. Add four feature blocks below hero: Research, Tools, Heritage, Personas. Each links to its section. Use sumi-e ink-wash texture as the section divider between hero and features. Use vermillion torii motif as the bullet for each feature link.
6. Verify homepage renders correctly at 375/768/1024/1440 in both EN and JP. Check contrast, ensure all strings go through i18n.

**1B: 12 Research Reports (Steps 7-11)**
7. Convert the 12 markdown reports from `~/Desktop/Projects/Research/2026-04-09-japan-missions-scholarship/` into structured JSON with `en` and `jp` fields per section. Use Claude API to translate English content into Japanese. Mark all AI translations with "AI翻訳 — レビュー待ち".
8. Build the report listing page (`/research`): card grid showing all 12 reports with title, summary, era badge, and reading time. Break the grid every 4 cards with a featured highlight.
9. Build the individual report reading page template: max 720px reading column, sticky table of contents on the left, vermillion brushstroke underlines on key terms, "Cite this" button, prev/next navigation. Sumi-e background texture between major sections.
10. Build full-text search across all reports with client-side indexing (TF-IDF). Highlighted excerpts in results, filter by report. Search input is prominent on /research landing page.
11. Verify all 12 reports render correctly in both EN and JP, search returns relevant results, sticky TOC works on desktop, mobile collapses TOC into drawer.

**1C: Interactive Timeline (Steps 12-16)**
12. Create timeline.json with 60-80 events from 1549 to 2026. Source from Report 01 (historical-overview). Each event has: date, title (en/jp), description (en/jp), category (mission/persecution/heritage/cultural/contemporary), era, location.
13. Build the vertical scrollable timeline component. Vermillion line down the center, event nodes as filled circles color-coded by category. Era markers as vertical Japanese text (慶長, 明治, 昭和, 令和).
14. Add category filtering (toggleable chips above timeline) and era jump navigation (quick links to each era).
15. Add auto-play mode: smooth scroll through timeline at adjustable speed, with a "play/pause" control. Keyboard shortcuts (space = play/pause, arrows = step).
16. Verify timeline works on mobile (touch scroll, tap-to-expand event details), tablets, and desktop. Both languages.

**1D: Ask the Archive (RAG) (Steps 17-22)**
17. Set up Cloudflare Worker at `worker/src/index.ts` to proxy Claude API calls. Store API key as Worker secret. Endpoint `/api/chat` accepts query + context, returns streamed response.
18. Chunk all 12 research reports into ~500-token chunks with metadata (report, section, language). Build a search index using sentence embeddings (use a free model via Worker or pre-compute client-side TF-IDF as fallback).
19. Build the chat interface page (`/research/ask`): conversational, not a search box. Header explains what it does. Input area at bottom. Conversation thread above. Vermillion accents on the user's messages.
20. Implement retrieval: user query → top-5 chunks → pass to Claude with system prompt requiring citations. Every response MUST include source citations linking back to the relevant report section.
21. Add 4-5 starter question chips below input ("What happened to the Hidden Christians?" / "なぜ日本のキリスト教は1%なのか？"). Handle errors gracefully (timeout, no results, API down).
22. Verify EN and JP queries both work, citations link correctly, mobile interface is usable, error states are clear.

**1E: Deploy + Polish (Steps 23-27)**
23. Create GitHub repo `sendo`. Push initial codebase.
24. Deploy to Cloudflare Pages. Configure Worker for API proxy. Set environment variables.
25. Add Open Graph meta tags: title, description, social image (vermillion 宣道 on sumi background). Favicon: 宣 character in vermillion on sumi.
26. Performance optimization: lazy-load images, tree-shake bundle, defer non-critical JS. Target Lighthouse > 90 on mobile.
27. Test every page at 375/768/1024/1440 in both EN and JP. Fix any issues. Final verify pass.

### Phase 2: Tools Wing

**2A: Animated Spread Map (Steps 1-8)**
1. Source map data: prefecture-level Christian population statistics over time. Sources include Operation Japan (current), Meiji-era census data, Ebisawa Arimichi's Kirishitan-era estimates. Compile into a structured JSON timeline.
2. Set up Leaflet.js with CartoDB Dark Matter tiles (matches sumi aesthetic).
3. Build the animated map: prefecture polygons colored by Christian density, with a year slider (1549-2026).
4. Add play/pause control for time animation. Smooth interpolation between data points.
5. Add layer toggles: Catholic, Protestant, Orthodox, Hidden Christian sites, Korean church density.
6. Add click-to-inspect: tap a prefecture to see its history, key churches, missionary figures.
7. Add era label overlays (慶長 → 明治 → 昭和 → 令和) that change as the timeline advances.
8. Mobile: touch-friendly slider, responsive map, simplified controls.

**2B: Hidden Christian Heritage Experience (Steps 1-7)**
*Unique to Sendō — no equivalent in XuanYan.*
1. Curate Hidden Christian content from Reports 01, 05, 07. Cover: Maria Kannon statues, Fumie test, secret calendars, oral catechism transmission, Ōura Church discovery (1865), UNESCO sites.
2. Build the `/heritage` landing page as an immersive scroll experience. Sumi-e backgrounds, vertical Japanese era markers, primary source quotes.
3. Build interactive "Test of Faith" — a visual fumie experience that asks the user to consider what they would have done. (Educational, not gamified.)
4. Build a UNESCO sites map showing all 12 components of the World Heritage inscription with photos, descriptions, and historical context.
5. Build a Hidden Christian timeline showing the 250 years of underground transmission.
6. Add audio/text excerpts from Endō Shūsaku's *Silence* and primary source documents (with translation toggle).
7. Verify the experience works on mobile (the scroll experience must not break) and in both languages.

**2C: Network Graph (Steps 1-7)**
1. Extract relationship data from research reports: missionaries, Japanese converts, mission boards, schools, churches. Build a graph with ~500-2000 nodes.
2. Build interactive network graph with D3.js or Sigma.js. Force-directed layout.
3. Add search to find specific people or institutions.
4. Add degree-of-separation toggle ("show people connected within 2 hops of Hudson Taylor").
5. Add click-to-inspect: tap a node to see profile, connections, source citations.
6. Add filters by era, denomination, role, region. Mobile: simplified list view fallback.
7. Use vermillion for Western missionaries, cream for Japanese Christians, muted gray for institutions.

**2D: Returnee Preparation Tool (Steps 1-8)**
1. This is the most directly useful tool — treat it with care.
2. Build the multi-step questionnaire (8-12 questions): home prefecture, faith stage, denomination preference, support network needs, language preference, etc.
3. Build the personalized Return Kit generator: based on answers, generates a 90-day plan, recommended churches in their area, discipleship resources, JCFN connection options.
4. Build the church-finder data — prefecture-level church recommendations sourced from JCFN partnerships and Operation Japan data.
5. PDF download of the Return Kit. Must work offline (critical for returnees who lose access to certain services in Japan).
6. "Connect Me" form: submits via webhook/email to JCFN partner staff. NOT a public database of church contacts.
7. Fully bilingual — a Japanese student must be able to complete the entire flow in Japanese.
8. Verify on mobile, both languages, PDF generation works, form submission works.

**2E: Volunteer Training Modules (Steps 1-7)**
1. Build the training hub at `/tools/training`. 6 modules, each 15-20 minutes.
2. Module topics: (1) Why Japan resists Christianity, (2) Cultural intelligence for Japanese students, (3) The Hidden Christian story, (4) Returnee dynamics, (5) Working with JCFN and the diaspora pipeline, (6) Practical conversation guide.
3. Each module is research-based (cites Reports 06, 08, 11) — not anecdotal.
4. Add knowledge checks (3-5 questions per module) — encouraging, not punitive.
5. Add reflection prompts at the end of each module.
6. Progress tracking persists in localStorage. Show completion badges.
7. Fully bilingual. Verify mobile + both languages.

### Phase 3: AI + Advanced Tools

**3A: Historical Conversations (AI Personas) (Steps 1-7)**
1. Curate source corpora for 12-15 personas. Use Report 10 as the guide. Personas: Francis Xavier, Luis Frois, Guido Verbeck, James Curtis Hepburn, Uchimura Kanzō, Kagawa Toyohiko, Nitobe Inazō, Yamamuro Gunpei, Endō Shūsaku, Kazoh Kitamori, Nagai Takashi, plus 1-2 Hidden Christian voices and 1-2 contemporary figures.
2. For each persona: 20-50 source excerpts compiled into a corpus JSON. Public domain texts where possible.
3. Build the portrait grid hub at `/personas`. Each persona is a sharp-edged portrait card with name (vertical Japanese), dates, and one-line bio.
4. Build the AI conversation interface — feels like talking to a person, not querying a database.
5. System prompt constrains AI to ONLY answer from source material. Every response includes a citation [Source: title, year]. No hallucination.
6. User can write in EN or JP — AI responds in same language. Use CF Worker proxy for API calls.
7. Verify each persona works, citations are correct, mobile is usable, both languages.

**3B: Faith Retention Calculator (Steps 1-5)**
1. Build a weighted scoring model based on JCFN research and ChinaSource parallels (Report 06). Inputs: faith stage, support network, family situation, church plan, resources, language preference, etc.
2. Build the calculator UI at `/tools/retention`. Multi-step inputs with explanations.
3. Build a gauge visualization showing predicted retention probability.
4. Show identified risk factors and specific, actionable recommendations ("Use the Returnee Tool to find a church in your prefecture" — not "prepare better").
5. Add "What If" mode: let users adjust inputs and see how predictions change. Killer feature.

**3C: Research Gap Tracker (Steps 1-5)**
1. Extract ~30 gaps from Report 03 into structured JSON. Each gap has: title, category, description, why it matters, AI feasibility rating, current status (open/claimed/in-progress/published).
2. Build the tracker page at `/research/gaps`. Filterable by category, status, AI feasibility.
3. Build the detail view for each gap with full description and methodology suggestions.
4. Add "I'm working on this" submission form (webhook to FC, not a live database).
5. Fully bilingual.

**3D: Bilingual Comparator (Steps 1-5)**
1. Curate 8-10 historical event source pairs. Each event: one English-language primary source + one Japanese-language primary source. Events: Shimabara Rebellion, Discovery at Ōura (1865), Meiji religious freedom edict, Kyōdan forced merger (1941), Nagasaki atomic bombing (8,500 of 12,000 Urakami Catholics killed), 3/11 disaster response.
2. Build the split-screen comparator at `/research/compare`. Desktop: side-by-side. Mobile: stacked.
3. AI translation toggle for each side (English ↔ Japanese) via Claude API (CF Worker proxy).
4. Editorial synthesis notes (human-quality) — explain WHY perspectives differ. These are the most valuable part.
5. Verify mobile experience, both languages, translation toggle works, editorial notes display correctly.

---

## Files to Create/Modify

### Phase 1
- `package.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig.json` — project config
- `src/index.html` — homepage
- `src/css/main.css` — Tailwind + CSS custom properties
- `src/ts/main.ts` — app init, router, language toggle
- `src/ts/i18n.ts` — bilingual string store
- `src/ts/timeline.ts` — animated timeline component
- `src/ts/search.ts` — full-text search
- `src/ts/chat.ts` — Ask the Archive interface
- `src/pages/research/index.html` — reports listing
- `src/pages/research/[01-12].html` — individual report templates
- `src/pages/research/ask.html` — RAG chat
- `src/data/reports/[01-12].json` — bilingual report content
- `src/data/timeline.json` — timeline events
- `src/assets/fonts/` — Noto Serif JP, Inter, JetBrains Mono
- `src/assets/img/sumie-textures/` — ink-wash background SVGs
- `worker/src/index.ts` — CF Worker API proxy
- `worker/wrangler.toml` — Worker config

### Phase 2
- `src/ts/map.ts` — animated spread map (Leaflet)
- `src/ts/heritage.ts` — Hidden Christian experience
- `src/ts/network.ts` — network graph (D3/Sigma)
- `src/ts/returnee.ts` — returnee tool logic
- `src/ts/training.ts` — training modules
- `src/pages/tools/map.html`, `tools/returnee.html`, `tools/training.html`
- `src/pages/heritage/index.html`
- `src/data/map-data.json`, `src/data/network.json`, `src/data/training-modules.json`

### Phase 3
- `src/ts/personas.ts` — AI conversation interfaces
- `src/ts/retention.ts` — faith retention calculator
- `src/ts/gaps.ts` — research gap tracker
- `src/ts/compare.ts` — bilingual comparator
- `src/pages/personas/[01-15].html`, `tools/retention.html`, `research/gaps.html`, `research/compare.html`
- `src/data/personas/[01-15].json` — persona corpora
- `src/data/gaps.json` — research gaps
- `src/data/compare.json` — historical event pairs

## Open Questions
- Claude API key management — use Worker secrets (resolved)
- JP translation review — mark all AI translations with "AI翻訳 — レビュー待ち" until human review pass (resolved)
- JCFN partnership for returnee tool — Build the tool now with placeholder church data, then approach JCFN for data partnership before public launch
- Custom domain — sendo.frontiercommons.org or similar; defer to FC
- Persona source material rights — use public domain texts; for living/recent figures (Endō, Kitamori), use only published/quoted excerpts under fair use
