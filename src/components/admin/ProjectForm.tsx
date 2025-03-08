import React, { useState } from "react";
import { Project } from "@/types/Project";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X, Plus } from "lucide-react";

type ProjectFormProps = {
  project?: Omit<Project, "id" | "gallery">;
  onSubmit: (data: Omit<Project, "id" | "gallery">) => void;
};

const projectSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  category: z.string().min(2, { message: "A categoria deve ter pelo menos 2 caracteres" }),
  logoUrl: z.string().url({ message: "URL do logo inválida" }),
  imageUrl: z.string().url({ message: "URL da imagem inválida" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  fullDescription: z.string().min(20, { message: "A descrição completa deve ter pelo menos 20 caracteres" }),
  video: z.string().url({ message: "URL do vídeo inválida" }).optional().or(z.literal("")),
});

export const ProjectForm = ({ project, onSubmit }: ProjectFormProps) => {
  const [sponsorLogos, setSponsorLogos] = useState<string[]>(project?.sponsorLogos || []);
  const [newSponsorLogo, setNewSponsorLogo] = useState("");
  const [sponsorLogoError, setSponsorLogoError] = useState("");

  const defaultValues = {
    title: project?.title || "",
    category: project?.category || "",
    logoUrl: project?.logoUrl || "https://img.icons8.com/fluency/96/puzzle.png",
    imageUrl: project?.imageUrl || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    description: project?.description || "",
    fullDescription: project?.fullDescription || "",
    video: project?.video || "",
  };

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const handleAddSponsorLogo = () => {
    if (!newSponsorLogo) {
      setSponsorLogoError("URL não pode estar vazia");
      return;
    }

    try {
      if (newSponsorLogo.toLowerCase().endsWith('.heic') || 
          newSponsorLogo.match(/^https?:\/\/.+/)) {
        setSponsorLogos([...sponsorLogos, newSponsorLogo]);
        setNewSponsorLogo("");
        setSponsorLogoError("");
      } else {
        new URL(newSponsorLogo);
        setSponsorLogos([...sponsorLogos, newSponsorLogo]);
        setNewSponsorLogo("");
        setSponsorLogoError("");
      }
    } catch (e) {
      setSponsorLogoError("URL inválida");
    }
  };

  const handleRemoveSponsorLogo = (index: number) => {
    const updatedLogos = [...sponsorLogos];
    updatedLogos.splice(index, 1);
    setSponsorLogos(updatedLogos);
  };

  const handleSubmit = (data: z.infer<typeof projectSchema>) => {
    const projectData: Omit<Project, "id" | "gallery"> = {
      title: data.title,
      category: data.category,
      logoUrl: data.logoUrl,
      imageUrl: data.imageUrl,
      description: data.description,
      fullDescription: data.fullDescription,
      video: data.video,
      sponsorLogos: sponsorLogos,
    };
    
    onSubmit(projectData);
    if (!project) {
      form.reset();
      setSponsorLogos([]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? "Editar Projeto" : "Novo Projeto"}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do projeto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: web, mobile, design" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL do Logo</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Imagem Principal</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Label htmlFor="sponsorLogos">Logos dos Patrocinadores</Label>
              
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {sponsorLogos.map((logo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={logo} 
                      alt={`Patrocinador ${index + 1}`} 
                      className="h-12 w-auto max-w-[120px] object-contain border rounded p-1"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSponsorLogo(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remover logo"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  id="newSponsorLogo"
                  value={newSponsorLogo}
                  onChange={(e) => {
                    setNewSponsorLogo(e.target.value);
                    if (sponsorLogoError) setSponsorLogoError("");
                  }}
                  placeholder="URL do logo do patrocinador"
                  className={sponsorLogoError ? "border-destructive" : ""}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddSponsorLogo}
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
              {sponsorLogoError && (
                <p className="text-sm font-medium text-destructive mt-1">{sponsorLogoError}</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="video"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Vídeo (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição Curta</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve descrição do projeto" 
                      className="resize-none" 
                      rows={2}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição Completa</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição detalhada do projeto" 
                      className="resize-none" 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {project ? "Atualizar Projeto" : "Criar Projeto"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
