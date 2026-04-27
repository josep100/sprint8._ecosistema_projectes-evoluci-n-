import {
  deletePatient,
  createPatient,
  updatePatient,
} from "../services/patients.service";
import type { PatientFormData } from "../types/patient.types";
import type { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";

const usePatientMutations = () => {
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);

  const removePatient = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await deletePatient(id);
      return true;
    } catch (err) {
      setError(err as PostgrestError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const insertPatient = async (data: PatientFormData) => {
    setLoading(true);
    setError(null);

    try {
      await createPatient(data);
      return true;
    } catch (err) {
      setError(err as PostgrestError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editPatient = async (
    idPatient: number,
    data: PatientFormData,
  ) => {
    setLoading(true);
    setError(null);

    try {
      await updatePatient(data, idPatient);
      return true;
    } catch (err) {
      setError(err as PostgrestError);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    removePatient,
    insertPatient,
    editPatient,
    error,
    loading,
  };
};

export default usePatientMutations;