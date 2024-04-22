export const schema = gql`
  type Mutation {
    generateCode(user_id: String!): String! @requireAuth
    verifyCode(user_id: String!, code: String!): String! @requireAuth
    addUser(user_id: String!, email: String!): String! @requireAuth
    verificationInProgress(user_id: String!): Boolean! @requireAuth
    userExists(user_id: String!): Boolean! @requireAuth
  }
`
