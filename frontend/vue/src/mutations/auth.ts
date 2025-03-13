import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation login($emailOrPhoneNumber: String!, $password: String!) {
    login(emailOrPhoneNumber: $emailOrPhoneNumber, password: $password) {
      sessionId
      expiresAt
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $phoneNumber: String!
    $bio: String
    $password: String!
  ) {
    register(name: $name, email: $email, phoneNumber: $phoneNumber, bio: $bio, password: $password)
  }
`
