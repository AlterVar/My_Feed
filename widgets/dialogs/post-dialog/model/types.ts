import type { DialogType } from "@/shared/types/types";

export interface Props {
	closeDialog: () => void;
	openDialog: (type: DialogType) => void;
}