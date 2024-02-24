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

  input UpdateFeedbackInput {
    submissionPage: Int
    outputPage: Int
    translationAccuracy: Int
    gptAvailability: Int
    experience: Int
    comments: String
  }

  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback! @requireAuth
    updateFeedback(id: Int!, input: UpdateFeedbackInput!): Feedback!
      @requireAuth
    deleteFeedback(id: Int!): Feedback! @requireAuth
  }
`
