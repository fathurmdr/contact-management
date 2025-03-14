import gql from 'graphql-tag'

export const ADD_CONTACT_MUTATION = gql`
  mutation AddContact(
    $fullName: String!
    $phoneNumber: String!
    $nickName: String
    $email: String
    $addresses: [AddressInput]
  ) {
    addContact(
      fullName: $fullName
      phoneNumber: $phoneNumber
      nickName: $nickName
      email: $email
      addresses: $addresses
    )
  }
`

export const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContact(
    $id: ID!
    $fullName: String!
    $phoneNumber: String!
    $nickName: String
    $email: String
    $addresses: [AddressInput]
  ) {
    updateContact(
      id: $id
      fullName: $fullName
      phoneNumber: $phoneNumber
      nickName: $nickName
      email: $email
      addresses: $addresses
    )
  }
`

export const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`
