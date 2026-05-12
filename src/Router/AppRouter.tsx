import { createBrowserRouter } from "react-router-dom";
import AppShell from "../layout/AppShell/AppShell";
import PatientsPage from "../features/patients/pages/PatientsPage";
import AppointmentsPage from "../features/appointments/pages/AppointmentsPage";
import LoginForm from "../features/auth/component/LoginForm";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
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
        element: <AppointmentsPage />,
      },
      {
        path: "treatments",
        element: <div>Treatments</div>,
      },
      {
        path: "analytics",
        element: <div>Analytics</div>,
      }
    ],
  },
]);
