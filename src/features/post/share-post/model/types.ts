import type { DialogType } from "@/shared/types/types";

export interface Props {
  openDialog: (type: DialogType) => void;
  id: string;
}