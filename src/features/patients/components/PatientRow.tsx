import type { PatientRowProps } from "../types/patient.types";
import { TableRow, TableCell } from "../../../components/ui/table";
import PatientActions from "./PatientActions";

const PatientRow = ({
  id_patient,
  patient_image,
  patient_name,
  alopecia_type,
  status,
  onDelete,
}: PatientRowProps) => {
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
        <PatientActions id_patient={id_patient} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default PatientRow;
