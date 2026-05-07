import { createBrowserRouter } from "react-router-dom";
import AppShell from "../layout/AppShell/AppShell";
import PatientsPage from "../features/patients/pages/PatientsPage";
import AppointmentsPage from "../features/appointments/pages/AppointmentsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <div>Dashboard</div>,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "appointments",
        element: < AppointmentsPage/>,
      },
    ],
  },
]);
