import gql from 'graphql-tag'

export const ADD_GROUP_MUTATION = gql`
  mutation AddGroup($name: String!, $description: String) {
    addGroup(name: $name, description: $description)
  }
`

export const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroup($id: ID!, $name: String!, $description: String) {
    updateGroup(id: $id, name: $name, description: $description)
  }
`

export const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroup($id: ID!) {
    deleteGroup(id: $id)
  }
`

export const ADD_GROUP_MEMBER_MUTATION = gql`
  mutation AddGroupMember($id: ID!, $contactId: ID!) {
    addGroupMember(id: $id, contactId: $contactId)
  }
`

export const DELETE_GROUP_MEMBER_MUTATION = gql`
  mutation DeleteGroupMember($id: ID!, $contactId: ID!) {
    deleteGroupMember(id: $id, contactId: $contactId)
  }
`
