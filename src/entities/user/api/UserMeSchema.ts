import { gql } from "@apollo/client";

export const USER_ME = gql`
  query userMe {
    userMe {
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
`;