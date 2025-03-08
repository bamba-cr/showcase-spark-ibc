
import React, { useRef } from "react";
import { Project } from "@/types/Project";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Image, Move, ArrowUp, ArrowDown } from "lucide-react";
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

type ProjectListProps = {
  projects: Project[];
  onSelect: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onReorder: (projects: Project[]) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const DraggableProjectCard = ({ 
  project, 
  index, 
  onSelect, 
  onDelete, 
  onMove
}: { 
  project: Project, 
  index: number, 
  onSelect: (project: Project) => void, 
  onDelete: (projectId: string) => void,
  onMove: (dragIndex: number, hoverIndex: number) => void 
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
            className="w-8 h-8 object-contain" // Increased size for better visibility
          />
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </div>
        <CardDescription>{project.category}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
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
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onSelect(project)}
        >
          <Image className="w-4 h-4 mr-1" />
          Mídia
        </Button>
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

export const ProjectList = ({ projects, onSelect, onDelete, onReorder }: ProjectListProps) => {
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
            />
          ))
        )}
      </div>
    </div>
  );
};
