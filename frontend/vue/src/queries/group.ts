import gql from 'graphql-tag'

export const GET_GROUPS_QUERY = gql`
  query Groups {
    groups {
      id
      name
      description
      members {
        id
        fullName
        phoneNumber
      }
    }
  }
`

export const GET_GROUP_QUERY = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      name
      description
      members {
        id
        fullName
        phoneNumber
      }
    }
  }
`
