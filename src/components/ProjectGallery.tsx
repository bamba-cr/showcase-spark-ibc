import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/types/Project";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, fetchSiteConfig } from "@/utils/databaseService";

// Componente de galeria de imagens com rolagem moderna
const ImageGallery = ({ images }: { images: string[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' 
        ? -current.offsetWidth / 2 
        : current.offsetWidth / 2;
      
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (images.length === 0) {
    return <div className="text-center text-gray-500 py-4">Sem imagens na galeria</div>;
  }

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 snap-start"
          >
            <img
              src={image}
              alt={`Imagem ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Rolar para direita"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

// Componente de cartão de projeto
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full mr-3 flex items-center justify-center">
            <img src={project.logoUrl} alt={project.title} className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold">{project.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
        
        <div className="mb-4">
          <ImageGallery images={project.gallery} />
        </div>
        
        <button onClick={onClick} className="w-full py-2 bg-primary text-white rounded-lg text-sm">
          Ver Mais
        </button>
      </div>
    </div>
  );
};

// Visualização detalhada de um projeto com galeria interativa
const ProjectDetail = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3">
      <button className="absolute top-3 right-3 text-white p-2 hover:bg-white/10 rounded-full" onClick={onClose}>
        <X />
      </button>

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full mr-3 flex items-center justify-center">
              <img src={project.logoUrl} alt={project.title} className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">{project.title}</h2>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
          
          {/* Exibição de imagem principal com controles */}
          <div className="relative aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {project.gallery.length > 0 ? (
              <>
                <img 
                  src={project.gallery[activeImageIndex]} 
                  alt={`${project.title} - Imagem ${activeImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {project.gallery.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {project.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === activeImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                          }`}
                          aria-label={`Ir para imagem ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sem imagens disponíveis
              </div>
            )}
          </div>
          
          {/* Galeria de miniaturas */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {project.gallery.map((image, index) => (
              <div 
                key={index} 
                className={`aspect-square rounded-md overflow-hidden cursor-pointer ${
                  activeImageIndex === index ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Miniatura ${index + 1}`} 
                  className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
          
          <button onClick={onClose} className="w-full py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal
export const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    gcTime: 60000,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });

  const { data: siteConfig } = useQuery({
    queryKey: ['siteConfig'],
    queryFn: fetchSiteConfig,
    gcTime: 60000,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });

  return (
    <section id="projects" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {siteConfig?.title ? `Projetos - ${siteConfig.title}` : "Projetos"}
        </h2>

        {projectsLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Carregando projetos...</p>
          </div>
        ) : projectsError ? (
          <div className="text-center py-12 text-red-500">
            Erro ao carregar os projetos. Por favor, tente novamente.
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhum projeto encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
