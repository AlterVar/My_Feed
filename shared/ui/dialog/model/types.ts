import type { ReactNode } from "react";

export interface Props {
	variant: "center" | "sticky";
	post?: boolean;
	children: ReactNode;
	onClose: () => void;
}