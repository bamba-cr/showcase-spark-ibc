
export type SiteConfig = {
  title: string;
  subtitle: string;
  featuredVideoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
};
