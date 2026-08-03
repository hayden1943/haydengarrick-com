// Typed content for a single generated Open Graph card. Every field here is
// what actually gets drawn on the 1200x630 PNG — see `template.ts` for layout
// and `content.ts` for the real per-page values.
export interface OgCardContent {
  /** Unique key, also used as the base for the output filename. */
  id: string;
  /** Filename written under public/og/, e.g. "podcast.png". */
  outputFile: string;
  /** Small uppercase label above the title (e.g. "Podcast"). Omit for none. */
  eyebrow?: string;
  /** Large headline. Required — this is the dominant element on the card. */
  title: string;
  /** Secondary line under the title (tagline, article dek, etc). */
  description?: string;
  /** Small tertiary line under the description (episode number, date, status). */
  meta?: string;
  /** Footer text, bottom-left (e.g. "haydengarrick.com/podcast"). */
  footer: string;
  /** Page-specific alt text for the <meta property="og:image:alt"> tag. */
  alt: string;
}
