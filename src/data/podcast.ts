export interface Episode {
  slug: string;
  number: number;
  title: string;
  guest?: string;
  summary: string;
  date: string; // ISO date
  duration: string;
  href: string;
}

// TODO: replace with real After Office Hours episodes.
export const episodes: Episode[] = [
  {
    slug: '12-building-in-public',
    number: 12,
    title: 'Building in public without losing your nerve',
    guest: 'Jordan Ellis',
    summary:
      'Jordan on shipping a product update every week, the posts that flopped, and why an audience is a lagging indicator, not a strategy.',
    date: '2026-07-18',
    duration: '48 min',
    href: '#',
  },
  {
    slug: '11-pricing-is-a-feature',
    number: 11,
    title: 'Pricing is a feature, not an afterthought',
    guest: 'Maya Chen',
    summary:
      'How Maya rebuilt her pricing page three times in a year, what moved the needle, and the one experiment that quietly doubled conversion.',
    date: '2026-07-04',
    duration: '41 min',
    href: '#',
  },
  {
    slug: '10-the-nights-and-weekends-tax',
    number: 10,
    title: 'The nights-and-weekends tax',
    summary:
      'A solo episode on the real cost of building after hours — what it does to sleep, relationships, and momentum, and how to budget for it honestly.',
    date: '2026-06-20',
    duration: '29 min',
    href: '#',
  },
];

export const latestEpisode = episodes[0];
