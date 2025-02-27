
import React from "react";
import { ProjectMediaManager } from "@/components/admin/ProjectMediaManager";

const Admin = () => {
  const mockProject = {
    id: "mock-project",
    title: "Projeto de Demonstração",
    category: "demo",
    logoUrl: "https://img.icons8.com/fluency/96/puzzle.png", // Adicionando logoUrl
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    description: "Este é um projeto de demonstração para testes.",
    fullDescription: "Descrição completa do projeto de demonstração para fins de teste e visualização no painel administrativo.",
    gallery: [],
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>
      <ProjectMediaManager project={mockProject} />
    </div>
  );
};

export default Admin;
