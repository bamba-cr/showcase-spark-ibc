
import { Project } from "@/types/Project";
import { SiteConfig } from "@/types/SiteConfig";

// Storage keys
export const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects',
  SITE_CONFIG: 'portfolio_site_config'
};

// Default project data
const DEFAULT_PROJECTS: Project[] = [
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

// Default site configuration
const DEFAULT_SITE_CONFIG: SiteConfig = {
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

// Project functions
export const getProjects = (): Project[] => {
  try {
    const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (savedProjects) {
      return JSON.parse(savedProjects);
    }
    
    // If no projects found, save and return defaults
    saveProjects(DEFAULT_PROJECTS);
    return DEFAULT_PROJECTS;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return DEFAULT_PROJECTS; // Return defaults on error instead of empty array
  }
};

export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (error) {
    console.error("Erro ao salvar projetos:", error);
  }
};

export const addProject = (project: Project): Project[] => {
  try {
    const projects = getProjects();
    const updatedProjects = [...projects, project];
    saveProjects(updatedProjects);
    return updatedProjects;
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error);
    return getProjects();
  }
};

export const updateProject = (updatedProject: Project): Project[] => {
  try {
    const projects = getProjects();
    const updatedProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    saveProjects(updatedProjects);
    return updatedProjects;
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return getProjects();
  }
};

export const deleteProject = (projectId: string): Project[] => {
  try {
    const projects = getProjects();
    const updatedProjects = projects.filter(project => project.id !== projectId);
    saveProjects(updatedProjects);
    return updatedProjects;
  } catch (error) {
    console.error("Erro ao excluir projeto:", error);
    return getProjects();
  }
};

export const reorderProjects = (reorderedProjects: Project[]): void => {
  saveProjects(reorderedProjects);
};

// Site Configuration functions
export const getSiteConfig = (): SiteConfig => {
  try {
    const savedConfig = localStorage.getItem(STORAGE_KEYS.SITE_CONFIG);
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
    
    // If no config found, save and return defaults
    saveSiteConfig(DEFAULT_SITE_CONFIG);
    return DEFAULT_SITE_CONFIG;
  } catch (error) {
    console.error("Erro ao buscar configuração do site:", error);
    return DEFAULT_SITE_CONFIG;
  }
};

export const saveSiteConfig = (config: SiteConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SITE_CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error("Erro ao salvar configuração do site:", error);
  }
};

// Helper function for query refetching
export const fetchProjects = async (): Promise<Project[]> => {
  return getProjects();
};

export const fetchSiteConfig = async (): Promise<SiteConfig> => {
  return getSiteConfig();
};

export default {
  getProjects,
  saveProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects,
  getSiteConfig,
  saveSiteConfig,
  fetchProjects,
  fetchSiteConfig
};
