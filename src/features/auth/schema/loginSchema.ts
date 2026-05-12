import { z } from "zod";
import passwordSchema from "./passwordSchema";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Introduce un email válido"),
  password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
