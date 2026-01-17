import type { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  handleScrollMarkerIntersect: () => void;
  networkStatus?: number;
}