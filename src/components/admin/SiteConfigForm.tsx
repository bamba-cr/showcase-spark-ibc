
import React from "react";
import { SiteConfig } from "@/types/SiteConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SiteConfigFormProps = {
  config: SiteConfig;
  onSubmit: (data: SiteConfig) => void;
};

const siteConfigSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  subtitle: z.string().min(3, { message: "O subtítulo deve ter pelo menos 3 caracteres" }),
  featuredVideoUrl: z.string().url({ message: "URL do vídeo inválida" }).optional().or(z.literal("")),
  contactEmail: z.string().email({ message: "Email inválido" }),
  contactPhone: z.string().min(10, { message: "Telefone inválido" }),
  socialLinks: z.object({
    linkedin: z.string().url({ message: "URL do LinkedIn inválida" }).optional().or(z.literal("")),
    github: z.string().url({ message: "URL do GitHub inválida" }).optional().or(z.literal("")),
    twitter: z.string().url({ message: "URL do Twitter inválida" }).optional().or(z.literal(""))
  })
});

export const SiteConfigForm = ({ config, onSubmit }: SiteConfigFormProps) => {
  // Make sure we have valid default values that match the required SiteConfig type
  const defaultValues: SiteConfig = {
    title: config.title,
    subtitle: config.subtitle,
    featuredVideoUrl: config.featuredVideoUrl || "",
    contactEmail: config.contactEmail,
    contactPhone: config.contactPhone,
    socialLinks: {
      linkedin: config.socialLinks.linkedin || "",
      github: config.socialLinks.github || "",
      twitter: config.socialLinks.twitter || ""
    }
  };

  const form = useForm<z.infer<typeof siteConfigSchema>>({
    resolver: zodResolver(siteConfigSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof siteConfigSchema>) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Portfólio</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="general">Geral</TabsTrigger>
                <TabsTrigger value="contact">Contato</TabsTrigger>
                <TabsTrigger value="social">Redes Sociais</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título do Portfólio</FormLabel>
                      <FormControl>
                        <Input placeholder="Meu Portfólio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtítulo</FormLabel>
                      <FormControl>
                        <Input placeholder="Desenvolvedor Web & Designer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="featuredVideoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do Vídeo em Destaque</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/embed/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("featuredVideoUrl") && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Prévia do vídeo:</p>
                    <div className="relative pt-[56.25%] w-full overflow-hidden rounded-lg bg-gray-100">
                      <iframe 
                        src={form.watch("featuredVideoUrl")} 
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email de Contato</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contato@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone de Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="+55 11 12345-6789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="social" className="space-y-4">
                <FormField
                  control={form.control}
                  name="socialLinks.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/seu-perfil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialLinks.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/seu-perfil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/seu-perfil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Salvar Configurações
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
