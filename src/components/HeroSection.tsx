
import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/70" />
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
        <div className={`text-center transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-accent">
            Instituto IBC
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 text-accent/90">
            Transformando vidas através da educação e do esporte
          </p>
          <button
            onClick={scrollToProjects}
            className="bg-accent text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all duration-300 flex items-center gap-3 mx-auto transform hover:scale-105"
          >
            Conheça Nossos Projetos
            <ArrowDown className="animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};
