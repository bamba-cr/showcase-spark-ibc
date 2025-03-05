
import { Project } from "@/types/Project";
import { SiteConfig } from "@/types/SiteConfig";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

// Project functions
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    console.log("Fetching projects...");
    // Buscar todos os projetos
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (projectsError) {
      console.error("Erro ao buscar projetos:", projectsError);
      return [];
    }

    console.log(`Fetched ${projects.length} projects successfully`);

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
            id: project.id,
            title: project.title,
            category: project.category,
            logoUrl: project.logo_url,
            imageUrl: project.image_url,
            description: project.description,
            fullDescription: project.full_description || "",
            video: project.video || "",
            gallery: []
          } as Project;
        }

        // Mapear os resultados para o formato esperado
        return {
          id: project.id,
          title: project.title,
          category: project.category,
          logoUrl: project.logo_url,
          imageUrl: project.image_url,
          description: project.description,
          fullDescription: project.full_description || "",
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
    console.log("Adding new project:", project);
    
    // Preparar dados para inserção
    const projectData = {
      title: project.title,
      category: project.category,
      logo_url: project.logoUrl,
      image_url: project.imageUrl,
      description: project.description,
      full_description: project.fullDescription,
      video: project.video,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Inserir o novo projeto
    const { data: newProject, error } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (error) {
      console.error("Erro ao adicionar projeto:", error);
      return await fetchProjects();
    }

    console.log("Project added successfully:", newProject);
    
    // Buscar todos os projetos atualizados
    return await fetchProjects();
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    return await fetchProjects();
  }
};

export const updateProject = async (updatedProject: Project): Promise<Project[]> => {
  try {
    console.log("Updating project:", updatedProject);
    
    // Preparar dados para atualização
    const projectData = {
      title: updatedProject.title,
      category: updatedProject.category,
      logo_url: updatedProject.logoUrl,
      image_url: updatedProject.imageUrl,
      description: updatedProject.description,
      full_description: updatedProject.fullDescription,
      video: updatedProject.video,
      updated_at: new Date().toISOString()
    };
    
    // Atualizar o projeto
    const { error: projectError } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', updatedProject.id);

    if (projectError) {
      console.error("Erro ao atualizar projeto:", projectError);
      return await fetchProjects();
    }

    console.log("Project data updated successfully");

    // Se houver imagens na galeria, atualizá-las
    if (updatedProject.gallery && updatedProject.gallery.length > 0) {
      // Primeiro, excluir todas as imagens existentes
      console.log(`Removing existing gallery images for project ${updatedProject.id}`);
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
        position: index,
        created_at: new Date().toISOString()
      }));

      console.log(`Adding ${galleryData.length} new gallery images`);
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
    console.log(`Deleting project with ID: ${projectId}`);
    
    // Primeiro, excluir todas as imagens da galeria
    const { error: galleryError } = await supabase
      .from('project_gallery')
      .delete()
      .eq('project_id', projectId);
    
    if (galleryError) {
      console.error(`Erro ao excluir galeria do projeto ${projectId}:`, galleryError);
      // Continuar mesmo com erro, pois pode ser que não haja imagens
    }
    
    // Excluir o projeto
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error("Erro ao excluir projeto:", error);
      return await fetchProjects();
    }

    console.log("Project and gallery successfully deleted");
    
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
    console.log("Fetching site configuration...");
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar configuração do site:", error);
      return getDefaultSiteConfig();
    }

    if (data) {
      console.log("Site configuration retrieved successfully:", data);
      // Mapear o resultado para o formato esperado e garantir que socialLinks seja do tipo correto
      const socialLinksData = data.social_links as Json;
      
      // Inicializar um objeto vazio para os links sociais
      const socialLinks: { 
        linkedin?: string; 
        github?: string; 
        twitter?: string;
        facebook?: string;
        instagram?: string;
      } = {};
      
      // Verificar se socialLinksData é um objeto e não null
      if (socialLinksData && typeof socialLinksData === 'object' && !Array.isArray(socialLinksData)) {
        // Agora sabemos que é um objeto, podemos acessar as propriedades com segurança
        const links = socialLinksData as Record<string, Json>;
        
        if (links.linkedin && typeof links.linkedin === 'string') {
          socialLinks.linkedin = links.linkedin;
        }
        
        if (links.github && typeof links.github === 'string') {
          socialLinks.github = links.github;
        }
        
        if (links.twitter && typeof links.twitter === 'string') {
          socialLinks.twitter = links.twitter;
        }
        
        if (links.facebook && typeof links.facebook === 'string') {
          socialLinks.facebook = links.facebook;
        }
        
        if (links.instagram && typeof links.instagram === 'string') {
          socialLinks.instagram = links.instagram;
        }
      }
      
      return {
        title: data.title,
        subtitle: data.subtitle,
        featuredVideoUrl: data.featured_video_url || undefined,
        featuredVideoType: data.featured_video_type || "youtube",
        contactEmail: data.contact_email,
        contactPhone: data.contact_phone || "",
        socialLinks
      };
    } else {
      console.log("No site configuration found, using default");
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
    // Log do que está sendo enviado para depuração
    console.log("Salvando configuração:", config);
    
    // Verificar se já existe uma configuração
    const { data, error: queryError } = await supabase
      .from('site_config')
      .select('id')
      .limit(1);
      
    if (queryError) {
      console.error("Erro ao verificar configuração existente:", queryError);
      throw queryError;
    }

    // Prepara os dados para inserção/atualização no formato correto esperado pelo Supabase
    const configData = {
      title: config.title,
      subtitle: config.subtitle,
      featured_video_url: config.featuredVideoUrl || null,
      featured_video_type: config.featuredVideoType || "youtube",
      contact_email: config.contactEmail,
      contact_phone: config.contactPhone || null,
      social_links: config.socialLinks || {}, // Ensure it's always an object
      updated_at: new Date().toISOString()
    };
    
    // Log dos dados formatados
    console.log("Dados formatados para salvar:", configData);

    let result;
    
    if (data && data.length > 0) {
      console.log("Atualizando configuração existente com ID:", data[0].id);
      // Atualizar a configuração existente - usando upsert para garantir
      result = await supabase
        .from('site_config')
        .upsert({
          id: data[0].id,
          ...configData
        })
        .select();
    } else {
      console.log("Criando nova configuração");
      // Inserir uma nova configuração
      result = await supabase
        .from('site_config')
        .insert(configData)
        .select();
    }
    
    // Verificar erro após operação
    if (result.error) {
      console.error("Erro na operação de salvar configuração:", result.error);
      throw result.error;
    }
    
    console.log("Operação concluída com sucesso:", result.data);
    
    // Forçar uma atualização dos dados após a operação para verificar se foi bem-sucedido
    const { data: verificationData, error: verificationError } = await supabase
      .from('site_config')
      .select('*')
      .limit(1);
      
    if (verificationError) {
      console.error("Erro ao verificar atualização:", verificationError);
    } else {
      console.log("Verificação após atualização:", verificationData);
    }
  } catch (error) {
    console.error("Erro ao salvar configuração do site:", error);
    throw error;
  }
};

// Default values (fallback)
const getDefaultSiteConfig = (): SiteConfig => {
  return {
    title: "Meu Portfólio Profissional",
    subtitle: "Desenvolvedor Web & Designer",
    featuredVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featuredVideoType: "youtube",
    contactEmail: "contato@exemplo.com",
    contactPhone: "+55 11 12345-6789",
    socialLinks: {
      linkedin: "https://linkedin.com/in/exemplo",
      github: "https://github.com/exemplo",
      twitter: "https://twitter.com/exemplo",
      facebook: "",
      instagram: ""
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
