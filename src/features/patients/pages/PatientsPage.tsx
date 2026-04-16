import usePatients from "../hooks/usePatients";
import PatientsTable from "../components/PatientsTable";
import PatientsPagination from "../components/PatientsPagination";
import PatientsSearch from "../components/PatientsSearch";
import PatientsHead from "./PatientsHead";
import { useEffect, useState } from "react";
import { perPage } from "../../../config/constants";
import { toast } from "sonner";
import type { PatientFormData } from "../types/patient.types";
import PatientFilter from "../components/PatientFilter";

type Filters = {
  type?: string;
  status?: string;
  search?: string;
};

const PatientsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});

  const {
    patients,
    error,
    loading,
    count,
    fetchPatients,
    removePatient,
    insertPatient,
    handleUpdatePatient,
  } = usePatients();

  const totalPages = Math.ceil(count / perPage);

  useEffect(() => {
    fetchPatients(currentPage, perPage, filters);
  }, [currentPage, filters]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterPatients = (filter: Partial<Filters> | "all") => {
    if (filter === "all") {
      setFilters({});
      setCurrentPage(1);
      return;
    }

    setFilters((prev) => ({ ...prev, ...filter }));
    setCurrentPage(1); // 👈 MUY IMPORTANTE
  };

  const onDelete = async (id: number) => {
    const resp = await removePatient(id);

    if (resp.error) {
      toast.error("No se pudo eliminar el paciente");
      return;
    }

    toast.success("Paciente eliminado correctamente");

    fetchPatients(currentPage, perPage, filters);
  };

  const handleSubmitPatient = async (data: PatientFormData) => {
    const error = await insertPatient(data);

    if (error) {
      toast.error("No se pudo crear el paciente");
      return false;
    }

    toast.success("Paciente creado correctamente");

    fetchPatients(currentPage, perPage, filters);
    return true;
  };

  const handleEditPatient = async (
    idPatient: number,
    data: PatientFormData,
  ) => {
    const success = await handleUpdatePatient(idPatient, data);

    if (!success) {
      toast.error("No se pudo actualizar el paciente");
      return false;
    }

    toast.success("Paciente actualizado correctamente");

    fetchPatients(currentPage, perPage, filters);
    return true;
  };

  return (
    <>
      <PatientsSearch setFilter={handleFilterPatients} />
      <PatientsHead onSubmit={handleSubmitPatient} />
      <PatientFilter setFilter={handleFilterPatients} />

      <PatientsTable
        patients={patients}
        onDelete={onDelete}
        onEdit={handleEditPatient}
      />

      <PatientsPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default PatientsPage;
