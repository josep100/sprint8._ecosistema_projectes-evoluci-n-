import usePatients from "../hooks/usePatients";
import usePatientMutations from "../hooks/usePatientMutations";
import PatientsTable from "../components/PatientsTable";
import PatientsPagination from "../components/PatientsPagination";
import PatientsSearch from "../components/PatientsSearch";
import PatientFilter from "../components/PatientFilter";
import PatientSpinner from "../components/PatientSpinner";
import PatientsHead from "./PatientsHead";
import { useEffect, useState } from "react";
import { perPage } from "../../../config/constants";
import { toast } from "sonner";
import type { PatientFormData, hookFilters } from "../types/patient.types";

const PatientsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<hookFilters>({});

  const { patients, error, loading, count, fetchPatients } = usePatients();

  const { removePatient, insertPatient, editPatient } = usePatientMutations();

  const totalPages = Math.ceil(count / perPage);

  const refetch = () => {
    fetchPatients(currentPage, perPage, filters);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, filters]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterPatients = (filter: Partial<hookFilters> | "all") => {
    if (filter === "all") {
      setFilters({});
      setCurrentPage(1);
      return;
    }

    setFilters((prev) => ({ ...prev, ...filter }));
    setCurrentPage(1);
  };

  const onDelete = async (id: number) => {
    const success = await removePatient(id);

    if (!success) {
      toast.error("No se pudo eliminar el paciente");
      return;
    }

    toast.success("Paciente eliminado correctamente");
    refetch();
  };

  const handleSubmitPatient = async (data: PatientFormData) => {
    const success = await insertPatient(data);

    if (!success) {
      toast.error("No se pudo crear el paciente");
      return false;
    }

    toast.success("Paciente creado correctamente");
    refetch();
    return true;
  };

  const handleEditPatient = async (
    idPatient: number,
    data: PatientFormData,
  ) => {
    const success = await editPatient(idPatient, data);

    if (!success) {
      toast.error("No se pudo actualizar el paciente");
      return false;
    }

    toast.success("Paciente actualizado correctamente");
    refetch();
    return true;
  };

  return (
    <div className="flex flex-col gap-8">
      <PatientsSearch setFilter={handleFilterPatients} />
      <PatientsHead onSubmit={handleSubmitPatient} />
      <PatientFilter setFilter={handleFilterPatients} filters={filters} />

      {loading ? (
        <PatientSpinner />
      ) : error ? (
        <p className="text-red-500">{error.message}</p>
      ) : (
        <div>
          <PatientsTable
            patients={patients}
            onDelete={onDelete}
            onEdit={handleEditPatient}
          />

          <PatientsPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalRegister={count}
          />
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
