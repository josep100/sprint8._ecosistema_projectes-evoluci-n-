import type { Patient, PatientFormData } from "../types/patient.types";

export const mapPatientToForm = (patient: Patient): PatientFormData => {
  return {
    name: patient.patient_name,
    alopeciaType: patient.alopecia_type,
    status: patient.status,
    image: patient.patient_image ?? null,
  };
};



export const mapFormToPatient = (data: PatientFormData) => {
  return {
    patient_name: data.name,
    alopecia_type: data.alopeciaType,
    status: data.status,
    patient_image: data.image ?? null,
  };
};

export default mapFormToPatient;

