import { z } from "zod"

const passwordSchema = z
    .string()
    .min(6, "Mínimo 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[^A-Za-z0-9]/, "Debe contener un carácter especial")

export default passwordSchema;