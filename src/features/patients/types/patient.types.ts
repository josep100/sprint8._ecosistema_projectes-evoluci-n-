import { z } from "zod";
import { patientSchema } from "../schema/patient.schema";
import type { ReactNode } from "react";

export type PatientFormData = z.infer<typeof patientSchema>;

export type Patient = {
  id_patient?: number;
  patient_image?: string | null;
  patient_name: string;
  alopecia_type?: PatientFormData["alopeciaType"];
  status?: PatientFormData["status"];
};

export type Filters = {
  alopeciaType?: string;
  status?: string;
  search?: string;
};

export type GetPatientsParams = {
  page?: number;
  perPage?: number;
} & Filters;

export type PatientRowProps = Patient & {
  onDelete: (id: number) => void;
  onEdit: (id: number, data: PatientFormData) => Promise<boolean>;
};

export type PatientsTableProps = {
  patients: Patient[];
  onDelete: (id: number) => void;
  onEdit: (id: number, data: PatientFormData) => Promise<boolean>;
};

export interface PatientFormProps {
  buttonText: string;
  defaultValues?: Partial<PatientFormData>;
  onSubmit: (data: PatientFormData) => void;
}

export interface PatientsHeadProps {
  onSubmit: (data: PatientFormData) => Promise<boolean>;
}

export interface PatientDialogProps {
  title: string;
  description: string;
  buttonText: string;
  onSubmit: (data: PatientFormData) => Promise<boolean>;
  defaultValues?: PatientFormData;
  children: ReactNode;
}

export type PatientFilterProps = {
  setFilter: (filter: Partial<Filters> | "all") => void;
  filters: Filters;
};

export type PatientsSearchProps = {
  setFilter: (filter: { search?: string }) => void;
};

export type PatientPaginationProps = {
  totalPages: number;
  currentPage: number;
  totalRegister: number;
  onPageChange: (page: number) => void;
};
