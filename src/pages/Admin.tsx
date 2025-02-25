
import { useState } from "react";
import { toast } from "sonner";
import { Project } from "@/types/Project";
import { ProjectMediaManager } from "@/components/admin/ProjectMediaManager";

// Dados de exemplo - em uma implementação real, viriam de uma API/banco de dados
const initialProjects: Project[] = [
  {
    id: "1",
    title: "Capoeira – Roda do Bem",
    category: "capoeira",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    description: "Rodas e treinos de capoeira para desenvolvimento físico e cultural.",
    fullDescription: "Nosso projeto de capoeira visa desenvolver habilidades físicas, mentais e culturais através desta arte marcial brasileira.",
    gallery: [],
  },
  // ... Adicione os outros projetos aqui
];

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      toast.success("Login realizado com sucesso!");
    } else {
      toast.error("Senha incorreta!");
    }
  };

  const handleProjectUpdate = (updatedProject: Project) => {
    setProjects(projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ));
    toast.success("Projeto atualizado com sucesso!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-ibc-purple mb-6">Área Administrativa</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ibc-purple"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-ibc-purple text-white py-2 rounded-lg hover:bg-opacity-90 transition-all"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-ibc-purple mb-8">Painel Administrativo</h1>
        
        <div className="space-y-8">
          {/* Lista de Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedProject(project)}
              >
                <h3 className="text-xl font-semibold text-ibc-purple mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {project.gallery.length} fotos
                  </span>
                  <button
                    className="bg-ibc-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    Gerenciar Mídia
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Gerenciador de Mídia */}
          {selectedProject && (
            <ProjectMediaManager
              project={selectedProject}
              onUpdate={handleProjectUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
