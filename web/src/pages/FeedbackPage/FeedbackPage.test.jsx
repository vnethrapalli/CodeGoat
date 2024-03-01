import { render } from '@redwoodjs/testing/web'

import FeedbackPage from './FeedbackPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FeedbackPage', () => {
  // test for simple rendering
  it('renders successfully', () => {
    expect(() => {
      render(<FeedbackPage />)
    }).not.toThrow()
  })

  // test for successful result upload
  it('submits data correctly', async () => {
    mockGraphQLQuery('Feedback', () => {
      return {
        feedback: {
          id: 90000,
          submissionPage: 20,
          outputPage: 32,
          translationAccuracy: 1,
          gptAvailability: 23,
          experience: 2,
          comments: 'spaghetti',
        }
      }
    })
  })
})
