import { gql } from "@apollo/client";

export const USER_EDIT_PROFILE = gql`
  mutation UserEditProfile($input: EditProfileRequest!) {
    userEditProfile(input: $input) {
      problem {
        ... on EmailAlreadyUsedProblem {
          message
        }
        ... on PhoneAlreadyUsedProblem {
          message
        }
      }
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
