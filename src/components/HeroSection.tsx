
import { motion } from "framer-motion";
import { ChevronDown, Facebook, Instagram, Globe } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  videoType?: "youtube" | "vimeo" | "custom";
  logoUrl?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
}

export const HeroSection = ({ 
  title = "Instituto IBC", 
  subtitle = "Transformando vidas", 
  videoUrl,
  videoType = "youtube",
  logoUrl,
  socialLinks = {}
}: HeroSectionProps) => {
  const renderVideo = () => {
    if (!videoUrl) {
      return (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1469041797191-50ace28483c3"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" 
            type="video/mp4" 
          />
          <img
            src="https://images.unsplash.com/photo-1469041797191-50ace28483c3"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </video>
      );
    }

    if (videoType === "custom") {
      return (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      );
    }

    return (
      <iframe
        className="w-full h-full object-cover"
        src={videoUrl}
        title="Featured Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  };

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        {renderVideo()}
      </div>
      
      <div className="relative z-20 text-center w-full max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo Image - Responsive sizing */}
          {logoUrl && (
            <div className="mb-6 flex justify-center">
              <motion.img 
                src={logoUrl} 
                alt="Logo" 
                className="w-auto max-w-[85%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] h-auto mx-auto object-contain rounded-lg shadow-lg" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  minHeight: "80px", 
                  maxHeight: "200px" 
                }}
              />
            </div>
          )}
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 font-heading">
            {title}
          </h1>
          
          <p className="text-lg text-white/90 mb-4">
            {subtitle}
          </p>
          
          {/* Social Media Links now placed below subtitle */}
          <div className="flex justify-center space-x-4 mb-6">
            {socialLinks?.facebook && (
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Facebook"
              >
                <Facebook className="text-white w-6 h-6" />
              </a>
            )}
            {socialLinks?.instagram && (
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Instagram"
              >
                <Instagram className="text-white w-6 h-6" />
              </a>
            )}
            {socialLinks?.website && (
              <a 
                href={socialLinks.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-all"
                aria-label="Website"
              >
                <Globe className="text-white w-6 h-6" />
              </a>
            )}
          </div>
          
          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <a href="#projects" className="px-6 py-2 rounded-full bg-white text-primary text-sm">
              Projetos
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-white w-6 h-6" />
        </motion.div>
      </div>
    </div>
  );
};
