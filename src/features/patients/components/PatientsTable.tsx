import PatientRow from "./PatientRow";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "../../../components/ui/table";
import type { PatientsTableProps } from "../types/patient.types";

const PatientsTable = ({ patients, onDelete }: PatientsTableProps) => {
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
        {patients.map((patient) => (
          <PatientRow
            key={patient.id_patient}
            {...patient}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default PatientsTable;
