
import { Project } from "@/types/Project";
import { SiteConfig } from "@/types/SiteConfig";
import { supabase } from "@/integrations/supabase/client";

// Project functions
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    // Buscar todos os projetos
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (projectsError) {
      console.error("Erro ao buscar projetos:", projectsError);
      return [];
    }

    // Para cada projeto, buscar as imagens da galeria
    const projectsWithGallery = await Promise.all(
      projects.map(async (project) => {
        const { data: galleryImages, error: galleryError } = await supabase
          .from('project_gallery')
          .select('image_url')
          .eq('project_id', project.id)
          .order('position', { ascending: true });

        if (galleryError) {
          console.error(`Erro ao buscar galeria para o projeto ${project.id}:`, galleryError);
          return {
            ...project,
            id: project.id,
            gallery: []
          };
        }

        // Mapear os resultados para o formato esperado
        return {
          ...project,
          id: project.id,
          title: project.title,
          category: project.category,
          logoUrl: project.logo_url,
          imageUrl: project.image_url,
          description: project.description,
          fullDescription: project.full_description,
          video: project.video || "",
          gallery: galleryImages.map(img => img.image_url)
        } as Project;
      })
    );

    return projectsWithGallery;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
};

export const getProjects = fetchProjects;

export const addProject = async (project: Omit<Project, "id" | "gallery">): Promise<Project[]> => {
  try {
    // Inserir o novo projeto
    const { data: newProject, error } = await supabase
      .from('projects')
      .insert({
        title: project.title,
        category: project.category,
        logo_url: project.logoUrl,
        image_url: project.imageUrl,
        description: project.description,
        full_description: project.fullDescription,
        video: project.video
      })
      .select()
      .single();

    if (error) {
      console.error("Erro ao adicionar projeto:", error);
      return await fetchProjects();
    }

    // Buscar todos os projetos atualizados
    return await fetchProjects();
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    return await fetchProjects();
  }
};

export const updateProject = async (updatedProject: Project): Promise<Project[]> => {
  try {
    // Atualizar o projeto
    const { error: projectError } = await supabase
      .from('projects')
      .update({
        title: updatedProject.title,
        category: updatedProject.category,
        logo_url: updatedProject.logoUrl,
        image_url: updatedProject.imageUrl,
        description: updatedProject.description,
        full_description: updatedProject.fullDescription,
        video: updatedProject.video
      })
      .eq('id', updatedProject.id);

    if (projectError) {
      console.error("Erro ao atualizar projeto:", projectError);
      return await fetchProjects();
    }

    // Se houver imagens na galeria, atualizá-las
    if (updatedProject.gallery && updatedProject.gallery.length > 0) {
      // Primeiro, excluir todas as imagens existentes
      const { error: deleteError } = await supabase
        .from('project_gallery')
        .delete()
        .eq('project_id', updatedProject.id);

      if (deleteError) {
        console.error("Erro ao excluir imagens da galeria:", deleteError);
        return await fetchProjects();
      }

      // Adicionar as novas imagens
      const galleryData = updatedProject.gallery.map((url, index) => ({
        project_id: updatedProject.id,
        image_url: url,
        position: index
      }));

      const { error: insertError } = await supabase
        .from('project_gallery')
        .insert(galleryData);

      if (insertError) {
        console.error("Erro ao inserir novas imagens na galeria:", insertError);
      }
    }

    // Buscar todos os projetos atualizados
    return await fetchProjects();
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return await fetchProjects();
  }
};

export const deleteProject = async (projectId: string): Promise<Project[]> => {
  try {
    // Excluir o projeto (as imagens da galeria serão excluídas automaticamente devido à restrição ON DELETE CASCADE)
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error("Erro ao excluir projeto:", error);
      return await fetchProjects();
    }

    // Buscar todos os projetos atualizados
    return await fetchProjects();
  } catch (error) {
    console.error("Erro ao excluir projeto:", error);
    return await fetchProjects();
  }
};

export const reorderProjects = async (reorderedProjects: Project[]): Promise<void> => {
  // Para reordenar projetos, podemos adicionar um campo 'position' na tabela 'projects'
  // Por enquanto, mantemos a ordem no frontend
  try {
    // Não faz nada no banco por enquanto, apenas registra a ordem no console
    console.log("Projetos reordenados:", reorderedProjects);
  } catch (error) {
    console.error("Erro ao reordenar projetos:", error);
  }
};

// Site Configuration functions
export const fetchSiteConfig = async (): Promise<SiteConfig> => {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .single();

    if (error) {
      console.error("Erro ao buscar configuração do site:", error);
      return getDefaultSiteConfig();
    }

    if (data) {
      // Mapear o resultado para o formato esperado
      return {
        title: data.title,
        subtitle: data.subtitle,
        featuredVideoUrl: data.featured_video_url,
        contactEmail: data.contact_email,
        contactPhone: data.contact_phone,
        socialLinks: data.social_links
      };
    } else {
      return getDefaultSiteConfig();
    }
  } catch (error) {
    console.error("Erro ao buscar configuração do site:", error);
    return getDefaultSiteConfig();
  }
};

export const getSiteConfig = fetchSiteConfig;

export const saveSiteConfig = async (config: SiteConfig): Promise<void> => {
  try {
    // Verificar se já existe uma configuração
    const { data } = await supabase
      .from('site_config')
      .select('id')
      .limit(1);

    if (data && data.length > 0) {
      // Atualizar a configuração existente
      const { error } = await supabase
        .from('site_config')
        .update({
          title: config.title,
          subtitle: config.subtitle,
          featured_video_url: config.featuredVideoUrl,
          contact_email: config.contactEmail,
          contact_phone: config.contactPhone,
          social_links: config.socialLinks,
          updated_at: new Date()
        })
        .eq('id', data[0].id);

      if (error) {
        console.error("Erro ao atualizar configuração do site:", error);
      }
    } else {
      // Inserir uma nova configuração
      const { error } = await supabase
        .from('site_config')
        .insert({
          title: config.title,
          subtitle: config.subtitle,
          featured_video_url: config.featuredVideoUrl,
          contact_email: config.contactEmail,
          contact_phone: config.contactPhone,
          social_links: config.socialLinks
        });

      if (error) {
        console.error("Erro ao inserir configuração do site:", error);
      }
    }
  } catch (error) {
    console.error("Erro ao salvar configuração do site:", error);
  }
};

// Default values (fallback)
const getDefaultSiteConfig = (): SiteConfig => {
  return {
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
  };
};

export default {
  getProjects,
  saveProjects: () => {}, // Não é mais necessário
  addProject,
  updateProject,
  deleteProject,
  reorderProjects,
  getSiteConfig,
  saveSiteConfig,
  fetchProjects,
  fetchSiteConfig
};
