
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Project } from "@/types/Project";
import { X, Upload, Trash2, PlusCircle, Image, Save } from "lucide-react";

type ProjectMediaManagerProps = {
  project: Project;
  onUpdate: (updatedProject: Project) => void;
};

export const ProjectMediaManager = ({ project, onUpdate }: ProjectMediaManagerProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Efeito para autosave
  useEffect(() => {
    // Simular autosave com um delay
    const hasChanges = videoFile || imageFiles.length > 0;
    
    if (autoSave && hasChanges) {
      const timer = setTimeout(() => {
        handleSubmit(new Event('autoSave') as unknown as React.FormEvent);
      }, 30000); // Autosave a cada 30 segundos
      
      return () => clearTimeout(timer);
    }
  }, [videoFile, imageFiles, autoSave]);

  // Handler para vídeo
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

  // Handler para imagens
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processImageFiles(files);
  };

  // Processamento de arquivos de imagem
  const processImageFiles = (files: File[]) => {
    // Verificar limite máximo de imagens (contando as já existentes)
    const totalImages = project.gallery.length + imagePreviews.length + files.length;
    if (totalImages > 6) {
      toast.error(`Você ultrapassou o limite de 6 imagens (${project.gallery.length} existentes + ${files.length} novas).`);
      return;
    }
    
    // Include .heic files in the valid types
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || 
      file.name.toLowerCase().endsWith('.heic'));
      
    if (validFiles.length !== files.length) {
      toast.error("Alguns arquivos selecionados não são imagens válidas.");
    }
    
    // Criar previews para as imagens selecionadas
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviews(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    setImageFiles(prev => [...prev, ...validFiles]);
    toast.success(`${validFiles.length} imagens selecionadas com sucesso!`);
  };

  // Funções para drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      processImageFiles(files);
    }
  };

  // Remover imagem do preview
  const removeImagePreview = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Remover imagem existente da galeria
  const removeExistingImage = (index: number) => {
    const newGallery = [...project.gallery];
    newGallery.splice(index, 1);
    onUpdate({ ...project, gallery: newGallery });
    toast.success("Imagem removida da galeria!");
  };

  // Submit do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    
    // Simular um atraso de rede para fins de demonstração
    setTimeout(() => {
      // Em uma implementação real, aqui você faria o upload dos arquivos para um servidor
      // e atualizaria as URLs no projeto
      
      const newGalleryItems = imagePreviews.map((preview) => preview);
      const updatedGallery = [...project.gallery, ...newGalleryItems];
      
      onUpdate({
        ...project,
        gallery: updatedGallery,
        video: videoFile ? URL.createObjectURL(videoFile) : project.video
      });
      
      // Limpar estados após o sucesso
      setVideoFile(null);
      setImageFiles([]);
      setImagePreviews([]);
      setIsSaving(false);
      setLastSaved(new Date());
      
      if (e.type !== 'autoSave') {
        toast.success("Mídia atualizada com sucesso!");
      } else {
        toast.info("Alterações salvas automaticamente");
      }
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-primary mb-4">
        Gerenciar Mídia - {project.title}
      </h3>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="autosave"
            checked={autoSave}
            onChange={() => setAutoSave(!autoSave)}
            className="rounded text-primary focus:ring-primary"
          />
          <label htmlFor="autosave" className="text-sm text-gray-600">
            Salvar automaticamente
          </label>
        </div>
        
        {lastSaved && (
          <p className="text-xs text-gray-500">
            Última alteração salva: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vídeo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vídeo Principal
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
            >
              <Upload size={20} />
              <span>{videoFile ? videoFile.name : "Selecionar vídeo"}</span>
            </label>
            {videoFile && (
              <button
                type="button"
                onClick={() => setVideoFile(null)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          {project.video && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Vídeo atual:</p>
              <div className="relative">
                <video
                  src={project.video}
                  className="w-full max-h-40 object-cover rounded-lg"
                  controls
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                  onClick={() => onUpdate({ ...project, video: undefined })}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Galeria de Imagens */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Galeria de Imagens
            </label>
            <span className="text-xs text-gray-500">
              {project.gallery.length + imagePreviews.length}/6 imagens
            </span>
          </div>
          
          {/* Área de upload com drag and drop */}
          <div
            className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
              isDragging 
                ? "border-primary bg-primary/10" 
                : "border-gray-300 hover:border-primary hover:bg-primary/5"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Image className="text-gray-400" size={32} />
              </div>
              <p className="text-sm text-gray-600">
                Arraste e solte imagens aqui ou
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="hidden"
                id="gallery-upload"
                disabled={project.gallery.length + imagePreviews.length >= 6}
              />
              <label
                htmlFor="gallery-upload"
                className="inline-block mt-2 px-4 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusCircle className="inline-block mr-1 w-4 h-4" />
                Selecionar Imagens
              </label>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF até 5MB</p>
            </div>
          </div>
          
          {/* Preview das novas imagens */}
          {imagePreviews.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Novas imagens:</h4>
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={`new-${index}`} className="relative group">
                    <img
                      src={preview}
                      alt={`Nova imagem ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full group-hover:opacity-100 opacity-0 transition-opacity"
                      onClick={() => removeImagePreview(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Preview da galeria atual */}
          {project.gallery.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Imagens existentes:</h4>
              <div className="grid grid-cols-3 gap-2">
                {project.gallery.map((image, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <img
                      src={image}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeExistingImage(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Salvar Alterações</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
