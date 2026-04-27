import type { PatientsHeadProps } from "../types/patient.types";
import PatientDialog from "../components/PatientDialog";
import { Button } from "../../../components/ui/button";
import { UserPlus } from "lucide-react";

const PatientsHead = ({ onSubmit }: PatientsHeadProps) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Gestión de pacientes
        </h1>

        <p className="text-slate-500 mt-1 max-w-xl">
          Gestiona y realiza el seguimiento de los historiales clínicos de tus
          pacientes.
        </p>
      </div>

      <PatientDialog
        title="Nuevo paciente"
        description="Agregar nuevo paciente"
        buttonText="Crear paciente"
        onSubmit={onSubmit}
      >
        <Button className="flex items-center gap-2 p-6 bg-primary-avatar text-white hover:bg-primary-avatar/90 shadow-lg shadow-primary/20 cursor-pointer">
          <UserPlus className="w-5 h-5" />
          Agregar paciente
        </Button>
      </PatientDialog>
    </header>
  );
};

export default PatientsHead;
