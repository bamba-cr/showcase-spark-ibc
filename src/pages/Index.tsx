import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Stats } from "@/components/Stats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfig } from "@/utils/databaseService";

const preloadMedia = (urls) => {
  urls.forEach((url) => {
    if (!url) return;
    
    if (url.endsWith(".mp4") || url.endsWith(".webm")) {
      const video = document.createElement("video");
      video.src = url;
      video.preload = "auto";
      video.muted = true;
      video.play();
    } else {
      const img = new Image();
      img.src = url;
    }
  });
};

const Index = () => {
  // Fetch site configuration using react-query
  const { data: siteConfig, isLoading } = useQuery({
    queryKey: ["siteConfig"],
    queryFn: fetchSiteConfig,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
  });

  useEffect(() => {
    if (siteConfig) {
      const mediaUrls = [
        siteConfig.logoUrl,
        siteConfig.featuredVideoUrl,
        ...(siteConfig.projectImages || []),
      ];
      preloadMedia(mediaUrls);
    }
  }, [siteConfig]);

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

  const heroSocialLinks = {
    facebook: siteConfig?.socialLinks?.facebook,
    instagram: siteConfig?.socialLinks?.instagram,
    website: siteConfig?.socialLinks?.website,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar title={siteConfig?.title} />
      <HeroSection 
        title={siteConfig?.title} 
        subtitle={siteConfig?.subtitle}
        logoUrl={siteConfig?.logoUrl}
        videoUrl={siteConfig?.featuredVideoUrl}
        videoType={siteConfig?.featuredVideoType} 
        socialLinks={heroSocialLinks}
        lazy={true} // Ativa lazy loading
        autoPlay={true} // Inicia automaticamente
        muted={true} // Deixa mudo para evitar bloqueios de autoplay
        loop={true} // Faz o vídeo rodar em loop
      />
      <Stats />
      <ProjectGallery images={siteConfig?.projectImages} lazy={true} />
      <Contact email={siteConfig?.contactEmail} phone={siteConfig?.contactPhone} socialLinks={siteConfig?.socialLinks} />
      <Footer />
    </div>
  );
};

export default Index;
