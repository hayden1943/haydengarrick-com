export interface SocialLink {
  label: string;
  href: string;
  icon: 'linkedin' | 'email';
}

// TODO: replace with your real LinkedIn URL and email address.
// Add Instagram back here (with an 'instagram' icon in Icon.astro) only if it's a channel
// you want tied to your professional presence.
export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:hello@haydengarrick.com', icon: 'email' },
];
