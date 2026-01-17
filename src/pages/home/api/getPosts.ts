import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($input: FindPostsRequest!) {
    posts(input: $input) {
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
