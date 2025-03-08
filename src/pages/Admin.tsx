import React, { useState } from "react";
import { ProjectMediaManager } from "@/components/admin/ProjectMediaManager";
import { ProjectList } from "@/components/admin/ProjectList";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { SiteConfigForm } from "@/components/admin/SiteConfigForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchProjects, 
  fetchSiteConfig, 
  addProject, 
  updateProject, 
  deleteProject, 
  reorderProjects, 
  saveSiteConfig, 
  deleteProjectImage, 
  updateProjectCover
} from "@/utils/databaseService";

const Admin = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  });

  const { data: siteConfig, isLoading: siteConfigLoading } = useQuery({
    queryKey: ['siteConfig'],
    queryFn: fetchSiteConfig,
    staleTime: 1000 * 60 * 5,
  });

  const deleteImageMutation = useMutation({
    mutationFn: deleteProjectImage,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      toast.success("Imagem removida com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao remover imagem:", error);
      toast.error("Erro ao remover imagem. Tente novamente.");
    }
  });

  const updateCoverMutation = useMutation({
    mutationFn: ({ projectId, imageUrl }) => updateProjectCover(projectId, imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      toast.success("Capa do projeto atualizada!");
    },
    onError: (error) => {
      console.error("Erro ao atualizar capa:", error);
      toast.error("Erro ao atualizar capa do projeto.");
    }
  });

  if (projectsLoading || siteConfigLoading || !siteConfig) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        <div className="grid gap-4">
          <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="config">Configurações</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="new">Novo Projeto</TabsTrigger>
            {selectedProject && <TabsTrigger value="media">Gerenciar Mídia</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="config">
            <SiteConfigForm config={siteConfig} onSubmit={(data) => saveSiteConfig(data)} />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectList 
              projects={projects} 
              onSelect={(project) => setSelectedProject(project)} 
              onDelete={(id) => deleteProject(id)}
              onUpdate={(project) => updateProject(project)}
              onReorder={(ordered) => reorderProjects(ordered)}
            />
          </TabsContent>
          
          <TabsContent value="new">
            <ProjectForm onSubmit={(data) => addProject(data)} />
          </TabsContent>
          
          <TabsContent value="media">
            {selectedProject && (
              <ProjectMediaManager 
                project={selectedProject} 
                onDeleteImage={(imageUrl) => deleteImageMutation.mutate(imageUrl)}
                onUpdateCover={(imageUrl) => updateCoverMutation.mutate({ projectId: selectedProject.id, imageUrl })}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  );
};

export default Admin;
