import supabase from "../../../shared/services/supabaseClient";
import HARDCODED_DOCTOR_ID from "../../../config/constants";
import type {
  PatientFormData,
  GetPatientsParams,
} from "../types/patient.types";
import { mapFormToPatient } from "../utils/patient.mapper";

export const getPatients = async ({
  page,
  perPage,
  alopeciaType,
  status,
  search,
}: GetPatientsParams) => {
  let query = supabase
    .from("patients")
    .select("id_patient, patient_image, patient_name, alopecia_type, status", {
      count: "exact",
    })
    .eq("doctor_auth_uid", HARDCODED_DOCTOR_ID)
    .order("id_patient", { ascending: true });

  if (alopeciaType && alopeciaType !== "all") {
    query = query.eq("alopecia_type", alopeciaType);
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (search?.trim()) {
    query = query.ilike("patient_name", `%${search}%`);
  }

  if (page && perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage - 1;
    query = query.range(start, end);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return { data, count,error };
};

export const deletePatient = async (id: number) => {
  const { error } = await supabase
    .from("patients")
    .delete()
    .eq("id_patient", id);

  if (error) throw error;
};

export const createPatient = async (data: PatientFormData) => {
  const patient = mapFormToPatient(data);

  const { error } = await supabase.from("patients").insert({
    ...patient,
    doctor_auth_uid: HARDCODED_DOCTOR_ID,
    id_clinics_FK: 4,
  });

  if (error) throw error;
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

  if (error) throw error;
};
