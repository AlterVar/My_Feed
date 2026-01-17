import type { ReactNode } from "react";

export interface Props {
	type: "submit" | "button";
	size?: "small" | "large";
	variant: "primary" | "secondary" | "flat" | "icon";
	text: string | ReactNode;
	icon?: ReactNode;
	isLiked?: boolean;
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
}