import supabase from "../../../shared/services/supabaseClient";
import HARDCODED_DOCTOR_ID from "../../../config/constants";

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



// getPatients
// getPatientById
// createPatient
// updatePatient
// deletePatient
