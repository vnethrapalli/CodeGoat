export const schema = gql`
  type Feedback {
    id: Int!
    submissionPage: Int!
    outputPage: Int!
    translationAccuracy: Int!
    gptAvailability: Int!
    experience: Int!
    comments: String!
  }

  type Query {
    feedbacks: [Feedback!]! @requireAuth
    feedback(id: Int!): Feedback @requireAuth
  }

  input CreateFeedbackInput {
    submissionPage: Int!
    outputPage: Int!
    translationAccuracy: Int!
    gptAvailability: Int!
    experience: Int!
    comments: String!
  }

  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback! @skipAuth
  }
`
