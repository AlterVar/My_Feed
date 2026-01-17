import type { ProfileFormType } from "@/features/user/change-user-info";
import type { Control } from "react-hook-form";

export interface CalendarProps {
	control: Control<ProfileFormType>;
	name: "birthDate";
}