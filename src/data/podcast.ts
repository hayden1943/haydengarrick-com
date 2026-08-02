export interface Episode {
  slug: string;
  number: number;
  title: string;
  guest?: string;
  summary: string;
  date: string; // ISO date
  duration: string;
  href: string;
  // Populated for the latest episode so the homepage and podcast page can embed
  // a player and link out to this specific episode on each platform. Optional
  // because only the currently-featured episode needs them.
  spotifyEmbedUrl?: string;
  appleUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  amazonMusicUrl?: string;
  pocketCastsUrl?: string;
}

// Only real, confirmed episodes belong here — no placeholder entries. Two more
// episodes are expected soon; add them (following the same shape as episode 1)
// once their real links and details are available.
export const episodes: Episode[] = [
  {
    slug: '1-toy-story-5-data-collection',
    number: 1,
    title: 'Toy Story 5: To Data Collection and Beyond',
    summary:
      'Using Toy Story 5 as a jumping-off point, Hayden and Shaun dig into how technology is reshaping childhood — smart toys, data privacy, and the trade-off between screen time and imaginative play.',
    // TODO: confirm the year — Spotify's page only shows "July 20" with no year.
    date: '2026-07-20',
    duration: '31 min',
    href: 'https://open.spotify.com/episode/5fetgNX9pyilTS0POZmXtw',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/episode/5fetgNX9pyilTS0POZmXtw',
    appleUrl: 'https://podcasts.apple.com/us/podcast/after-office-hours/id6792886537',
    spotifyUrl: 'https://open.spotify.com/show/033SW62kOdxaLSb4TaUtSu?si=05d13c1a7f7546cb',
    youtubeUrl: 'https://www.youtube.com/@afterofficehourspc',
    amazonMusicUrl: 'https://music.amazon.com/podcasts/fbc4ea2b-07e7-462e-993b-610d219af2b5/after-office-hours',
    pocketCastsUrl: 'https://pca.st/85j3sr0e',
  },
];

export const latestEpisode = episodes[0];

// `episode.date` is a plain "YYYY-MM-DD" string. `new Date("2026-07-20")` parses
// that as UTC midnight, which renders as the *previous* day once formatted in
// any timezone behind UTC (i.e. most of the US) — "Jul 20" silently becomes
// "Jul 19" on screen. Appending a local time-of-day forces local-time parsing
// instead, so the displayed date always matches what's written here.
export function parseEpisodeDate(dateString: string): Date {
  return new Date(`${dateString}T00:00:00`);
}

export interface PodcastPlatform {
  name: string;
  href: string;
}

const PLATFORM_FIELDS: Array<{ key: keyof Episode; name: string }> = [
  { key: 'appleUrl', name: 'Apple Podcasts' },
  { key: 'spotifyUrl', name: 'Spotify' },
  { key: 'youtubeUrl', name: 'YouTube' },
  { key: 'amazonMusicUrl', name: 'Amazon Music' },
  { key: 'pocketCastsUrl', name: 'Pocket Casts' },
];

// Builds the "Listen elsewhere" platform list for a given episode from its own
// direct per-platform links, skipping any that aren't set.
export function getEpisodePlatforms(episode: Episode): PodcastPlatform[] {
  return PLATFORM_FIELDS.filter(({ key }) => Boolean(episode[key])).map(({ key, name }) => ({
    name,
    href: episode[key] as string,
  }));
}
