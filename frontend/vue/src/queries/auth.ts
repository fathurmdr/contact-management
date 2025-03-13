import gql from 'graphql-tag'

export const GET_ME_QUERY = gql`
  query Me {
    me {
      name
      email
      phoneNumber
      bio
    }
  }
`
