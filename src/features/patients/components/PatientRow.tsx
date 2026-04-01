import type { Patient } from "../types/patient.types";
import { TableRow, TableCell } from "../../../components/ui/table";

const PatientRow = ({
  id_patient,
  patient_image,
  patient_name,
  alopecia_type,
  status,
}: Patient) => {
  return (
    <TableRow>
      <TableCell>
        <div>
          <figure>
            <img src = {patient_image} alt = "imagen del paciente" />
          </figure>
          {patient_name}
        </div>
      </TableCell>
      <TableCell>{id_patient}</TableCell>
      <TableCell>{alopecia_type}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default PatientRow;
