import usePatients from "../hooks/usePatients";
import PatientsTable from "../components/PatientsTable";
import PatientsPagination from "../components/PatientsPagination";
import PatientsHead from "./PatientsHead";
import { useEffect, useState } from "react";
import { perPage } from "../../../config/constants";
import { toast } from "sonner";
import type {
  PatientFormData,
  PatientFilterType,
  Patient,
} from "../types/patient.types";
import PatientFilter from "../components/PatientFilter";

type TipoDeFilters = {
  type?: string;
  status?: string;
};

const PatientsPage = () => {
  const onPageChange = (currentPage: number) => setCurrentPage(currentPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TipoDeFilters>({});
  const {
    patients,
    error,
    loading,
    count,
    setPatients,
    removePatient,
    insertPatient,
    handleUpdatePatient,
    fetchPatients,
  } = usePatients(currentPage, perPage);

  const totalPages = Math.ceil(count / perPage);

  const onDelete = async (id: number) => {
    const resp = await removePatient(id);

    if (resp.error) {
      toast.error("No se pudo eliminar el paciente", {
        position: "top-center",
      });
      return;
    }
    toast.success("Paciente eliminado correctamente", {
      position: "top-center",
    });
  };

  const handleSubmitPatient = async (data: PatientFormData) => {
    const error = await insertPatient(data);

    if (error) {
      toast.error("No se pudo crear el paciente", {
        position: "top-center",
      });
      return false;
    }

    toast.success("Paciente creado correctamente", {
      position: "top-center",
    });
    return true;
  };

  const handleEditPatient = async (
    idPatient: number,
    data: PatientFormData,
  ) => {
    const success = await handleUpdatePatient(idPatient, data);

    if (!success) {
      toast.error("No se pudo actualizar el paciente", {
        position: "top-center",
      });
      return false;
    }

    toast.success("Paciente actualizado correctamente", {
      position: "top-center",
    });

    return true;
  };

  useEffect(() => {
    fetchPatients(filters);
  }, [filters]);

  const handleFilterPatients = async (filter) => {
    if (filter === "all") {
      setFilters({});
      return;
    }

    setFilters((prev) => ({ ...prev, ...filter }));
  };

  return (
    <>
      <PatientsHead onSubmit={handleSubmitPatient} />
      <PatientFilter setFilter={handleFilterPatients} />
      <PatientsTable
        patients={patients}
        onDelete={onDelete}
        onEdit={handleEditPatient}
      />
      {/* <PatientsPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      /> */}
    </>
  );
};

export default PatientsPage;
