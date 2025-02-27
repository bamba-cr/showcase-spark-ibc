
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Vídeo de fundo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/70 z-10" /> {/* Overlay roxo */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1469041797191-50ace28483c3"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" type="video/mp4" />
          {/* Fallback para navegadores que não suportam vídeo */}
          <img
            src="https://images.unsplash.com/photo-1469041797191-50ace28483c3"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Conteúdo centralizado */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading leading-tight">
            Instituto IBC
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
            Transformando vidas através do esporte e da educação
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-white text-primary font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Nossos Projetos
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-primary-light text-white font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Entre em Contato
            </a>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-white w-8 h-8" />
        </motion.div>
      </div>
    </div>
  );
};
