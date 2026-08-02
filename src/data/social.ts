export interface SocialLink {
  label: string;
  href: string;
  icon: 'linkedin' | 'email';
}

// TODO: replace with your real email address.
// Add Instagram back here (with an 'instagram' icon in Icon.astro) only if it's a channel
// you want tied to your professional presence.
export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hayden-garrick', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:hello@haydengarrick.com', icon: 'email' },
];

// Follow link for the "Any Chair" LinkedIn newsletter — used by the Subscribe CTA
// on the homepage and the Writing page.
export const linkedInNewsletterUrl =
  'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7446779891343138817';
