import { Input } from "../../../components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { PatientsSearchProps } from "../types/patient.types";

const PatientsSearch = ({ setFilter }: PatientsSearchProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter({
        search: value.trim() === "" ? undefined : value,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [value, setFilter]);

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-primary focus:border-primary transition-all"
          aria-label="Buscar pacientes por nombre"
          placeholder="Buscar pacientes por nombre..."
        />
      </div>
    </header>
  );
};

export default PatientsSearch;
