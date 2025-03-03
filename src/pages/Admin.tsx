import React, { useState, useEffect } from "react";
import { ProjectMediaManager } from "@/components/admin/ProjectMediaManager";
import { ProjectList } from "@/components/admin/ProjectList";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { SiteConfigForm } from "@/components/admin/SiteConfigForm";
import { Project } from "@/types/Project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SiteConfig } from "@/types/SiteConfig";

const Admin = () => {
  // Site configuration state
  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    title: "Meu Portfólio Profissional",
    subtitle: "Desenvolvedor Web & Designer",
    featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    contactEmail: "contato@exemplo.com",
    contactPhone: "+55 11 12345-6789",
    socialLinks: {
      linkedin: "https://linkedin.com/in/exemplo",
      github: "https://github.com/exemplo",
      twitter: "https://twitter.com/exemplo"
    }
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("projects");

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Set default projects if nothing in localStorage
      const defaultProjects = [
        {
          id: "project-1",
          title: "Projeto de Demonstração",
          category: "demo",
          logoUrl: "https://img.icons8.com/fluency/96/puzzle.png",
          imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
          description: "Este é um projeto de demonstração para testes.",
          fullDescription: "Descrição completa do projeto de demonstração para fins de teste e visualização no painel administrativo.",
          gallery: [
            "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
          ],
        },
        {
          id: "project-2",
          title: "Website Corporativo",
          category: "web",
          logoUrl: "https://img.icons8.com/fluency/96/domain.png",
          imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          description: "Website responsivo para empresa de tecnologia.",
          fullDescription: "Website moderno e responsivo desenvolvido para uma empresa de tecnologia, com design clean e funcionalidades avançadas.",
          gallery: [],
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  // Handler to create a new project
  const handleCreateProject = (newProject: Omit<Project, "id" | "gallery">) => {
    try {
      // Create a unique ID for the new project
      const projectId = `project-${Date.now()}`;
      
      const projectWithId: Project = {
        ...newProject,
        id: projectId,
        gallery: [],
      };
      
      setProjects(prevProjects => [...prevProjects, projectWithId]);
      toast.success("Projeto criado com sucesso!");
      // Switch to the projects tab after creation
      setActiveTab("projects");
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      toast.error("Erro ao criar projeto. Tente novamente.");
    }
  };

  // Handler to update a project
  const handleUpdateProject = (updatedProject: Project) => {
    try {
      // Check if the project exists
      const projectExists = projects.some(p => p.id === updatedProject.id);
      
      if (!projectExists) {
        toast.error("Projeto não encontrado.");
        return;
      }
      
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === updatedProject.id ? updatedProject : project
        )
      );
      toast.success("Projeto atualizado com sucesso!");
      setActiveTab("projects");
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      toast.error("Erro ao atualizar projeto. Tente novamente.");
    }
  };

  // Handler to remove a project
  const handleDeleteProject = (projectId: string) => {
    try {
      // Check if the project exists
      const projectExists = projects.some(p => p.id === projectId);
      
      if (!projectExists) {
        toast.error("Projeto não encontrado.");
        return;
      }
      
      setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
      
      // If the deleted project is currently selected, clear the selection
      if (selectedProject && selectedProject.id === projectId) {
        setSelectedProject(null);
      }
      
      toast.success("Projeto removido com sucesso!");
    } catch (error) {
      console.error("Erro ao remover projeto:", error);
      toast.error("Erro ao remover projeto. Tente novamente.");
    }
  };

  // Handler to select a project for editing
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab("media");
  };

  // Handler to reorder projects
  const handleReorderProjects = (reorderedProjects: Project[]) => {
    setProjects(reorderedProjects);
    toast.success("Ordem dos projetos atualizada com sucesso!");
  };

  // Handler to update the site configuration
  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    toast.success("Configurações do site atualizadas com sucesso!");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="config">Configurações do Site</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="new">Novo Projeto</TabsTrigger>
            {selectedProject && (
              <TabsTrigger value="media">Gerenciar Mídia</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="config" className="space-y-6">
            <SiteConfigForm 
              config={siteConfig}
              onSubmit={handleUpdateSiteConfig}
            />
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-6">
            <ProjectList 
              projects={projects} 
              onSelect={handleSelectProject} 
              onDelete={handleDeleteProject}
              onReorder={handleReorderProjects}
            />
          </TabsContent>
          
          <TabsContent value="new">
            <ProjectForm onSubmit={handleCreateProject} />
          </TabsContent>
          
          <TabsContent value="media">
            {selectedProject && (
              <ProjectMediaManager 
                project={selectedProject} 
                onUpdate={handleUpdateProject} 
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  );
};

export default Admin;
