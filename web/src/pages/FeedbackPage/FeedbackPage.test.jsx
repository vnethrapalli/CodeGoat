import { render, screen, fireEvent } from '@redwoodjs/testing/web'
import { configure } from '@testing-library/react'
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

  it('renders text successfully', () => {
    expect(() => {
      render(<FeedbackPage />)
      screen.getByRole('heading', {
        name: /feedback/i
      })
      screen.getByRole('heading', {
        name: /submission page/i
      })
      screen.getByRole('heading', {
        name: /output page/i
      })
      screen.getByRole('heading', {
        name: /translation accuracy/i
      })
      screen.getByRole('heading', {
        name: /gpt\-3 availability/i
      })
      screen.getByRole('heading', {
        name: /overall experience/i
      })
      screen.getByRole('heading', {
        name: /additional comments/i
      })
    }).not.toThrow()
  })

  it('renders textbox successfully', () => {
    expect(() => {
      render(<FeedbackPage />)
      screen.getByRole('textbox')
    }).not.toThrow()
  })

  it('renders submission button successfully', () => {
    expect(() => {
      render(<FeedbackPage />)
      screen.getByRole('button', {
        name: /submit/i
      })
    }).not.toThrow()
  })

  // not sure if this actually tests correctly
  // it('submits data correctly', async () => {
  //   mockGraphQLQuery('Feedback', () => {
  //     return {
  //       feedback: {
  //         id: 90000,
  //         submissionPage: 20,
  //         outputPage: 32,
  //         translationAccuracy: 1,
  //         gptAvailability: 23,
  //         experience: 2,
  //         comments: 'spaghetti',
  //       }
  //     }
  //   })
  // })
})
