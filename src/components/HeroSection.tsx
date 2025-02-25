
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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video background - será gerenciado pelo painel admin */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
        <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Instituto IBC</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            Transformando vidas através da educação e do esporte
          </p>
          <button
            onClick={scrollToProjects}
            className="bg-ibc-green text-ibc-purple px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2"
          >
            Conheça Nossos Projetos
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
