
import React, { useState } from "react";
import { ProjectMediaManager } from "@/components/admin/ProjectMediaManager";
import { ProjectList } from "@/components/admin/ProjectList";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { Project } from "@/types/Project";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Admin = () => {
  const [projects, setProjects] = useState<Project[]>([
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
  ]);
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Handler para criar um novo projeto
  const handleCreateProject = (newProject: Omit<Project, "id">) => {
    const projectWithId = {
      ...newProject,
      id: `project-${Date.now()}`,
      gallery: [],
    };
    
    setProjects([...projects, projectWithId]);
    toast.success("Projeto criado com sucesso!");
  };

  // Handler para atualizar um projeto
  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    ));
    toast.success("Projeto atualizado com sucesso!");
  };

  // Handler para remover um projeto
  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    setSelectedProject(null);
    toast.success("Projeto removido com sucesso!");
  };

  // Handler para selecionar um projeto para edição
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      
      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="new">Novo Projeto</TabsTrigger>
          {selectedProject && (
            <TabsTrigger value="media">Gerenciar Mídia</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="projects" className="space-y-6">
          <ProjectList 
            projects={projects} 
            onSelect={handleSelectProject} 
            onDelete={handleDeleteProject}
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
  );
};

export default Admin;
