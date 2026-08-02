# Personal Site

Hayden Garrick's personal site — built with Astro, TypeScript, and Tailwind CSS. Static output, minimal JS, optimized for a perfect Lighthouse score.

## Stack

- **Astro** (static output) with **TypeScript** (strict)
- **Tailwind CSS v4** for styling
- **Content Collections** for the Writing list (metadata-only Markdown frontmatter — articles are published on LinkedIn, not hosted here)
- **@astrojs/sitemap** for automatic sitemap generation
- View transitions (`astro:transitions`) for page-to-page navigation
- No client-side framework — the only JS shipped is a small scroll-reveal/stagger observer, a hash-link scroll handler, and the view-transitions router

## Design direction

Editorial and institutional rather than product-marketing: a wordmark-only hero (no tagline, no CTA pair), full-width text rows divided by thin rules instead of cards or visual panels, and a restrained accent blue used only on hover/interaction states. See `src/styles/global.css` for the full color and motion token system (`--duration-fast/standard/reveal`, `--ease-standard`).

## Information architecture

The homepage is the entire primary experience — wordmark, After Office Hours, CarROI, Selected Writing, and Connect all live on `/` as one continuous, scannable scroll. There is no About page and no contact form. Dedicated pages exist only where they add real depth: `/podcast/` (full episode list), `/writing/` (full article list), `/projects/` (all projects).

## Project structure

```text
src/
├── components/       Header, Footer, Hero, Button, SectionRow, FeatureSection,
│                      ArticleRow, Connect, ProjectCard, PodcastEpisodeCard, Icon
├── content/writing/   Frontmatter-only Markdown — metadata for each LinkedIn article
├── content.config.ts  Content collection schema (title, summary, date, href)
├── data/              Editable content: projects.ts, podcast.ts, social.ts
├── layouts/           BaseLayout.astro (SEO meta, header/footer, reveal + hash-scroll scripts)
├── pages/             index, podcast, writing, projects, 404
└── styles/            global.css (color/type/motion tokens via Tailwind's @theme)
```

## Before you deploy — personalize these

Everything below is marked `TODO` in the source:

| What | Where |
| --- | --- |
| Real domain | `astro.config.mjs` (`site`), `public/robots.txt` (Sitemap URL) |
| LinkedIn URL + email | `src/data/social.ts` — also add Instagram here (with an `instagram` icon in `Icon.astro`) only if you want it tied to your professional presence |
| Projects (After Office Hours, CarROI) | `src/data/projects.ts` — CarROI's `href` should point to your real waitlist |
| Podcast episodes | `src/data/podcast.ts` — episode `href` fields are placeholders |
| LinkedIn articles | `src/content/writing/*.md` — add a new file per published article |
| OG image / favicon | `public/images/og-default.png`, `public/favicon.svg` (regenerate PNGs with `node` + `sharp` if you change the SVG) |

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Type-check content and build to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Type-check the whole project |

# haydengarrick-com
