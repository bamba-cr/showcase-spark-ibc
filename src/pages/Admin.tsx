
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchProjects, 
  fetchSiteConfig, 
  addProject, 
  updateProject, 
  deleteProject, 
  reorderProjects, 
  saveSiteConfig 
} from "@/utils/databaseService";

const Admin = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("projects");
  const queryClient = useQueryClient();

  // Fetch projects using react-query
  const { 
    data: projects = [], 
    isLoading: projectsLoading 
  } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });

  // Fetch site configuration using react-query
  const { 
    data: siteConfig, 
    isLoading: siteConfigLoading 
  } = useQuery({
    queryKey: ['siteConfig'],
    queryFn: fetchSiteConfig,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });

  // Mutations for projects
  const createProjectMutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Projeto criado com sucesso!");
      setActiveTab("projects");
    },
    onError: (error) => {
      console.error("Erro ao criar projeto:", error);
      toast.error("Erro ao criar projeto. Tente novamente.");
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Projeto atualizado com sucesso!");
      setActiveTab("projects");
    },
    onError: (error) => {
      console.error("Erro ao atualizar projeto:", error);
      toast.error("Erro ao atualizar projeto. Tente novamente.");
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Projeto removido com sucesso!");
      if (selectedProject) {
        setSelectedProject(null);
      }
    },
    onError: (error) => {
      console.error("Erro ao remover projeto:", error);
      toast.error("Erro ao remover projeto. Tente novamente.");
    }
  });

  const reorderProjectsMutation = useMutation({
    mutationFn: reorderProjects,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Ordem dos projetos atualizada com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao reordenar projetos:", error);
      toast.error("Erro ao reordenar projetos. Tente novamente.");
    }
  });

  // Mutation for site configuration
  const updateSiteConfigMutation = useMutation({
    mutationFn: (newConfig: SiteConfig) => saveSiteConfig(newConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteConfig'] });
      toast.success("Configurações do site atualizadas com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao atualizar configurações do site:", error);
      toast.error("Erro ao atualizar configurações do site. Tente novamente.");
    }
  });

  // Handler to create a new project
  const handleCreateProject = (newProject: Omit<Project, "id" | "gallery">) => {
    createProjectMutation.mutate(newProject);
  };

  // Handler to update a project
  const handleUpdateProject = (updatedProject: Project) => {
    updateProjectMutation.mutate(updatedProject);
  };

  // Handler to remove a project
  const handleDeleteProject = (projectId: string) => {
    deleteProjectMutation.mutate(projectId);
  };

  // Handler to select a project for editing
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab("media");
  };

  // Handler to reorder projects
  const handleReorderProjects = (reorderedProjects: Project[]) => {
    reorderProjectsMutation.mutate(reorderedProjects);
    // Reordenamos localmente também para uma experiência mais responsiva
    queryClient.setQueryData(['projects'], reorderedProjects);
  };

  // Handler to update the site configuration
  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
    console.log("Atualizando configurações do site:", newConfig);
    updateSiteConfigMutation.mutate(newConfig);
  };

  // Loading state
  if (projectsLoading || siteConfigLoading || !siteConfig) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Carregando dados...</p>
          </div>
        </div>
      </div>
    );
  }

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
