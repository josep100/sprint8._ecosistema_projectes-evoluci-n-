import * as z from "zod";



export const appointmentSchema = z.object({
  patient_id: z
    .number({
      error: "El paciente es obligatorio",
    })
    .int()
    .positive("El paciente es obligatorio"),

  appointment_date: z.date({
    error: "La fecha es obligatoria",
  }),

  time: z
    .string()
    .min(1, "La hora es obligatoria"),

  treatment_type: z.enum(
    ["scheduled", "completed", "cancelled"],
    {
      error: "Selecciona un tipo de tratamiento",
    }
  ),

  priority: z
    .enum(["low", "medium", "high"]),

  notes: z
    .string()
    .max(500, "Máximo 500 caracteres")
});