import type { PatientRowProps } from "../types/patient.types";
import { SquarePen } from "lucide-react";
import { TableRow, TableCell } from "../../../components/ui/table";
import PatientActions from "./PatientActions";
import PatientDialog from "./PatientDialog";
import { mapPatientToForm } from "../utils/patient.mapper";

const PatientRow = ({
  id_patient,
  patient_image,
  patient_name,
  alopecia_type,
  status,
  onDelete,
  onEdit,
}: PatientRowProps) => {
  const patient = mapPatientToForm({
    id_patient,
    patient_image,
    patient_name,
    alopecia_type,
    status,
  });

  return (
    <TableRow>
      <TableCell>
        <div>
          <figure>
            <img src={patient_image} alt="imagen del paciente" />
          </figure>
          {patient_name}
        </div>
      </TableCell>
      <TableCell>{id_patient}</TableCell>
      <TableCell>{alopecia_type}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell></TableCell>
      <TableCell>
        <PatientDialog
          title="Editar paciente"
          description="Modificar datos del paciente"
          onSubmit={(data) => onEdit(id_patient, data)}
          defaultValues={patient}
        >
          <SquarePen />
        </PatientDialog>
        <PatientActions id_patient={id_patient} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default PatientRow;
