import PatientRow from "./PatientRow";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../../components/ui/table";
import type { PatientsTableProps } from "../types/patient.types";

const PatientsTable = ({ patients, onDelete, onEdit }: PatientsTableProps) => {
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
        {patients.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              No hay pacientes que coincidan con tu búsqueda o filtros.
            </TableCell>
          </TableRow>
        ) : (
          patients.map((patient) => (
            <PatientRow
              key={patient.id_patient}
              {...patient}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default PatientsTable;
