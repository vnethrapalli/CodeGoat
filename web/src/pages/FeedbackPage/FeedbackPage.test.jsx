import { render, screen, fireEvent, waitFor } from '@redwoodjs/testing/web'
import { configure } from '@testing-library/react'
import user from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import FeedbackPage from './FeedbackPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FeedbackPage', () => {
  describe('Rendering', () => {
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
  })
  describe('Button Functionality', () => {
    it('accepts text input', async() => {
      render(<FeedbackPage />)
      const comments = screen.getByRole('textbox');
      await user.type(comments, "Bababooey");

      expect(comments).toHaveValue("Bababooey")
    })
    it('accepts radio button clicks', async() => {
      render(<FeedbackPage />)
      const radio = screen.getAllByRole('radio')[0];
      await user.click(radio);

      expect(radio).toBeChecked()
    })
    it('accepts submit button clicks', async() => {
      const onHandle = jest.fn()
      render(<FeedbackPage defaultOnHandle={onHandle} />)
      const submit = screen.getByRole('button')
      await user.click(submit)

      expect(onHandle).toHaveBeenCalled()
    })
  })

  describe("Submission Handling", () => {
    it('prevents submission of out of range values', async() => {
      const ratings = {
        "sub": 100,
        "out": -10,
        "acc": 1342340,
        "gpt": 1,
        "exp": -453,
      }
      const onSubmit = jest.fn()
      render(<FeedbackPage defaultOnSubmit={onSubmit} defaultRatings={ratings}/>)
      const submit = screen.getByRole('button')
      await user.click(submit)

      expect(onSubmit).not.toHaveBeenCalled()
    })
    it('prevents completely empty submissions', async() => {
      const onSubmit = jest.fn()
      render(<FeedbackPage defaultOnSubmit={onSubmit}/>)
      const submit = screen.getByRole('button')
      await user.click(submit)

      expect(onSubmit).not.toHaveBeenCalled()
    })
    // it('prevents double submissions in short span of time', async() => {

    // })
    it('handles other unexpected errors', async() => {
      const ratings = {
        "sub": "incorrect",
        "out": null,
        "acc": 6,
        "gpt": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "exp": 7,
      }
      const onSubmit = jest.fn()
      render(<FeedbackPage defaultOnSubmit={onSubmit} defaultRatings={ratings}/>)
      const submit = screen.getByRole('button')
      await user.click(submit)

      expect(onSubmit).not.toHaveBeenCalled()
    })
    it('successfully submits', async() => {
      const ratings = {
        "sub": 10,
        "out": 3,
        "acc": 1,
        "gpt": 1,
        "exp": 6,
      }
      const onSubmit = jest.fn()
      render(<FeedbackPage defaultOnSubmit={onSubmit} defaultRatings={ratings}/>)
      const submit = screen.getByRole('button')
      await user.click(submit)

      expect(onSubmit).toHaveBeenCalled()
    })

    // it('sends an error message upon other errors', async() => {
    //   const error = {
    //     request: {
    //       variables: {submissionPage: "error"}
    //     }
    //   };
    //   render(<FeedbackPage data={[error]}/>)

    //   const subButton = screen.getByRole('button')
    //   fireEvent.click(subButton)
    //   setTimeout(() => {
    //     expect(screen.findByText('An error occurred.')).toBeInTheDocument()
    //   }, 5000);
    // })
  })
})
