import { useApolloClient, useQuery } from "@apollo/client/react";
import type { PostModel } from "@/entities/post";
import { gql } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { GET_POST } from "../api/FindPostSchema";

export interface FindPostResponce {
  post: PostModel;
};

const useFindPost = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const client = useApolloClient();
	const post = client.readFragment<PostModel>({
		id: `PostModel:${id}`,
		fragment: gql`
			fragment PostFields on PostModel {
				author {
					avatarUrl
					firstName
					lastName
				}
				authorId
				createdAt
				description
				id
				mediaUrl
				title
				isLiked
			}
		`,
	});
  const { data, loading } = useQuery<FindPostResponce>(GET_POST, {
    skip: !id || !!post,
    variables: { input: { id: id } }
  });
  const imageKey = data?.post.mediaUrl.split("/")[-1] || "";
  return { post: post || data?.post, imageKey, loading };
};

export default useFindPost;
