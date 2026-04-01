import usePatients from "../hooks/usePatients";
import PatientRow from "./PatientRow";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "../../../components/ui/table";
import type { Patient } from "../types/patient.types";

const PatientsTable = ({patients}: { patients: Patient[] }) => {
  //const { patients, error, loading } = usePatients();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre del paciente</TableHead>
          <TableHead>ID del paciente</TableHead>
          <TableHead>Tipo de alopecia</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Próxima visita</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map(
          ({
            id_patient,
            patient_image,
            patient_name,
            alopecia_type,
            status,
          }) => (
            <PatientRow
              key={id_patient}
              id_patient={id_patient}
              patient_image={patient_image}
              patient_name={patient_name}
              alopecia_type={alopecia_type}
              status={status}
            />
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default PatientsTable;
