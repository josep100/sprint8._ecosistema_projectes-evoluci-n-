import {
  getPatients,
  deletePatient,
  createPatient,
  updatePatient,
} from "../services/patients.service";
import type { Patient, PatientFormData } from "../types/patient.types";
import type { PostgrestError } from "@supabase/supabase-js"; // lo tengo que mirar nás hacia delante
import { useEffect, useState } from "react";

const usePatients = (page: number, perPage: number) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const fetchPatients = async (filtre?) => {
    try {
      setLoading(true);
      const resp = await getPatients({ page, perPage, ...filtre });
      setPatients(resp.data ?? []);
      setCount(resp.count ?? 0);
    } catch (error) {
      setError(error as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page]);

  const removePatient = async (id: number) => {
    try {
      const resp = await deletePatient(id);

      if (resp.error) {
        setError(resp.error);
        return resp;
      }

      await fetchPatients();
      return resp;
    } catch (error) {
      console.error(error);

      setError({
        message: "Error inesperado",
      } as PostgrestError);

      return { error };
    }
  };

  const insertPatient = async (data: PatientFormData) => {
    try {
      const error = await createPatient(data);

      if (error) {
        setError(error);
        return error;
      }

      await fetchPatients();
      return null;
    } catch (error) {
      console.error(error);

      const unexpectedError = {
        message: "Error inesperado",
      } as PostgrestError;

      setError(unexpectedError);
      return unexpectedError;
    }
  };

  const handleUpdatePatient = async (
    idPatient: number,
    data: PatientFormData,
  ) => {
    try {
      const error = await updatePatient(data, idPatient);

      if (error) {
        setError(error);
        return false;
      }

      await fetchPatients();
      return true;
    } catch (error) {
      console.error(error);

      const unexpectedError = {
        message: "Error inesperado",
      } as PostgrestError;

      setError(unexpectedError);
      return false;
    }
  };

  return {
    patients,
    error,
    loading,
    count,
    setPatients,
    removePatient,
    insertPatient,
    handleUpdatePatient,
    fetchPatients,
  };
};

export default usePatients;

//TensorFlow
