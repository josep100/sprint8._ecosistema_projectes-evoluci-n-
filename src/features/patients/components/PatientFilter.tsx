import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import clsx from "clsx";
import { Button } from "../../../components/ui/button";
import { filtersAlopeciaTypes, STATUS_TYPES } from "../schema/patient.schema";
import type { PatientFilterProps } from "../types/patient.types"


const PatientFilter = ({ setFilter, filters }: PatientFilterProps) => {
  const getButtonStyles = (isActive: boolean) =>
    clsx(
      "btn-filter cursor-pointer",
      isActive
        ? "bg-primary-avatar hover:bg-primary-avatar/90 text-white"
        : "bg-white hover:bg-slate-50 text-slate-600",
    );

  return (
    <section className="flex flex-wrap items-center gap-3">
      <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mr-2">
        Filtros:
      </h2>

      <ul aria-label="Filtros" className="flex gap-4 flex-wrap">
        <li>
          <Button
            className={getButtonStyles(!filters.type)}
            onClick={() => setFilter("all")}
          >
            Todos los pacientes
          </Button>
        </li>

        {filtersAlopeciaTypes.map((type) => (
          <li key={type}>
            <Button
              className={getButtonStyles(filters.type === type)}
              onClick={() => setFilter({ type })}
            >
              {type}
            </Button>
          </li>
        ))}

        <li>
          <Select
            value={filters.status || ""}
            onValueChange={(value) => {
              setFilter({ status: value });
            }}
          >
            <SelectTrigger
              className={clsx(
                "btn-filter w-full max-w-48 cursor-pointer",
                filters.status
                  ? "bg-primary-avatar hover:bg-primary-avatar/90 text-white"
                  : "bg-white text-slate-600",
              )}
            >
              <SelectValue placeholder="Estado del paciente" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {STATUS_TYPES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </li>
      </ul>
    </section>
  );
};

export default PatientFilter;
