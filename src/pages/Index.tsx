
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Stats } from "@/components/Stats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { SiteConfig } from "@/types/SiteConfig";

// Function to retrieve site configuration from localStorage
const fetchSiteConfig = async (): Promise<SiteConfig> => {
  try {
    const savedConfig = localStorage.getItem('portfolio_site_config');
    
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
    
    // Default configuration if not found in localStorage
    const defaultConfig = {
      title: "Meu Portfólio Profissional",
      subtitle: "Desenvolvedor Web & Designer",
      featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      contactEmail: "contato@exemplo.com",
      contactPhone: "+55 11 12345-6789",
      socialLinks: {
        linkedin: "https://linkedin.com/in/exemplo",
        github: "https://github.com/exemplo",
        twitter: "https://twitter.com/exemplo"
      }
    };
    
    // Save default config if not found
    localStorage.setItem('portfolio_site_config', JSON.stringify(defaultConfig));
    return defaultConfig;
  } catch (error) {
    console.error("Erro ao carregar configuração do site:", error);
    return {
      title: "Meu Portfólio",
      subtitle: "Desenvolvedor Web",
      contactEmail: "contato@exemplo.com",
      contactPhone: "",
      socialLinks: {
        linkedin: "",
        github: "",
        twitter: ""
      }
    };
  }
};

const Index = () => {
  // Fetch site configuration using react-query
  const { data: siteConfig, isLoading } = useQuery({
    queryKey: ['siteConfig'],
    queryFn: fetchSiteConfig,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Carregando site...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar title={siteConfig?.title} />
      <HeroSection title={siteConfig?.title} subtitle={siteConfig?.subtitle} videoUrl={siteConfig?.featuredVideoUrl} />
      <Stats />
      <ProjectGallery />
      <Contact email={siteConfig?.contactEmail} phone={siteConfig?.contactPhone} socialLinks={siteConfig?.socialLinks} />
      <Footer />
    </div>
  );
};

export default Index;
