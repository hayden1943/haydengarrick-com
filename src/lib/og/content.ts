import { createHash } from 'node:crypto';
import { projects } from '../../data/projects';
import { latestEpisode, parseEpisodeDate } from '../../data/podcast';
import type { OgCardContent } from './types';

const [afterOfficeHours] = projects;

const latestEpisodeDate = parseEpisodeDate(latestEpisode.date).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export interface VersionedOgCardContent extends OgCardContent {
  /** Short hash of the card's own text — changes only when the copy changes,
   *  so it can be appended to the image URL as a stable cache-busting query
   *  param (`?v=...`) without producing a new value on every unrelated build. */
  version: string;
}

function withVersion(content: OgCardContent): VersionedOgCardContent {
  const version = createHash('sha256')
    .update(JSON.stringify(content))
    .digest('hex')
    .slice(0, 8);
  return { ...content, version };
}

// Single source of truth for every generated OG card's on-image copy. Facts
// that already live elsewhere (show tagline, latest episode number/date) are
// pulled from src/data/* rather than re-typed here, so there's nothing to
// keep in sync by hand when an episode changes.
export const ogContent = {
  home: withVersion({
    id: 'home',
    outputFile: 'home.png',
    title: 'Hayden Garrick',
    description: 'After Office Hours · Any Chair · CarROI',
    footer: 'haydengarrick.com',
    alt: 'Hayden Garrick — After Office Hours, Any Chair, and CarROI.',
  }),
  podcast: withVersion({
    id: 'podcast',
    outputFile: 'podcast.png',
    eyebrow: 'Podcast',
    title: afterOfficeHours.name,
    description: afterOfficeHours.tagline,
    meta: `Episode ${latestEpisode.number} · ${latestEpisodeDate}`,
    footer: 'haydengarrick.com/podcast',
    alt: 'After Office Hours podcast by Hayden Garrick.',
  }),
  writing: withVersion({
    id: 'writing',
    outputFile: 'writing.png',
    eyebrow: 'Writing',
    title: 'Any Chair',
    description: 'Articles exploring business, technology, and the people behind them.',
    footer: 'haydengarrick.com/writing',
    alt: 'Any Chair — essays on business, technology, and leadership.',
  }),
} as const satisfies Record<string, VersionedOgCardContent>;

export type OgContentId = keyof typeof ogContent;

// Builds the versioned public path used as the `image` prop on BaseLayout —
// e.g. "/og/podcast.png?v=3f9a1c2d".
export function ogImagePath(id: OgContentId): string {
  const entry = ogContent[id];
  return `/og/${entry.outputFile}?v=${entry.version}`;
}
