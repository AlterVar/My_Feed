import type z from "zod";
import type { signInSchema } from "./validationSchema";
import type { User } from "@/entities/user";

export interface SignInResponse {
  userSignIn: {
    token: string;
		problem: { message: string };
		user: User;
  };
};

export type SignInForm = z.infer<typeof signInSchema>;
export type Fields = "email" | "password";
