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
    status: String!
  }

  type Query {
    translationHistoryPage(page: Int, uid: String!): TranslationHistoryPage @requireAuth
    translations(uid: String!): TranslationsList @requireAuth
    translation(id: Int!): Translation @requireAuth
  }

  input CreateTranslationInput {
    uid: String!
    inputLanguage: String!
    outputLanguage: String!
    inputCode: String!
    outputCode: String!
    rating: Int!
    status: String!
  }

  input UpdateTranslationInput {
    uid: String
    inputLanguage: String
    outputLanguage: String
    inputCode: String
    outputCode: String
    rating: Int
    status: String
  }

  type Mutation {
    createTranslation(input: CreateTranslationInput!): Translation! @requireAuth
    updateTranslation(id: Int!, input: UpdateTranslationInput!): Translation! @requireAuth
    deleteTranslation(id: Int!): Translation! @requireAuth
  }

  type TranslationHistoryPage {
    translations: [Translation!]!
    count: Int!
  }

  type TranslationsList {
    translations: [Translation!]!
  }
`