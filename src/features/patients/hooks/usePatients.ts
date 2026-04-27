import { getPatients } from "../services/patients.service";
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
      const { data, count } = await getPatients({
        page,
        perPage,
        ...filters,
      });

      setPatients(data ?? []);
      setCount(count ?? 0);
    } catch (err) {
      setError(err as PostgrestError);
      setPatients([]);
      setCount(0);
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
  };
};

export default usePatients;
