
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
    imageUrl: "/placeholder.svg",
    description: "Rodas e treinos de capoeira para desenvolvimento físico e cultural.",
    fullDescription: "Nosso projeto de capoeira visa desenvolver habilidades físicas, mentais e culturais através desta arte marcial brasileira. Com aulas regulares, eventos e apresentações, os alunos aprendem não apenas os movimentos, mas também a história e a música da capoeira."
  },
  {
    id: "2",
    title: "Futebol – Show de Bola",
    category: "futebol",
    imageUrl: "/placeholder.svg",
    description: "Partidas e campeonatos de futebol para jovens atletas.",
    fullDescription: "O projeto Show de Bola oferece treinamento profissional de futebol para jovens, desenvolvendo habilidades técnicas, trabalho em equipe e disciplina. Realizamos campeonatos internos e participamos de competições regionais."
  },
  {
    id: "3",
    title: "Judô – Campeões do Futuro",
    category: "judo",
    imageUrl: "/placeholder.svg",
    description: "Treinamento e competições de judô para todas as idades.",
    fullDescription: "O projeto Campeões do Futuro desenvolve valores como disciplina, respeito e perseverança através do judô. Oferecemos aulas para diferentes níveis e idades, participando regularmente de competições estaduais e nacionais."
  },
  {
    id: "4",
    title: "Música – Culturart",
    category: "musica",
    imageUrl: "/placeholder.svg",
    description: "Aulas de música e apresentações culturais.",
    fullDescription: "O Culturart proporciona educação musical completa, incluindo teoria musical, prática instrumental e canto. Realizamos apresentações regulares e participamos de eventos culturais na comunidade."
  },
  {
    id: "5",
    title: "Informática – Conecte-se",
    category: "informatica",
    imageUrl: "/placeholder.svg",
    description: "Cursos de tecnologia e inclusão digital.",
    fullDescription: "O projeto Conecte-se oferece cursos de informática básica, programação e design digital, preparando os participantes para o mercado de trabalho e promovendo inclusão digital."
  },
  {
    id: "6",
    title: "Zumba em Movimento",
    category: "zumba",
    imageUrl: "/placeholder.svg",
    description: "Aulas de zumba e eventos fitness.",
    fullDescription: "Projeto que promove saúde e bem-estar através de aulas dinâmicas de zumba. Realizamos encontros semanais e eventos especiais, incentivando um estilo de vida ativo e saudável."
  },
  {
    id: "7",
    title: "Reforço Escolar – Mentes Brilhantes",
    category: "educacao",
    imageUrl: "/placeholder.svg",
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
    <div id="projects" className="container mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-ibc-purple text-center mb-8">
        Nossos Projetos
      </h2>
      
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          className={`px-4 py-2 rounded-full transition-all ${
            !selectedCategory
              ? "bg-ibc-purple text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category
                ? "bg-ibc-purple text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={project.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105"
            onClick={() => setSelectedProject(project)}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-ibc-purple mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-full bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-gray-600">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-full bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProject.imageUrl}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-ibc-purple mb-2">
              {selectedProject.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedProject.fullDescription || selectedProject.description}
            </p>
            <button
              className="bg-ibc-purple text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
              onClick={() => setSelectedProject(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
