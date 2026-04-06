import type { PatientsHeadProps } from "../types/patient.types";
import PatientDialog from "../components/PatientDialog";
import { Button } from "../../../components/ui/button";

const PatientsHead = ({ onSubmit }: PatientsHeadProps) => {
  return (
    <>
      <h1>Gestión de pacientes</h1>
      <p>
        Gestionar y realizar el seguimiento de los historiales clínicos de todos
        los pacientes sometidos a restauración capilar.
      </p>

      <PatientDialog
        title="Nuevo paciente"
        description="Agregar nuevo paciente"
        onSubmit={onSubmit}
      >
        <Button>Agregar paciente</Button>
      </PatientDialog>
    </>
  );
};

export default PatientsHead;
