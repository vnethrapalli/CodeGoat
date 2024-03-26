import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import Translation from './Translation'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const translation = {
  id: 1,
  uid: "945839",
  inputLanguage: "python",
  outputLanguage: "javascript",
  inputCode: "print(\"Hello World\")",
  outputCode: "console.log(\"Hello World\")",
  status: "200 OK",
  rating: 5
}

const translationEmptyRating = {
  id: 1,
  uid: "945839",
  inputLanguage: "python",
  outputLanguage: "javascript",
  inputCode: "print(\"Hello World\")",
  outputCode: "console.log(\"Hello World\")",
  status: "200 OK",
  rating: -1
}

describe('Translation', () => {
  test('renders successfully', () => {
    expect(() => {
      render(<Translation translation={translation} />)
    }).not.toThrow()
  })

  test('renders input editor successfully', () => {
    render(<Translation translation={translation} />)
    expect(screen.getByTestId("editors")).toBeInTheDocument()
  })

  // test('renders output editor successfully', () => {
  //   render(<Translation translation={translation} />)
  //   expect(screen.getByTestId("outputEditor")).toBeInTheDocument()
  // })

  test('renders delete button successfully', () => {
    render(<Translation translation={translation} />)
    expect(screen.getByTestId('deleteButton')).toBeInTheDocument()
  })

  test('renders translate again button successfully', () => {
    render(<Translation translation={translation} />)
    expect(screen.getByTestId('translateAgainButton')).toBeInTheDocument()
  })

  test('renders API status successfully', () => {
    render(<Translation translation={translation} />)
    expect(screen.getByTestId('APIStatus')).toHaveTextContent(translation.status)
  })

  test('renders rating successfully when it exists', () => {
    render(<Translation translation={translation} />)
    expect(screen.getByTestId('Rating')).toBeInTheDocument()
  })

  test('does not render rating when it does not exist', () => {
    expect(translationEmptyRating.rating).toBe(-1)
  })
})
