import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const PatientFilter = ({ setFilter, filters }) => {
  return (
    <section>
      <h2>Filtros:</h2>

      <ul aria-label="Filtros">
        <li>
          <Button onClick={() => setFilter("all")}>Todos los pacientes</Button>
        </li>
        <li>
          <Button onClick={() => setFilter({ type: "Androgénica" })}>
            Androgénica
          </Button>
        </li>
        <li>
          <Button onClick={() => setFilter({ type: "Areata" })}>Areata</Button>
        </li>
        <li>
          <Button onClick={() => setFilter({ type: "Difusa" })}>Difusa</Button>
        </li>
        <li>
          <Select
            value={filters.status || ""}
            onValueChange={(value) => {
              setFilter({ status: value });
            }}
          >
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Estado del paciente" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="Actives">Activo</SelectItem>
                <SelectItem value="Inactive">Inactivo</SelectItem>
                <SelectItem value="in_treatment">En Tratamiento</SelectItem>
                <SelectItem value="consultation">Consulta</SelectItem>
                <SelectItem value="completed">Finalizado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </li>
      </ul>
    </section>
  );
};

export default PatientFilter;
