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
import { useEffect, useRef } from "react";
import { Camera, CheckCircle } from "lucide-react";

const PatientForm = ({
  buttonText,
  defaultValues,
  onSubmit,
}: PatientFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: defaultValues || {
      name: "",
      alopeciaType: "Androgénica",
      status: "Active",
      image: null,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="image"
        control={form.control}
        render={({ field }) => (
          <div className="space-y-2 mb-4">
            <label className="text-sm font-bold text-slate-700">
              Foto del paciente
            </label>

            <div
              className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-12 h-12 rounded-full bg-primary-avatar/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>

              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">
                  Click para subir o arrastrar
                </p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG o WEBP</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
            />
          </div>
        )}
      />

      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">
                Nombre completo del paciente
              </FieldLabel>
              <Input {...field} id="name" placeholder="p.ej. Sergio García" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="alopeciaType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="alopeciaType">Tipo de alopecia</FieldLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="alopeciaType">
                  <SelectValue placeholder="Seleccione el tipo de diagnóstico" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos</SelectLabel>
                    {ALOPECIA_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
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
                <SelectTrigger id="status">
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

      <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reiniciar
        </Button>

        <Button
          type="submit"
          className="flex items-center gap-2 bg-primary-avatar text-white hover:bg-primary-avatar/90"
        >
          <CheckCircle className="w-5 h-5" />
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;
