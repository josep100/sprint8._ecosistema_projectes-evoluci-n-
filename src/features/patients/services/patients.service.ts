import supabase from "../../../shared/services/supabaseClient";
import HARDCODED_DOCTOR_ID from "../../../config/constants";
import type { PatientFormData } from "../types/patient.types";

export const getPatients = async (page: number, perPage: number) => {
  const start = (page - 1) * perPage;
  const end = start + perPage - 1;

  const { data, error, count } = await supabase
    .from("patients")
    .select("id_patient, patient_image, patient_name, alopecia_type, status", {
      count: "exact",
    })
    .eq("doctor_auth_uid", HARDCODED_DOCTOR_ID)
    .range(start, end);

  return { data, error, count };
};

export const deletePatient = async (id: number) => {
  const response = await supabase
    .from("patients")
    .delete()
    .eq("id_patient", id);

  return response;
};

export const createPatient = async ({name, image, alopeciaType, status}: PatientFormData) => {
  const { error } = await supabase
    .from("patients")
    .insert({
      patient_name: name,
      patient_image: image ?? null,
      alopecia_type: alopeciaType,
      status: status,
      doctor_auth_uid: "37ac1b19-e13c-4832-8925-bb7cb743466c",
      id_clinics_FK: 4
    });

  return error;
};

// getPatientById
// createPatient
// updatePatient
