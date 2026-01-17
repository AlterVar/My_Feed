import type { PostModel } from "@/entities/post";

export interface FindFavouritePostsResponce {
	favouritePosts: {
		data: PostModel[];
		pageInfo: {
			afterCursor: string;
		};
	};
};