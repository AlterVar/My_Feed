import type { PostModel } from "@/entities/post";
import type { User } from "@/entities/user";

export interface FindMyPostsResponce {
  myPosts: {
		data: PostModel[];
		pageInfo: {
			afterCursor: string
		}
  };
};

export interface CtaProps {user: User | null}
