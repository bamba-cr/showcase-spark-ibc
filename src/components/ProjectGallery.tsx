
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "@/types/Project";

// Dados dos projetos simplificados
const projects = [
  {
    id: "1",
    title: "Capoeira",
    category: "esporte",
    logoUrl: "https://img.icons8.com/fluency/96/capoeira.png",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Treinos de capoeira.",
    gallery: ["https://images.unsplash.com/photo-1517022812141-23620dba5c23"]
  },
  {
    id: "2",
    title: "Futebol",
    category: "esporte",
    logoUrl: "https://img.icons8.com/fluency/96/football2.png",
    imageUrl: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e",
    description: "Partidas de futebol.",
    gallery: ["https://images.unsplash.com/photo-1606925797300-0b35e9d1794e"]
  },
  {
    id: "3",
    title: "Música",
    category: "cultura",
    logoUrl: "https://img.icons8.com/fluency/96/musical-notes.png",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
    description: "Aulas de música.",
    gallery: ["https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae"]
  }
];

// Componente de cartão de projeto
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full mr-3 flex items-center justify-center">
            <img src={project.logoUrl} alt={project.title} className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold">{project.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
        
        <div className="h-36 rounded-lg overflow-hidden mb-4">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>
        
        <button onClick={onClick} className="w-full py-2 bg-primary text-white rounded-lg text-sm">
          Ver Mais
        </button>
      </div>
    </div>
  );
};

// Visualização detalhada
const ProjectDetail = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3">
      <button className="absolute top-3 right-3 text-white" onClick={onClose}>
        <X />
      </button>

      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl">
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full mr-3 flex items-center justify-center">
              <img src={project.logoUrl} alt={project.title} className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">{project.title}</h2>
          </div>
          
          <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
          
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>
          
          <button onClick={onClose} className="w-full py-2 border border-primary text-primary rounded-lg">
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

  return (
    <section id="projects" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Projetos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
