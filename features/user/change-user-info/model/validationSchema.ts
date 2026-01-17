
import { fieldSchemas } from "@/shared/lib";
import z from "zod";

export const profileValidation = z.object({
  email: fieldSchemas.email(),
  phone: fieldSchemas.phone().optional(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
	lastName: z.string().optional(),
	avatarUrl: z.instanceof(FileList).optional().or(z.string().optional()),
  birthDate: z.string().optional(),
  country: z.string().optional(),
  gender: z.string().optional()
});
