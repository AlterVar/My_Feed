import type z from "zod";
import type { signUpSchema } from "./validationSchema";
import type { User } from "@/entities/user";

export interface SignUpResponse {
  userSignUp: {
    token: string;
		problem: { message: string };
		user: User;
  };
};

export type SignUpForm = z.infer<typeof signUpSchema>;
export type Fields =
  | "email"
  | "password"
  | "passwordConfirm"
  | "firstName"
  | "lastName"
  | "middleName";

export type FieldsWithServerValidation = Extract<
  Fields,
  "email"
>;
