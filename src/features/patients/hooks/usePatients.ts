import {
  getPatients,
  deletePatient,
  createPatient,
  updatePatient,
} from "../services/patients.service";
import type { Patient, PatientFormData } from "../types/patient.types";
import type { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const fetchPatients = async (
    page: number,
    perPage: number,
    filters?: any,
  ) => {
    try {
      setLoading(true);
      const resp = await getPatients({ page, perPage, ...filters });
      setPatients(resp.data ?? []);
      setCount(resp.count ?? 0);
    } catch (error) {
      setError(error as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  const removePatient = async (id: number) => {
    const resp = await deletePatient(id);
    if (resp.error) setError(resp.error);
    return resp;
  };

  const insertPatient = async (data: PatientFormData) => {
    const error = await createPatient(data);
    if (error) setError(error);
    return error;
  };

  const handleUpdatePatient = async (
    idPatient: number,
    data: PatientFormData,
  ) => {
    const error = await updatePatient(data, idPatient);
    if (error) {
      setError(error);
      return false;
    }
    return true;
  };

  return {
    patients,
    error,
    loading,
    count,
    fetchPatients,
    removePatient,
    insertPatient,
    handleUpdatePatient,
  };
};

export default usePatients;
