
import { useState } from "react";
import { toast } from "sonner";
import { Project } from "@/types/Project";
import { X } from "lucide-react";

type ProjectMediaManagerProps = {
  project: Project;
  onUpdate: (updatedProject: Project) => void;
};

export const ProjectMediaManager = ({ project, onUpdate }: ProjectMediaManagerProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        toast.success("Vídeo selecionado com sucesso!");
      } else {
        toast.error("Por favor, selecione um arquivo de vídeo válido.");
      }
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 6) {
      toast.error("Você pode selecionar no máximo 6 imagens.");
      return;
    }
    
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      toast.error("Alguns arquivos selecionados não são imagens válidas.");
    }
    
    setImageFiles(validFiles);
    toast.success(`${validFiles.length} imagens selecionadas com sucesso!`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Em uma implementação real, aqui você faria o upload dos arquivos para um servidor
    // e atualizaria as URLs no projeto
    toast.success("Mídia atualizada com sucesso!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-ibc-purple mb-4">
        Gerenciar Mídia - {project.title}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vídeo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vídeo Principal
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {project.video && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Vídeo atual:</p>
              <video
                src={project.video}
                className="mt-1 w-full max-h-40 object-cover rounded-lg"
                controls
              />
            </div>
          )}
        </div>

        {/* Galeria de Imagens */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Galeria de Imagens (máximo 6)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          
          {/* Preview da galeria atual */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {project.gallery.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const newGallery = [...project.gallery];
                    newGallery.splice(index, 1);
                    onUpdate({ ...project, gallery: newGallery });
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-ibc-purple text-white py-2 rounded-lg hover:bg-opacity-90 transition-all"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};
