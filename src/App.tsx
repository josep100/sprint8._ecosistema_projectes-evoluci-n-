import { RouterProvider } from "react-router-dom";
import { router } from "./Router/AppRouter";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
