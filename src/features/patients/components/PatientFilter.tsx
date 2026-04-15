import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

const PatientFilter = ({ setFilter }) => {
  return (
    <section>
      <h2>Filtros:</h2>
      <div>
        <Button
          onClick={() => {
            setFilter("all");
          }}
        >
          Todos los pacientes
        </Button>
        <Button
          onClick={() => {
            setFilter({ type: "Androgénica" });
          }}
        >
          Androgénica
        </Button>

        <Button
          onClick={() => {
            setFilter({ type: "Areata" });
          }}
        >
          Areata
        </Button>
        <Button
          onClick={() => {
            setFilter({ type: "Difusa" });
          }}
        >
          Difusa
        </Button>

        <Select
          defaultValue="Active"
          onValueChange={(value) => {
            setFilter({ status: value });
          }}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Active">Activo</SelectItem>
              <SelectItem value="Inactive">Inactivo</SelectItem>
              <SelectItem value="in_treatment">En Tratamiento</SelectItem>
              <SelectItem value="consultation">Consulta</SelectItem>
              <SelectItem value="completed">Finalizado</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default PatientFilter;
