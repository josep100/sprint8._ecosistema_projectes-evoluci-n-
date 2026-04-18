import { Input } from "../../../components/ui/input";

type PatientsSearchProps = {
  setFilter: (filter: { search?: string }) => void;
};

const PatientsSearch = ({ setFilter }: PatientsSearchProps) => {
  return (
    <Input
      aria-label="Buscar pacientes por nombre"
      placeholder="Buscar pacientes por nombre"
      onChange={(event) => {
        const value = event.target.value;

        setFilter({
          search: value.trim() === "" ? undefined : value,
        });
      }}
    />
  );
};

export default PatientsSearch;