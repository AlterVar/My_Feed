import { gql } from "@apollo/client";

export const POST_LIKE = gql`
  mutation postLike($input: PostIdRequest!) {
    postLike(input: $input) {
      isLiked,
			id
    }
  }
`;

export const POST_UNLIKE = gql`
	mutation postUnlike($input: PostIdRequest!) {
		postUnlike(input: $input) {
			isLiked,
			id
		}
	}
`