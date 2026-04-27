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
    <div className="bg-white border border-slate-200 rounded-t-2xl overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-slate-50/50 border-b border-slate-200">
            <TableHead className="table-head-cell">
              Nombre del paciente
            </TableHead>
            <TableHead className="table-head-cell">ID del paciente</TableHead>
            <TableHead className="table-head-cell">Tipo de alopecia</TableHead>
            <TableHead className="table-head-cell">Estado</TableHead>
            <TableHead className="table-head-cell">Próxima visita</TableHead>
            <TableHead className="table-head-cell">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" divide-slate-100">
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
    </div>
  );
};

export default PatientsTable;
