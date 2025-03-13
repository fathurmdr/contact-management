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
  query Contact($contactId: ID!) {
    contact(id: $contactId) {
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
