import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/types/Project";

const projects = [
  {
    id: "1",
    title: "Capoeira – Roda do Bem",
    category: "capoeira",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Rodas e treinos de capoeira para desenvolvimento físico e cultural.",
    fullDescription: "Nosso projeto de capoeira visa desenvolver habilidades físicas, mentais e culturais através desta arte marcial brasileira. Com aulas regulares, eventos e apresentações, os alunos aprendem não apenas os movimentos, mas também a história e a música da capoeira."
  },
  {
    id: "2",
    title: "Futebol – Show de Bola",
    category: "futebol",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Partidas e campeonatos de futebol para jovens atletas.",
    fullDescription: "O projeto Show de Bola oferece treinamento profissional de futebol para jovens, desenvolvendo habilidades técnicas, trabalho em equipe e disciplina. Realizamos campeonatos internos e participamos de competições regionais."
  },
  {
    id: "3",
    title: "Judô – Campeões do Futuro",
    category: "judo",
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    description: "Treinamento e competições de judô para todas as idades.",
    fullDescription: "O projeto Campeões do Futuro desenvolve valores como disciplina, respeito e perseverança através do judô. Oferecemos aulas para diferentes níveis e idades, participando regularmente de competições estaduais e nacionais."
  },
  {
    id: "4",
    title: "Música – Culturart",
    category: "musica",
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    description: "Aulas de música e apresentações culturais.",
    fullDescription: "O Culturart proporciona educação musical completa, incluindo teoria musical, prática instrumental e canto. Realizamos apresentações regulares e participamos de eventos culturais na comunidade."
  },
  {
    id: "5",
    title: "Informática – Conecte-se",
    category: "informatica",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Cursos de tecnologia e inclusão digital.",
    fullDescription: "O projeto Conecte-se oferece cursos de informática básica, programação e design digital, preparando os participantes para o mercado de trabalho e promovendo inclusão digital."
  },
  {
    id: "6",
    title: "Zumba em Movimento",
    category: "zumba",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Aulas de zumba e eventos fitness.",
    fullDescription: "Projeto que promove saúde e bem-estar através de aulas dinâmicas de zumba. Realizamos encontros semanais e eventos especiais, incentivando um estilo de vida ativo e saudável."
  },
  {
    id: "7",
    title: "Reforço Escolar – Mentes Brilhantes",
    category: "educacao",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Apoio educacional e acompanhamento pedagógico.",
    fullDescription: "O projeto Mentes Brilhantes oferece suporte educacional personalizado, ajudando estudantes a superarem dificuldades acadêmicas e desenvolverem métodos eficientes de estudo."
  }
];

export const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const categories = [...new Set(projects.map((project) => project.category))];

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById("projects-container");
    if (container) {
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div id="projects" className="relative min-h-screen py-16 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-diagonal-lines opacity-30" />
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-ibc-purple text-center mb-4">
          Nossos Projetos
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Conheça nossas iniciativas que transformam vidas através do esporte e da educação
        </p>
        
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button
            className={`px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
              !selectedCategory
                ? "bg-ibc-purple text-white shadow-lg shadow-ibc-purple/20"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-ibc-purple text-white shadow-lg shadow-ibc-purple/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => scrollContainer("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 text-ibc-purple p-3 rounded-full shadow-lg hover:bg-ibc-purple hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            id="projects-container"
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 px-4 pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={project.id}
                className="group relative bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer min-w-[300px] md:min-w-[400px] snap-center transform transition-all hover:scale-105"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scrollContainer("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 text-ibc-purple p-3 rounded-full shadow-lg hover:bg-ibc-purple hover:text-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-80 object-cover rounded-xl mb-6"
              />
              <h2 className="text-3xl font-bold text-ibc-purple mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {selectedProject.fullDescription || selectedProject.description}
              </p>
              <button
                className="absolute top-4 right-4 bg-ibc-purple text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all"
                onClick={() => setSelectedProject(null)}
              >
                Fechar
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
