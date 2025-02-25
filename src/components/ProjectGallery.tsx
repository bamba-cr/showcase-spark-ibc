
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Project = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
};

const projects = [
  {
    id: "1",
    title: "Capoeira – Roda do Bem",
    category: "capoeira",
    imageUrl: "/placeholder.svg",
    description: "Rodas e treinos de capoeira para desenvolvimento físico e cultural.",
  },
  {
    id: "2",
    title: "Futebol – Show de Bola",
    category: "futebol",
    imageUrl: "/placeholder.svg",
    description: "Partidas e campeonatos de futebol para jovens atletas.",
  },
  // Add other projects here
];

export const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [...new Set(projects.map((project) => project.category))];

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          className={`px-4 py-2 rounded-full transition-all ${
            !selectedCategory
              ? "bg-ibc-purple text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedCategory(null)}
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
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
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

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-6"
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
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>
            <button
              className="bg-ibc-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
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
