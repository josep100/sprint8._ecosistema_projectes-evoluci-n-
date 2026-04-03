// import AppRoutes from "./routes/AppRoutes";
// import { BrowserRouter } from "react-router-dom"
import PatientsPage from "./features/patients/pages/PatientsPage"
import { Toaster } from "sonner";

function App() {
  
  return (
      // <BrowserRouter>
      //   <main>
      //     <AppRoutes />
      //   </main>
      // </BrowserRouter>
      <main>
          <Toaster/>
          <PatientsPage />
      </main>
  )
}

export default App
