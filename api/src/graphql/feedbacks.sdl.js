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
    feedbackStats: Stats @skipAuth
  }

  input CreateFeedbackInput {
    submissionPage: Int!
    outputPage: Int!
    translationAccuracy: Int!
    gptAvailability: Int!
    experience: Int!
    comments: String!
  }

  type Stats {
    count: Int!
    submissionPageAvg: Float!
    outputPageAvg: Float!
    translationAccuracyAvg: Float!
    gptAvailabilityAvg: Float!
    experienceAvg: Float!
  }

  type Mutation {
    createFeedback(input: CreateFeedbackInput!): Feedback! @requireAuth
  }
`
