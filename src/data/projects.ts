export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  tags: string[];
  accent: string;
  featured: boolean;
}

// TODO: replace taglines, descriptions, and links with real project details.
export const projects: Project[] = [
  {
    slug: 'after-office-hours',
    name: 'After Office Hours',
    tagline: 'Conversations with builders, off the clock.',
    description:
      'A podcast about what actually happens after the day job ends — the side projects, the late nights, and the decisions that shape what gets built next.',
    href: '/podcast/',
    tags: ['Podcast', 'Interviews'],
    accent: '#0071e3',
    featured: true,
  },
  {
    slug: 'carroi',
    name: 'CarROI',
    tagline: 'Data-driven valuation tools for enthusiast vehicles.',
    description:
      'CarROI models depreciation, financing, insurance, and maintenance to show the real cost-per-mile of any vehicle — so the decision to buy, lease, or hold is backed by data, not guesswork.',
    // TODO: point this at your real waitlist form or landing page.
    href: 'https://example.com/carroi',
    tags: ['Product', 'Finance'],
    accent: '#ff375f',
    featured: true,
  },
  {
    slug: 'this-site',
    name: 'This site',
    tagline: 'A fast, minimal personal site built with Astro.',
    description:
      'Static, image-optimized, and dependency-light on purpose — built to load instantly and stay easy to maintain.',
    href: 'https://github.com/your-handle/personal-site',
    tags: ['Astro', 'TypeScript', 'Tailwind'],
    accent: '#30d158',
    featured: false,
  },
  {
    slug: 'open-source',
    name: 'Open-source contributions',
    tagline: 'Small tools and fixes shared along the way.',
    description:
      'A collection of smaller utilities, scripts, and pull requests — the kind of work that is more useful shared than kept private.',
    href: 'https://github.com/your-handle',
    tags: ['Open source'],
    accent: '#ff9f0a',
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
