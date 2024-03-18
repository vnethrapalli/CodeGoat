export const schema = gql`
  type Account {
    user_id: String!
    nickname: String!
    token: String!
  }

  type Mutation {
    updateUser(user_id: String!, nickname: String!, token: String!): String! @requireAuth
  }
`
