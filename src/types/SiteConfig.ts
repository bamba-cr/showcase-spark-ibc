
export type SiteConfig = {
  title: string;
  subtitle: string;
  logoUrl?: string; // Added logoUrl field
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
    website?: string;
  };
};
