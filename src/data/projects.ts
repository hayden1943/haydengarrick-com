export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  // A short, secondary status shown next to the project's CTA (e.g. "Private beta").
  // Omit once a project has shipped publicly.
  status?: string;
}

// TODO: replace taglines, descriptions, and links with real project details.
export const projects: Project[] = [
  {
    slug: 'after-office-hours',
    name: 'After Office Hours',
    tagline: 'Conversations when the work day ends and the students go home.',
    description:
      'A podcast about what actually happens after the day job ends — the side projects, the late nights, and the decisions that shape what gets built next.',
    href: '/podcast/',
  },
  {
    slug: 'carroi',
    name: 'CarROI',
    tagline: 'Data-driven valuation tools for enthusiast vehicles.',
    description:
      'CarROI models depreciation, financing, insurance, and maintenance to show the real cost-per-mile of any vehicle — so the decision to buy, lease, or hold is backed by data, not guesswork.',
    href: 'https://www.carroiapp.com/',
    status: 'Private beta',
  },
];
