
export type Project = {
  id: string;
  title: string;
  category: string;
  logoUrl: string;
  imageUrl: string;
  description: string;
  fullDescription?: string;
  video?: string;
  gallery: string[];
  sponsorLogos?: string[];
};
