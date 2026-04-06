import * as z from "zod";

export const ALOPECIA_TYPES = [
  "androgenética",
  "areata",
  "telógeno",
  "difusa",
  "cicatricial",
  "por_tracción",
  "frontal_fibrosante",
  "anágeno",
  "otro",
  "desconocido",
] as const;

export const STATUS_TYPES = [
  "activo",
  "en_tratamiento",
  "seguimiento",
  "finalizado",
] as const;

export const patientSchema = z.object({
  name: z.string().min(5, "El nombre debe tener al menos 5 caracteres").max(50),
  alopeciaType: z.enum(ALOPECIA_TYPES),
  status: z.enum(STATUS_TYPES),
  image: z.string().nullable().optional(),
});
