import gql from 'graphql-tag'

export const GET_DIAL_CODES_QUERY = gql`
  query DialCodes {
    dialCodes {
      name
      dial_code
      code
    }
  }
`
