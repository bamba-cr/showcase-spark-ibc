import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Project } from "@/types/Project";

const projects = [
  {
    id: "1",
    title: "Capoeira – Roda do Bem",
    category: "capoeira",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Rodas e treinos de capoeira para desenvolvimento físico e cultural.",
    fullDescription: "Nosso projeto de capoeira visa desenvolver habilidades físicas, mentais e culturais através desta arte marcial brasileira. Com aulas regulares, eventos e apresentações, os alunos aprendem não apenas os movimentos, mas também a história e a música da capoeira.",
    gallery: [
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    ]
  },
  {
    id: "2",
    title: "Futebol – Show de Bola",
    category: "futebol",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Partidas e campeonatos de futebol para jovens atletas.",
    fullDescription: "O projeto Show de Bola oferece treinamento profissional de futebol para jovens, desenvolvendo habilidades técnicas, trabalho em equipe e disciplina. Realizamos campeonatos internos e participamos de competições regionais.",
    gallery: [
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    ]
  },
  {
    id: "3",
    title: "Judô – Campeões do Futuro",
    category: "judo",
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    description: "Treinamento e competições de judô para todas as idades.",
    fullDescription: "O projeto Campeões do Futuro desenvolve valores como disciplina, respeito e perseverança através do judô. Oferecemos aulas para diferentes níveis e idades, participando regularmente de competições estaduais e nacionais.",
    gallery: [
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    ]
  },
  {
    id: "4",
    title: "Música – Culturart",
    category: "musica",
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    description: "Aulas de música e apresentações culturais.",
    fullDescription: "O Culturart proporciona educação musical completa, incluindo teoria musical, prática instrumental e canto. Realizamos apresentações regulares e participamos de eventos culturais na comunidade.",
    gallery: [
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
    ]
  },
  {
    id: "5",
    title: "Informática – Conecte-se",
    category: "informatica",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    description: "Cursos de tecnologia e inclusão digital.",
    fullDescription: "O projeto Conecte-se oferece cursos de informática básica, programação e design digital, preparando os participantes para o mercado de trabalho e promovendo inclusão digital.",
    gallery: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    ]
  },
  {
    id: "6",
    title: "Zumba em Movimento",
    category: "zumba",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Aulas de zumba e eventos fitness.",
    fullDescription: "Projeto que promove saúde e bem-estar através de aulas dinâmicas de zumba. Realizamos encontros semanais e eventos especiais, incentivando um estilo de vida ativo e saudável.",
    gallery: [
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    ]
  },
  {
    id: "7",
    title: "Reforço Escolar – Mentes Brilhantes",
    category: "educacao",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    description: "Apoio educacional e acompanhamento pedagógico.",
    fullDescription: "O projeto Mentes Brilhantes oferece suporte educacional personalizado, ajudando estudantes a superarem dificuldades acadêmicas e desenvolverem métodos eficientes de estudo.",
    gallery: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    ]
  }
];

export const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [...new Set(projects.map((project) => project.category))];
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className={`px-6 py-2 rounded-full text-sm transition-all ${
              !selectedCategory
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full text-sm transition-all ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={project.id}
              className="relative aspect-square group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center"
          >
            <button
              className="absolute top-4 right-4 text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setCurrentImageIndex((prev) => 
                prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
              )}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedProject.gallery[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="max-h-[90vh] w-auto object-contain"
              />
            </div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setCurrentImageIndex((prev) => 
                prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
              )}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {selectedProject.gallery.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === index ? "bg-white" : "bg-white/30"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-white text-2xl font-bold mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-white/80">
                {selectedProject.fullDescription || selectedProject.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
