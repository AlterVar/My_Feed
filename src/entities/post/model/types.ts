import type { DialogType } from "@/shared/types/types";
import type { ReactNode } from "react";

export interface Props {
  post: PostModel;
  readMoreBtn?: ReactNode;
  type: "short" | "long";
	openDialog?: (type: DialogType, id: string) => void;
}

export interface PostModel {
  author: {
    avatarUrl: string;
    firstName: string;
    lastName: string;
  };
  authorId: string;
  createdAt: string;
  description: string;
  id: string;
  mediaUrl: string;
  title: string;
  isLiked: boolean;
}

export interface PostLoadingProps {
	type: "long" | "short";
}
