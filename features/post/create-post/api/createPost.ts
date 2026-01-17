import { gql } from "@apollo/client";

export const CREATE_POST = gql`
	mutation PostCreate($input: CreatePostRequest!) {
		postCreate(input: $input) {
			authorId
		}
	}
`;