
import React, { useRef, useState } from "react";
import { Project } from "@/types/Project";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Image, Move, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDrag, useDrop } from "react-dnd";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type ProjectListProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onReorder: (projects: Project[]) => void;
  onUpdate: (project: Project) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const SponsorLogoManager = ({
  project,
  onUpdate
}: {
  project: Project,
  onUpdate: (project: Project) => void
}) => {
  const [logos, setLogos] = useState<string[]>(project.sponsorLogos || []);
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const validateUrl = (url: string) => {
    try {
      return url.toLowerCase().endsWith('.heic') || 
             url.match(/^https?:\/\/.+/) ||
             Boolean(new URL(url));
    } catch {
      return false;
    }
  };
  
  const handleAddLogo = () => {
    if (!newLogoUrl.trim()) {
      setError("URL não pode estar vazia");
      return;
    }
    
    if (!validateUrl(newLogoUrl)) {
      setError("URL inválida");
      return;
    }
    
    const updatedLogos = [...logos, newLogoUrl];
    setLogos(updatedLogos);
    setNewLogoUrl("");
    setError("");
  };
  
  const handleRemoveLogo = (index: number) => {
    const updatedLogos = [...logos];
    updatedLogos.splice(index, 1);
    setLogos(updatedLogos);
  };
  
  const handleSave = () => {
    const updatedProject = {
      ...project,
      sponsorLogos: logos
    };
    
    onUpdate(updatedProject);
    setIsOpen(false);
    toast.success("Logos de patrocinadores atualizados com sucesso!");
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
      >
        <Image className="w-4 h-4 mr-1" />
        Patrocinadores
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gerenciar Logos de Patrocinadores</DialogTitle>
            <DialogDescription>
              Adicione, edite ou remova os logos dos patrocinadores para {project.title}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex flex-wrap gap-3 mb-4">
              {logos.length === 0 ? (
                <p className="text-sm text-gray-500">Nenhum logo de patrocinador adicionado.</p>
              ) : (
                logos.map((logo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={logo} 
                      alt={`Logo ${index + 1}`}
                      className="h-16 w-auto max-w-[150px] object-contain border rounded p-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLogo(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remover logo"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newLogoUrl}
                  onChange={(e) => {
                    setNewLogoUrl(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="URL do logo"
                  className={error ? "border-destructive" : ""}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddLogo}
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
              {error && (
                <p className="text-sm font-medium text-destructive">{error}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const DraggableProjectCard = ({ 
  project, 
  index, 
  onSelect, 
  onDelete, 
  onMove,
  onUpdate
}: { 
  project: Project, 
  index: number, 
  onSelect: (project: Project) => void, 
  onDelete: (projectId: string) => void,
  onMove: (dragIndex: number, hoverIndex: number) => void,
  onUpdate: (project: Project) => void
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'PROJECT_CARD',
    item: { id: project.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, drop] = useDrop({
    accept: 'PROJECT_CARD',
    hover: (item: DragItem, monitor) => {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  
  drag(drop(ref));
  
  const hasLogos = project.sponsorLogos && project.sponsorLogos.length > 0;
  
  return (
    <Card 
      ref={ref} 
      className={`overflow-hidden transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white/80 hover:bg-white"
            title="Mover projeto"
          >
            <Move className="w-4 h-4 text-gray-700" />
          </Button>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <img 
            src={project.logoUrl} 
            alt="" 
            className="w-8 h-8 object-contain" 
          />
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </div>
        <CardDescription>{project.category}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
        
        {hasLogos && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Patrocinadores:</p>
            <div className="flex flex-wrap gap-2">
              {project.sponsorLogos.slice(0, 3).map((logo, idx) => (
                <img 
                  key={idx}
                  src={logo}
                  alt={`Patrocinador ${idx+1}`}
                  className="h-8 w-auto max-w-[80px] object-contain"
                />
              ))}
              {project.sponsorLogos.length > 3 && (
                <span className="text-xs text-gray-500 self-center">
                  +{project.sponsorLogos.length - 3} mais
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onSelect(project)}
        >
          <Edit2 className="w-4 h-4 mr-1" />
          Editar
        </Button>
        
        <SponsorLogoManager 
          project={project}
          onUpdate={onUpdate}
        />
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-1" />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o projeto "{project.title}"? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onDelete(project.id)}
                className="bg-red-500 hover:bg-red-600"
              >
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export const ProjectList = ({ projects, onSelect, onDelete, onReorder, onUpdate }: ProjectListProps) => {
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newProjects = [...projects];
    const draggedItem = newProjects[dragIndex];
    
    // Remove the dragged item
    newProjects.splice(dragIndex, 1);
    
    // Insert it at the new position
    newProjects.splice(hoverIndex, 0, draggedItem);
    
    onReorder(newProjects);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Meus Projetos</h2>
        <p className="text-sm text-gray-500">Arraste para reordenar</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-12">
            Nenhum projeto encontrado. Crie um novo projeto para começar.
          </p>
        ) : (
          projects.map((project, index) => (
            <DraggableProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={onSelect}
              onDelete={onDelete}
              onMove={moveCard}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};
