import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  variant: "modal" | "inline";
}