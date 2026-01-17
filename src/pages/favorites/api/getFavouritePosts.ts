import { gql } from "@apollo/client";

export const GET_FAVOURITE_POSTS = gql`
	query GetFavouritePosts($input: FindFavouritePostsRequest!) {
		favouritePosts(input: $input) {
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