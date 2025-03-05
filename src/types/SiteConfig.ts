
export type SiteConfig = {
  title: string;
  subtitle: string;
  featuredVideoUrl?: string;
  featuredVideoType?: "youtube" | "vimeo" | "custom";
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    website?: string; // Added website field (optional)
  };
};
