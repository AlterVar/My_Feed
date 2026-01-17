import { gql } from "@apollo/client";

export const DELETE_POST = gql`
	mutation deletePost($input: PostIdRequest!) {
		postDelete(input: $input) {
			ok
		}
	}
`;