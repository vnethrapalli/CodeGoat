export const schema = gql`
  type Mutation {
    updateUsername(user_id: String!, nickname: String!, token: String!): String! @requireAuth
    deleteAccount(user_id: String!, token: String!): String! @requireAuth
  }
`
