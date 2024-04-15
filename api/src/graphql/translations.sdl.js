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
    translationHistoryPage(page: Int, uid: String!, inLang: [String!], outLang: [String!], startDate: DateTime, endDate: DateTime, sort: Int, inSort: Int, outSort: Int): TranslationHistoryPage @requireAuth
    translationStats(uid: String!): Stats @requireAuth
    translation(id: Int!): Translation @requireAuth
    translationCount: TranslationCount @skipAuth
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
    deleteAllTranslations(uid: String!): DeleteCount! @requireAuth
  }

  type TranslationHistoryPage {
    translations: [Translation!]!
    count: Int!
  }

  type Stats {
    count: Int!
    favPair: [String]
    favPairFreq: Int
  }

  type DeleteCount {
    count: Int!
  }

  type TranslationCount {
    count: Int!
  }
`
