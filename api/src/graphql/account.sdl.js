export const schema = gql`
  type Mutation {
    updateUsername(user_id: String!, nickname: String!): String! @requireAuth
    deleteAccount(user_id: String!): String! @requireAuth
  }
`
