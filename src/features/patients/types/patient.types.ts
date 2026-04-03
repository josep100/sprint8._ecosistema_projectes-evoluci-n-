export type Patient = {
    id_patient: number,
    patient_image: string | null,
    patient_name: string,
    alopecia_type: string,
    status: string,
}

export type PatientRowProps = Patient & {
  onDelete: (id: number) => void;
};

export type PatientsTableProps = {
  patients: Patient[];
  onDelete: (id: number) => void;
};

