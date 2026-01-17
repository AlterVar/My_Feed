import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpRequest!) {
    userSignUp(input: $input) {
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
