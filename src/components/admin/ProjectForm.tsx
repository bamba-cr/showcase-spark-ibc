import React from "react";
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
  // Define defaultValues with correct non-optional types
  const defaultValues: Omit<Project, "id" | "gallery"> = {
    title: project?.title || "",
    category: project?.category || "",
    logoUrl: project?.logoUrl || "https://img.icons8.com/fluency/96/puzzle.png",
    imageUrl: project?.imageUrl || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    description: project?.description || "",
    fullDescription: project?.fullDescription || "",
    // Since video is optional in Project type, we can use empty string as a default
    video: project?.video || "",
  };

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof projectSchema>) => {
    onSubmit(data);
    if (!project) {
      form.reset();
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
