export const schema = gql`
  type Translation {
    translation: String!
    inputLang: String!
    outputLang: String!
  }

  type Query {
    getTranslation(code: String!, inLang: String!, outLang: String!): Translation! @requireAuth
  }
`