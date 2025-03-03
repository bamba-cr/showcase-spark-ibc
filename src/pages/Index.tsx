
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Stats } from "@/components/Stats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfig } from "@/utils/databaseService";

const Index = () => {
  // Fetch site configuration using react-query
  const { data: siteConfig, isLoading } = useQuery({
    queryKey: ['siteConfig'],
    queryFn: fetchSiteConfig,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
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
