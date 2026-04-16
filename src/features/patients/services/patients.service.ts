import supabase from "../../../shared/services/supabaseClient";
import HARDCODED_DOCTOR_ID from "../../../config/constants";
import type { PatientFormData } from "../types/patient.types";
import { mapFormToPatient } from "../utils/patient.mapper";

export const getPatients = async ({
  page,
  perPage,
  type,
  status,
  search
}: {
  page?: number;
  perPage?: number;
  type?: string;
  status?: string;
  search?: string;
}) => {
  let query = supabase
    .from("patients")
    .select("id_patient, patient_image, patient_name, alopecia_type, status", {
      count: "exact",
    })
    .eq("doctor_auth_uid", HARDCODED_DOCTOR_ID)
    .order("id_patient", { ascending: true });
  if (type && type !== "all") {
    query = query.eq("alopecia_type", type);
  }
  if (status) {
    query = query.eq("status", status);
  }

  if (search && search.trim() !== "") {
  query = query.ilike("patient_name", `%${search}%`);
}
  if (page && perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage - 1;
    query = query.range(start, end);
  }

  const { data, error, count } = await query;
  return { data, error, count };
};

export const deletePatient = async (id: number) => {
  const response = await supabase
    .from("patients")
    .delete()
    .eq("id_patient", id);

  return response;
};

export const createPatient = async ({
  name,
  image,
  alopeciaType,
  status,
}: PatientFormData) => {
  const { error } = await supabase.from("patients").insert({
    patient_name: name,
    patient_image: image ?? null,
    alopecia_type: alopeciaType,
    status: status,
    doctor_auth_uid: "37ac1b19-e13c-4832-8925-bb7cb743466c",
    id_clinics_FK: 4,
  });

  return error;
};

export const updatePatient = async (
  data: PatientFormData,
  idPatient: number,
) => {
  const patient = mapFormToPatient(data);
  const { error } = await supabase
    .from("patients")
    .update(patient)
    .eq("id_patient", idPatient);

  return error;
};

// getPatientById
