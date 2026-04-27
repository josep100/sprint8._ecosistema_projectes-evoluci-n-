import * as z from "zod";

export const ALOPECIA_TYPES = [
  "Androgénica",
  "Areata",
  "Aelógeno",
  "Difusa",
  "Cicatricial",
  "Por_Tracción",
  "Frontal_Fibrosante",
  "Anágeno",
  "Otro",
  "Desconocido",
] as const;

export const STATUS_TYPES = [
  "Active",
  "Inactive",
  "In_Treatment",
  "Consultation",
  "Completed",
] as const;

export const filtersAlopeciaTypes = [
   "Androgénica",
   "Areata",
   "Difusa",
]

export const patientSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres").max(50),
  alopeciaType: z.enum(ALOPECIA_TYPES),
  status: z.enum(STATUS_TYPES),
  image: z.string().nullable().optional(),
});
