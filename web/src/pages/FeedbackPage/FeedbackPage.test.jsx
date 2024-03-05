import { render, screen, fireEvent, container } from '@redwoodjs/testing/web'
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

  it ('renders rating circles successfully', () => {
    expect(() => {
      render(<FeedbackPage />)

      screen.getAllByRole('radio')
    }).not.toThrow()
  })
  
  it('sends a completion message upon successful submission', async() => {
    render(<FeedbackPage />)

    const subButton = screen.getByRole('button')
    fireEvent.click(subButton)
    setTimeout(() => {
      expect(screen.findByText('Submitted!')).toBeInTheDocument()
    }, 5000);
  })

  it('sends an error message upon bad submission', async() => {
    const error = {
      request: {
        variables: {submissionPage: "error"}
      }
    };
    render(<FeedbackPage data={[error]}/>)
    
    const subButton = screen.getByRole('button')
    fireEvent.click(subButton)
    setTimeout(() => {
      expect(screen.findByText('An error occurred.')).toBeInTheDocument()
    }, 5000);
  })

})
