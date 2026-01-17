import { gql } from "@apollo/client";

export const GET_MY_POSTS = gql`
	query GetMyPosts($input: FindMyPostsRequest!) {
		myPosts(input: $input) {
			data {
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
				title,
				isLiked
			},
			pageInfo {
				afterCursor
			}
		}
	}
`;