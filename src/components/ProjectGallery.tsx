
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { Project } from "@/types/Project";

// Dados dos projetos
const projects = [
  {
    id: "1",
    title: "Capoeira – Roda do Bem",
    category: "capoeira",
    logoUrl: "https://img.icons8.com/fluency/96/capoeira.png",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Rodas e treinos de capoeira para desenvolvimento físico e cultural.",
    fullDescription: "Nosso projeto de capoeira visa desenvolver habilidades físicas, mentais e culturais através desta arte marcial brasileira. Com aulas regulares, eventos e apresentações, os alunos aprendem não apenas os movimentos, mas também a história e a música da capoeira.",
    gallery: [
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1551522435-a13afa10f103",
      "https://images.unsplash.com/photo-1635102707010-bcf2cb3b056f",
    ]
  },
  {
    id: "2",
    title: "Futebol – Show de Bola",
    category: "futebol",
    logoUrl: "https://img.icons8.com/fluency/96/football2.png",
    imageUrl: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e",
    description: "Partidas e campeonatos de futebol para jovens atletas.",
    fullDescription: "O projeto Show de Bola oferece treinamento profissional de futebol para jovens, desenvolvendo habilidades técnicas, trabalho em equipe e disciplina. Realizamos campeonatos internos e participamos de competições regionais.",
    gallery: [
      "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e",
      "https://images.unsplash.com/photo-1493924457718-be908a72059c",
      "https://images.unsplash.com/photo-1494778696781-8f23fd5553c4",
    ]
  },
  {
    id: "3",
    title: "Judô – Campeões do Futuro",
    category: "judo",
    logoUrl: "https://img.icons8.com/fluency/96/judo.png",
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    description: "Treinamento e competições de judô para todas as idades.",
    fullDescription: "O projeto Campeões do Futuro desenvolve valores como disciplina, respeito e perseverança através do judô. Oferecemos aulas para diferentes níveis e idades, participando regularmente de competições estaduais e nacionais.",
    gallery: [
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e",
      "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4",
    ]
  },
  {
    id: "4",
    title: "Música – Culturart",
    category: "musica",
    logoUrl: "https://img.icons8.com/fluency/96/musical-notes.png",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    description: "Aulas de música e apresentações culturais.",
    fullDescription: "O Culturart proporciona educação musical completa, incluindo teoria musical, prática instrumental e canto. Realizamos apresentações regulares e participamos de eventos culturais na comunidade.",
    gallery: [
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      "https://images.unsplash.com/photo-1513883049090-d0b7439799bf",
    ]
  },
  {
    id: "5",
    title: "Informática – Conecte-se",
    category: "informatica",
    logoUrl: "https://img.icons8.com/fluency/96/laptop-coding.png",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Cursos de tecnologia e inclusão digital.",
    fullDescription: "O projeto Conecte-se oferece cursos de informática básica, programação e design digital, preparando os participantes para o mercado de trabalho e promovendo inclusão digital.",
    gallery: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
      "https://images.unsplash.com/photo-1581091878591-4f0714c6f31f",
    ]
  },
  {
    id: "6",
    title: "Zumba em Movimento",
    category: "zumba",
    logoUrl: "https://img.icons8.com/fluency/96/exercise.png",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    description: "Aulas de zumba e eventos fitness.",
    fullDescription: "Projeto que promove saúde e bem-estar através de aulas dinâmicas de zumba. Realizamos encontros semanais e eventos especiais, incentivando um estilo de vida ativo e saudável.",
    gallery: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2",
    ]
  },
  {
    id: "7",
    title: "Reforço Escolar – Mentes Brilhantes",
    category: "educacao",
    logoUrl: "https://img.icons8.com/fluency/96/book-shelf.png",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Apoio educacional e acompanhamento pedagógico.",
    fullDescription: "O projeto Mentes Brilhantes oferece suporte educacional personalizado, ajudando estudantes a superarem dificuldades acadêmicas e desenvolverem métodos eficientes de estudo.",
    gallery: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    ]
  }
];

// Componente de cartão de projeto
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card-hover bg-white rounded-xl overflow-hidden shadow-md"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mr-3 sm:mr-4 shrink-0">
            <img src={project.logoUrl} alt={project.title} className="w-7 h-7 sm:w-10 sm:h-10" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 font-heading">{project.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">{project.description}</p>
        
        <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4">
          {project.gallery.slice(0, 3).map((img, idx) => (
            <div key={idx} className="aspect-square rounded-md overflow-hidden">
              <img 
                src={img} 
                alt={`${project.title} - ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform hover:scale-110"
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={onClick}
          className="w-full py-2.5 sm:py-3 rounded-lg bg-primary text-white flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors text-sm sm:text-base"
        >
          Ver Mais <ExternalLink size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// Componente de visualização detalhada
const ProjectDetail = ({ 
  project, 
  onClose, 
  currentImageIndex,
  setCurrentImageIndex 
}: { 
  project: Project; 
  onClose: () => void;
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}) => {
  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? project.gallery.length - 1 : currentImageIndex - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 md:p-8"
    >
      <button
        className="absolute top-3 right-3 md:top-4 md:right-4 text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 bg-black relative">
            <div className="relative aspect-video md:aspect-auto md:h-full">
              <img
                src={project.gallery[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white z-10 p-1.5 md:p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white z-10 p-1.5 md:p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {project.gallery.map((_, index) => (
                  <button
                    key={index}
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                      currentImageIndex === index ? "bg-white" : "bg-white/30"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8">
            <div className="flex items-center mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                <img src={project.logoUrl} alt={project.title} className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-heading">{project.title}</h2>
            </div>
            
            <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
              {project.fullDescription || project.description}
            </p>
            
            <div className="border-t border-gray-200 pt-3 md:pt-4">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-gray-800">Galeria de Imagens</h3>
              <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                {project.gallery.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`aspect-square rounded-md overflow-hidden cursor-pointer ${
                      currentImageIndex === idx ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} - ${idx + 1}`} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 md:mt-6">
              <button 
                onClick={onClose}
                className="w-full py-2.5 md:py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm md:text-base"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Componente principal de galeria de projetos
export const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [...new Set(projects.map((project) => project.category))];
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  const selectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 font-heading">
            Nossos Projetos
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça as iniciativas que estão transformando vidas através do esporte e da educação.
          </p>
        </motion.div>

        {/* Filtro de categorias */}
        <div className="mb-8 md:mb-12 overflow-x-auto scrollbar-hide pb-2">
          <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-4 justify-start md:justify-center min-w-min">
            <button
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all ${
                !selectedCategory
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => selectProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal de projeto */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
