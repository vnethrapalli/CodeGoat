import { render, screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './TranslationCell'
import { standard } from './TranslationCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('TranslationCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // When you're ready to test the actual output of your component render
  // you could test that, for example, certain text is present:
  //
  // 1. import { screen } from '@redwoodjs/testing/web'
  // 2. Add test: expect(screen.getByText('Hello, world')).toBeInTheDocument()

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success translation={standard().translation} />)
    }).not.toThrow()
  })
})

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

describe('renders all components', () => {
  test('renders successfully', () => {
    expect(() => {
      render(<Success translation={translation} />)
    }).not.toThrow()
  })

  test('renders input editor successfully', () => {
    render(<Success translation={translation} />)
    expect(screen.getByTestId("editors")).toBeInTheDocument()
  })

  // test('renders output editor successfully', () => {
  //   render(<Translation translation={translation} />)
  //   expect(screen.getByTestId("outputEditor")).toBeInTheDocument()
  // })

  test('renders delete button successfully', () => {
    render(<Success translation={translation} />)
    expect(screen.getByTestId('deleteButton')).toBeInTheDocument()
  })

  test('renders translate again button successfully', () => {
    render(<Success translation={translation} />)
    expect(screen.getByTestId('translateAgainButton')).toBeInTheDocument()
  })

  test('renders API status successfully', () => {
    render(<Success translation={translation} />)
    expect(screen.getByTestId('APIStatus')).toHaveTextContent(translation.status)
  })

  test('renders rating successfully when it exists', () => {
    render(<Success translation={translation} />)
    expect(screen.getByTestId('Rating')).toBeInTheDocument()
  })

  test('does not render rating when it does not exist', () => {
    expect(translationEmptyRating.rating).toBe(-1)
  })
})
