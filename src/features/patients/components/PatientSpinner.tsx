import { Spinner } from "../../../components/ui/spinner";

const PatientSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <Spinner />
      <p className="text-sm text-muted-foreground">Cargando pacientes...</p>
    </div>
  );
};

export default PatientSpinner;
