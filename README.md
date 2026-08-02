# Personal Site

Hayden Garrick's personal site — built with Astro, TypeScript, and Tailwind CSS. Static output, minimal JS, optimized for a perfect Lighthouse score.

## Stack

- **Astro** (static output) with **TypeScript** (strict)
- **Tailwind CSS v4** for styling
- **Content Collections** for the Writing list (metadata-only Markdown frontmatter — articles are published on LinkedIn, not hosted here)
- **@astrojs/sitemap** for automatic sitemap generation
- View transitions (`astro:transitions`) for smooth page-to-page navigation
- No client-side framework — the only JS shipped is a small scroll-reveal script, a hash-link scroll handler, and the view-transitions router

## Information architecture

The homepage is the primary experience — Hero, After Office Hours, CarROI, Writing (top 3), About/Now, and Contact all live on `/`. Dedicated pages exist only where they add real depth: `/podcast/` (full episode list), `/writing/` (full article list), `/projects/` (all projects). There is no separate About or Contact page — both are homepage sections, reachable via `/#about` and `/#contact`.

## Project structure

```text
src/
├── components/       Reusable UI: Header, Footer, Hero, Button, FeatureSection, ArticleRow,
│                      AboutNow, ContactForm, ProjectCard, PodcastEpisodeCard, etc.
├── content/writing/   Frontmatter-only Markdown — metadata for each LinkedIn article
├── content.config.ts  Content collection schema (title, summary, date, href, readTime)
├── data/              Editable content: projects.ts, podcast.ts, social.ts
├── layouts/           BaseLayout.astro (SEO meta, header/footer, reveal + hash-scroll scripts)
├── pages/             index, podcast, writing, projects, 404
└── styles/            global.css (design tokens + typography scale via Tailwind's @theme)
```

## Before you deploy — personalize these

Everything below is marked `TODO` in the source:

| What | Where |
| --- | --- |
| Real domain | `astro.config.mjs` (`site`), `public/robots.txt` (Sitemap URL) |
| Social links | `src/data/social.ts` |
| Projects (After Office Hours, CarROI) | `src/data/projects.ts` — CarROI's `href` should point to your real waitlist |
| Podcast episodes + platform links | `src/data/podcast.ts` — episode `href` fields are placeholders |
| LinkedIn articles | `src/content/writing/*.md` — add a new file per published article |
| Contact form endpoint | `src/components/ContactForm.astro` (`FORMSPREE_ENDPOINT` — sign up at formspree.io) |
| OG image / favicon | `public/images/og-default.png`, `public/favicon.svg` (regenerate PNGs with `node` + `sharp` if you change the SVG) |

The panels used on the Podcast/CarROI feature sections (`GradientVisual.astro`) are intentionally restrained placeholders — swap them for real product screenshots or podcast artwork via `astro:assets` `<Image />` when you have them, for automatic optimization.

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Type-check content and build to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Type-check the whole project |
# haydengarrick-com
