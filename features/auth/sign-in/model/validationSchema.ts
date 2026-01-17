import { fieldSchemas } from "@/shared/lib";
import z from "zod";

export const signInSchema = z.object({
		email: fieldSchemas.email(),
		password: z.string().min(1, " "),
});