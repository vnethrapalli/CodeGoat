export const schema = gql`
  type Translation {
    id: Int!
    uid: String!
    inputLanguage: String!
    outputLanguage: String!
    inputCode: String!
    outputCode: String!
    createdAt: DateTime!
    rating: Int!
  }

  type Query {
    translations: [Translation!]! @requireAuth
    translation(id: Int!): Translation @requireAuth
  }

  input CreateTranslationInput {
    uid: String!
    inputLanguage: String!
    outputLanguage: String!
    inputCode: String!
    outputCode: String!
    rating: Int!
  }

  input UpdateTranslationInput {
    uid: String
    inputLanguage: String
    outputLanguage: String
    inputCode: String
    outputCode: String
    rating: Int
  }

  type Mutation {
    createTranslation(input: CreateTranslationInput!): Translation! @requireAuth
    updateTranslation(id: Int!, input: UpdateTranslationInput!): Translation!
      @requireAuth
    deleteTranslation(id: Int!): Translation! @requireAuth
  }
`
