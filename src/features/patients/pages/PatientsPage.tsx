import usePatients from "../hooks/usePatients";
import PatientsTable from "../components/PatientsTable";
import PatientsPagination from "../components/PatientsPagination";
import { useState } from "react";
import { perPage } from "../../../config/constants"

const PatientsPage = () => {
    const onPageChange = (currentPage:number) => setCurrentPage(currentPage);
    const [currentPage, setCurrentPage] = useState(1);
    const { patients, error, loading, count } = usePatients(currentPage,perPage);

    const totalPages = Math.ceil(count / perPage);

    return(
        <>
            <PatientsTable patients = {patients}/>
            <PatientsPagination totalPages = {totalPages} currentPage = {currentPage} onPageChange = {onPageChange}/>
        </>
    )
}

export default PatientsPage;