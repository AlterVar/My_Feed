import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($input: SignInRequest!) {
    userSignIn(input: $input) {
      problem {
        message
      }
      token
      user {
        avatarUrl
        birthDate
        country
        email
        firstName
        gender
        lastName
        middleName
        phone
				id
      }
    }
  }
`;
