import { fieldSchemas } from "@/shared/lib";
import z from "zod";

export const signUpSchema = z
  .object({
    email: fieldSchemas.email(),
    password: fieldSchemas.password(),
    passwordConfirm: fieldSchemas.confirmPassword(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Пароли не совпадают",
		path: ["passwordConfirm"],
		when(payload) {
			return signUpSchema
				.pick({ email: true })
				.safeParse(payload.value).success;
		}
  });
