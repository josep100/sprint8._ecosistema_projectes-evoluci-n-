import usePatients from "../hooks/usePatients";
import PatientsTable from "../components/PatientsTable";
import PatientsPagination from "../components/PatientsPagination";
import PatientsHead from "./PatientsHead";
import { useState } from "react";
import { perPage } from "../../../config/constants"
import { toast } from "sonner"

const PatientsPage = () => {
    const onPageChange = (currentPage:number) => setCurrentPage(currentPage);
    const [currentPage, setCurrentPage] = useState(1);
    const { patients, error, loading, count, removePatient } = usePatients(currentPage,perPage);

    const totalPages = Math.ceil(count / perPage);

    const onDelete = async (id:number) => {
        
        const resp = await removePatient(id);
        console.log(resp.error);
        if(resp.error){
            
            toast.success("No se pudo eliminar el paciente", { position: "top-center" });
            return;
        }
        toast.success("Paciente eliminado correctamente", { position: "top-center" });
    }

    return(
        <>
            <PatientsHead />
            <PatientsTable patients = {patients} onDelete = {onDelete} />
            <PatientsPagination totalPages = {totalPages} currentPage = {currentPage} onPageChange = {onPageChange}/>
        </>
    )
}

export default PatientsPage;