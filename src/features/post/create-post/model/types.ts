import type { FieldValues, Path, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface CreateFormRequest {
  title: string;
  description: string;
  mediaUrl: string;
}

export interface CreateFormValues {
  title: string;
  description: string;
  mediaUrl: FileList;
}

export interface Props<T extends FieldValues> {
	register: UseFormRegister<T>;
	name: Path<T> & string;
	isLoading: boolean;
	progress: number;
	savedImage?: string;
	setValue: UseFormSetValue<{
		title: string;
		description: string;
		mediaUrl: FileList;
	}>;
}