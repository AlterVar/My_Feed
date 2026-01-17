import type { User } from "@/entities/user";
import ProfileForm from "../ui/ProfileForm";
import z from "zod";
import { profileValidation } from "./validationSchema";
import type { Control, UseFormGetValues, UseFormRegister } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";

export interface UserResponce {
  userEditProfile: {
    problem: { message: string, __typename: string };
    user: User;
  };
}
export type ProfileForm = z.infer<typeof profileValidation>;
export type Fields = "email" | "phone";

export interface RadioProps {
  label: string;
  register: UseFormRegister<ProfileForm>;
  name: keyof ProfileForm;
  value: string;
}

export interface DateInputProps {
  control: Control<ProfileForm>;
  name: "birthDate";
}

export interface CancelDialogProps {
  cancelChange: () => void;
  editUser: (data: ProfileForm) => void;
  getValues: UseFormGetValues<ProfileForm>;
  setOpenCancelDialog: Dispatch<SetStateAction<boolean>>;
}

export interface AvatarProps {
	register: UseFormRegister<ProfileForm>;
	deleteAvatar: () => void;
	avatarImage: string;
}

export interface DropdownOptionsProps {
  deleteAvatar: () => void;
}