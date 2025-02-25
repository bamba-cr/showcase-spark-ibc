
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  fullDescription?: string;
};

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
  const [page, setPage] = useState(1);
  const projectsPerPage = 6;

  const categories = [...new Set(projects.map((project) => project.category))];

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  );

  return (
    <div id="projects" className="relative min-h-screen py-16 px-4 bg-white overflow-hidden">
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
            onClick={() => {
              setSelectedCategory(null);
              setPage(1);
            }}
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
              onClick={() => {
                setSelectedCategory(category);
                setPage(1);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              key={project.id}
              className="group relative bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-3 rounded-full bg-ibc-purple text-white disabled:opacity-50 hover:bg-opacity-90 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-ibc-purple font-semibold">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-3 rounded-full bg-ibc-purple text-white disabled:opacity-50 hover:bg-opacity-90 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Modal de Projeto */}
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
