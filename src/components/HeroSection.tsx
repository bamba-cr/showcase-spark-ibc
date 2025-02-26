
import { useState, useEffect } from "react";
import { ArrowDown, Star } from "lucide-react";

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
    <div className="relative min-h-screen overflow-hidden bg-primary text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-5" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary to-primary/90" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-32 pb-24 min-h-screen flex flex-col justify-center items-center text-center">
        <div className={`space-y-8 transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Star className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Transformando vidas através do esporte</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tighter">
            <span className="gradient-text">Instituto IBC</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Desenvolvendo talentos, construindo futuros e fortalecendo comunidades através da educação e do esporte.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToProjects}
              className="group relative px-8 py-4 bg-secondary text-primary font-bold rounded-full overflow-hidden transition-all hover:shadow-lg hover:shadow-secondary/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                Conheça Nossos Projetos
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-secondary-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { value: "1000+", label: "Alunos" },
              { value: "7", label: "Projetos" },
              { value: "15+", label: "Professores" },
              { value: "10+", label: "Anos de História" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-white/60" />
        </div>
      </div>
    </div>
  );
};
