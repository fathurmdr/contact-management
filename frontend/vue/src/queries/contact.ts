import gql from 'graphql-tag'

export const GET_CONTACTS_QUERY = gql`
  query Contacts {
    contacts {
      id
      fullName
      nickName
      phoneNumber
      email
      addresses {
        id
        street
        city
        district
        subDistrict
        postalCode
      }
    }
  }
`

export const GET_CONTACT_QUERY = gql`
  query Contact($id: ID!) {
    contact(id: $id) {
      id
      fullName
      nickName
      phoneNumber
      email
      addresses {
        id
        street
        city
        district
        subDistrict
        postalCode
      }
    }
  }
`
