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
      setError(null);

      const resp = await getPatients({ page, perPage, ...filters });

      if (resp.error) {
        setError(resp.error);
        setPatients([]);
        setCount(0);
        return;
      }

      setPatients(resp.data ?? []);
      setCount(resp.count ?? 0);
    } catch (error) {
      setError({
        message: "Error inesperado al cargar pacientes",
      } as PostgrestError);

      setPatients([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  const removePatient = async (id: number) => {
    setError(null);

    try {
      const resp = await deletePatient(id);

      if (resp.error) {
        setError(resp.error);
        return resp;
      }

      return resp;
    } catch (error) {
      setError({
        message: "Error inesperado al eliminar paciente",
      } as PostgrestError);

      return { error };
    }
  };

  const insertPatient = async (data: PatientFormData) => {
    setError(null);

    try {
      const error = await createPatient(data);

      if (error) {
        setError(error);
        return error;
      }

      return null;
    } catch (error) {
      setError({
        message: "Error inesperado al crear paciente",
      } as PostgrestError);

      return error;
    }
  };

  const handleUpdatePatient = async (
    idPatient: number,
    data: PatientFormData,
  ) => {
    setError(null);

    try {
      const error = await updatePatient(data, idPatient);

      if (error) {
        setError(error);
        return false;
      }

      return true;
    } catch (error) {
      setError({
        message: "Error inesperado al actualizar paciente",
      } as PostgrestError);

      return false;
    }
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
