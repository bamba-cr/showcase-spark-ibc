
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { SiteConfig } from "@/types/SiteConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type SiteConfigFormProps = {
  config: SiteConfig;
  onSubmit: (data: SiteConfig) => void;
};

const siteConfigSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  subtitle: z.string().min(3, { message: "O subtítulo deve ter pelo menos 3 caracteres" }),
  featuredVideoUrl: z.string().url({ message: "URL do vídeo inválida" }).optional().or(z.literal("")),
  featuredVideoType: z.enum(["youtube", "vimeo", "custom"]).default("youtube"),
  contactEmail: z.string().email({ message: "Email inválido" }),
  contactPhone: z.string().min(10, { message: "Telefone inválido" }),
  socialLinks: z.object({
    linkedin: z.string().url({ message: "URL do LinkedIn inválida" }).optional().or(z.literal("")),
    github: z.string().url({ message: "URL do Github inválida" }).optional().or(z.literal("")),
    twitter: z.string().url({ message: "URL do Twitter inválida" }).optional().or(z.literal("")),
    facebook: z.string().url({ message: "URL do Facebook inválida" }).optional().or(z.literal("")),
    instagram: z.string().url({ message: "URL do Instagram inválida" }).optional().or(z.literal(""))
  })
});

export const SiteConfigForm = ({ config, onSubmit }: SiteConfigFormProps) => {
  const [videoType, setVideoType] = useState(config?.featuredVideoType || "youtube");

  const defaultValues = {
    title: config?.title || "",
    subtitle: config?.subtitle || "",
    featuredVideoUrl: config?.featuredVideoUrl || "",
    featuredVideoType: config?.featuredVideoType || "youtube",
    contactEmail: config?.contactEmail || "",
    contactPhone: config?.contactPhone || "",
    socialLinks: {
      linkedin: config?.socialLinks?.linkedin || "",
      github: config?.socialLinks?.github || "",
      twitter: config?.socialLinks?.twitter || "",
      facebook: config?.socialLinks?.facebook || "",
      instagram: config?.socialLinks?.instagram || "",
    }
  };

  const form = useForm<z.infer<typeof siteConfigSchema>>({
    resolver: zodResolver(siteConfigSchema),
    defaultValues,
  });

  // Atualiza o tipo de vídeo quando muda no form
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "featuredVideoType") {
        setVideoType(value.featuredVideoType as string);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleSubmit = (data: z.infer<typeof siteConfigSchema>) => {
    const siteConfig: SiteConfig = {
      title: data.title,
      subtitle: data.subtitle,
      featuredVideoUrl: data.featuredVideoUrl,
      featuredVideoType: data.featuredVideoType,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      socialLinks: {
        linkedin: data.socialLinks.linkedin,
        github: data.socialLinks.github,
        twitter: data.socialLinks.twitter,
        facebook: data.socialLinks.facebook,
        instagram: data.socialLinks.instagram
      }
    };
    
    onSubmit(siteConfig);
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
                  name="featuredVideoType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Vídeo</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="youtube" id="youtube" />
                            <Label htmlFor="youtube">YouTube</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="vimeo" id="vimeo" />
                            <Label htmlFor="vimeo">Vimeo</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom">Vídeo Personalizado</Label>
                          </div>
                        </RadioGroup>
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
                        <Input placeholder={
                          videoType === "youtube" 
                            ? "https://www.youtube.com/embed/VIDEO_ID" 
                            : videoType === "vimeo" 
                              ? "https://player.vimeo.com/video/VIDEO_ID" 
                              : "https://example.com/video.mp4"
                        } {...field} />
                      </FormControl>
                      <FormDescription>
                        {videoType === "youtube" 
                          ? "Use o formato de embed do YouTube: https://www.youtube.com/embed/VIDEO_ID" 
                          : videoType === "vimeo" 
                            ? "Use o formato de embed do Vimeo: https://player.vimeo.com/video/VIDEO_ID" 
                            : "Insira a URL direta para um arquivo de vídeo MP4"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Alert variant="default" className="bg-muted/50">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {videoType === "youtube" && (
                      <>
                        Para vídeos do YouTube, use a URL de incorporação que começa com "https://www.youtube.com/embed/". 
                        Você pode obter essa URL clicando em "Compartilhar" no YouTube, depois em "Incorporar" e copiando apenas a parte "src" do código.
                      </>
                    )}
                    {videoType === "vimeo" && (
                      <>
                        Para vídeos do Vimeo, use a URL de incorporação que começa com "https://player.vimeo.com/video/". 
                        Você pode obter essa URL clicando em "Compartilhar" no Vimeo, depois em "Incorporar" e copiando apenas a parte "src" do código.
                      </>
                    )}
                    {videoType === "custom" && (
                      <>
                        Para vídeos personalizados, insira a URL direta do arquivo de vídeo (formato MP4 recomendado).
                      </>
                    )}
                  </AlertDescription>
                </Alert>
                
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
                
                <FormField
                  control={form.control}
                  name="socialLinks.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/seu-perfil" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialLinks.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/seu-perfil" {...field} />
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
