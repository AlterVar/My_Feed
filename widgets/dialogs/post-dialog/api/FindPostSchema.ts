import { gql } from "@apollo/client";

export const GET_POST = gql`
  query getPost($input: PostIdRequest!) {
    post(input: $input) {
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
  }
`;
