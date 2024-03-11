export const schema = gql`
  type Faq {
    id: Int!
    question: String!
    answer: String!
  }

  type Query {
    faqs: [Faq!]! @requireAuth
    faq(id: Int!): Faq @requireAuth
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
    createFaq(input: CreateFaqInput!): Faq! @requireAuth
    updateFaq(id: Int!, input: UpdateFaqInput!): Faq! @requireAuth
    deleteFaq(id: Int!): Faq! @requireAuth
  }
`
