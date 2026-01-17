import type { PostModel } from "@/entities/post";
import type { SortType } from "@/features/post/sort-posts";

export interface FindPostsRequest {
	afterCursor: string;
	limit: number;
	type: SortType;
};

export interface FindPostsResponce {
  posts: {
    data: PostModel[];
    pageInfo: {
      afterCursor: string;
    };
  };
};