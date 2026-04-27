import type { PatientRowProps } from "../types/patient.types";
import { SquarePen } from "lucide-react";
import { TableRow, TableCell } from "../../../components/ui/table";
import PatientActions from "./PatientActions";
import PatientDialog from "./PatientDialog";
import { mapPatientToForm } from "../utils/patient.mapper";
import clsx from "clsx";
import {
  avatarColors,
  typeAlopeciaColors,
  statusColors,
  defaultTypeColor,
  defaultStatusColor,
} from "../utils/patientColors";

const getInitials = (fullName: string) =>
  fullName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .slice(0, 2)
    .join("");

const getAvatarColor = (name: string) => {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return avatarColors[hash % avatarColors.length];
};

const PatientRow = ({
  id_patient,
  patient_image,
  patient_name,
  alopecia_type,
  status,
  onDelete,
  onEdit,
}: PatientRowProps) => {
  const colors = getAvatarColor(patient_name);

  const colorType = typeAlopeciaColors[alopecia_type] ?? defaultTypeColor;

  const colorStatus = statusColors[status] ?? defaultStatusColor;

  const patient = mapPatientToForm({
    id_patient,
    patient_image,
    patient_name,
    alopecia_type,
    status,
  });

  return (
    <TableRow>
      <TableCell className="px-6 py-5">
        <div className="flex items-center gap-3">
          <figure
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm overflow-hidden",
              colors.bg,
              colors.text,
            )}
          >
            {patient_image ? (
              <img
                src={patient_image}
                alt="imagen del paciente"
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(patient_name)
            )}
          </figure>

          <div className="font-semibold text-slate-900">{patient_name}</div>
        </div>
      </TableCell>

      <TableCell className="px-6 py-5 text-sm text-slate-500 font-mono">
        {id_patient}
      </TableCell>

      <TableCell className="px-6 py-5">
        <span
          className={clsx(
            "px-3 py-1 rounded-full text-xs font-bold",
            colorType.bg,
            colorType.text,
          )}
        >
          {alopecia_type}
        </span>
      </TableCell>

      <TableCell className="px-6 py-5">
        <div className="flex items-center gap-2">
          <span className={clsx("w-2 h-2 rounded-full", colorStatus.bg)} />
          {status}
        </div>
      </TableCell>

      <TableCell className="px-6 py-5 text-sm text-slate-600" />

      <TableCell className="flex items-center gap-2 px-6 py-5 text-right">
        <PatientDialog
          title="Editar paciente"
          description="Modificar datos del paciente"
          buttonText="Editar paciente"
          onSubmit={(data) => onEdit(id_patient, data)}
          defaultValues={patient}
        >
          <SquarePen className="cursor-pointer" />
        </PatientDialog>

        <PatientActions id_patient={id_patient} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default PatientRow;
