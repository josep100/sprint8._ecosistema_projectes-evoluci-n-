import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { PatientFormProps, PatientFormData } from "../types/patient.types";
import { Button } from "../../../components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  patientSchema,
  ALOPECIA_TYPES,
  STATUS_TYPES,
} from "../schema/patient.schema";

const PatientForm = ({ defaultValues, onSubmit }: PatientFormProps) => {
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: defaultValues || {
      name: "",
      alopeciaType: "androgenética",
      status: "activo",
      image: null,
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nombre completo del paciente</FieldLabel>
          <Input
            id="name"
            placeholder="p.ej. Sergio García"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <FieldError errors={[form.formState.errors.name]} />
          )}
        </Field>

        <Controller
          name="alopeciaType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="alopeciaType">Tipo de alopecia</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tipo de diagnóstico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Más común</SelectLabel>
                    {ALOPECIA_TYPES.slice(0, 4).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Menos común</SelectLabel>
                    {ALOPECIA_TYPES.slice(4, 8).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Otro / Desconocido</SelectLabel>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="status">Estado actual</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el estado" />
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      
      <div className="flex gap-2 mt-4">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reiniciar
        </Button>
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
};

export default PatientForm;
