import { TrashIcon, MoreVertical, Folder, Brain, Calendar } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

const PatientActions = ({
  id_patient,
  onDelete,
}: {
  id_patient: number;
  onDelete: (id: number) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border-none bg-transparent shadow-none cursor-pointer" variant="outline" aria-label="Abrir acciones del paciente">
          <MoreVertical aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-39">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Folder className="w-5 h-5 text-slate-400" />
            Ver Expediente
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Brain className="w-5 h-5 text-slate-400" />
            Nuevo Análisis IA
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar className="w-5 h-5 text-slate-400" />
            Agendar Cita
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              onDelete(id_patient);
            }}
          >
            <TrashIcon />
            Eliminar Paciente
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PatientActions;
