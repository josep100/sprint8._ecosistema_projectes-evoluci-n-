import getPatients from "../services/patients.service";
import type { Patient } from "../types/patient.types";
import type { PostgrestError } from '@supabase/supabase-js'; // lo tengo que mirar nás hacia delante
import { useEffect, useState } from "react";

const usePatients = (page:number, perPage:number) => {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [error, setError] = useState<PostgrestError | null>(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchPatients = async () => {
            try{
                setLoading(true);
                const resp = await getPatients(page, perPage);
                setPatients(resp.data ?? []);
                setCount(resp.count ?? 0)
            }catch(error){
                setError(error as PostgrestError);
            }finally{
                setLoading(false);
            }
        }

        fetchPatients();
    }, [page]);

    return {patients, error, loading, count}

}

export default usePatients;

//TensorFlow