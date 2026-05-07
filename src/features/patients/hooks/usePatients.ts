import { getPatients, patientService } from "../services/patients.service";
import type { Patient } from "../types/patient.types";
import type { PostgrestError } from "@supabase/supabase-js";
import { useState } from "react";
import type { hookFilters } from "../types/patient.types";

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const fetchPatients = async (
    page: number,
    perPage: number,
    filters?: hookFilters,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const {
        data,
        error: serviceError,
        count,
      } = await getPatients({
        page,
        perPage,
        ...filters,
      });

      if (serviceError) {
        setError(serviceError);
        setPatients([]);
        setCount(0);
        return;
      }

      setPatients(data ?? []);
      setCount(count ?? 0);
    } catch (err) {
      setError({
        message: "Error inesperado al cargar pacientes",
      } as PostgrestError);

      setPatients([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  const searchPatients = async (query: string) => {
    if (!query) {
      setPatients([]);

      return;
    }

    try {
      setLoading(true);
      const data = await patientService.searchPatients(query);
      setPatients(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    patients,
    error,
    loading,
    count,
    fetchPatients,
    searchPatients
  };
};

export default usePatients;
