import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface Props<T extends FieldValues> {
	label: string;
	type: "text" | "password" | "email";
	name: Path<T> & string;
	placeholder: string;
	readOnly?: boolean;
	register: UseFormRegister<T>;
	dirty?: boolean;
	validationError?: FieldError;
	requestError?: boolean;
	requestErrorMessage?: string;
}