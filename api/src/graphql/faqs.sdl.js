export const schema = gql`
  type Faq {
    id: Int!
    question: String!
    answer: String!
  }

  type Query {
    faqs: [Faq!]! @skipAuth
    faq(id: Int!): Faq @skipAuth
  }

  input CreateFaqInput {
    question: String!
    answer: String!
  }

  input UpdateFaqInput {
    question: String
    answer: String
  }

  type Mutation {
    createFaq(input: CreateFaqInput!): Faq! @skipAuth
    updateFaq(id: Int!, input: UpdateFaqInput!): Faq! @requireAuth
    deleteFaq(id: Int!): Faq! @requireAuth
  }
`
