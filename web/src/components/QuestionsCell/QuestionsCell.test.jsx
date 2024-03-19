import { render, screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './QuestionsCell'
import { standard } from './QuestionsCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('QuestionsCell', () => {
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
      render(<Success questions={standard().questions} />)
    }).not.toThrow()
  })
})

describe('Search Tests', () => {
  it('displays the data with no search input', () => {
    render(<Success questions={standard().questions} searchQuery={''}/>)

    const accords = screen.getAllByRole("button")
    expect(accords).toHaveLength(3)
  })

  it('displays the data with a search input', () => {
    render(<Success questions={standard().questions} searchQuery={'annoying'}/>)
    
    const accords = screen.getAllByRole("button")
    expect(accords).toHaveLength(1)
  })

  it('displays the data with no search results', () => {
    render(<Success questions={standard().questions} searchQuery={'i dont wwnamn code!!!'}/>)
    
    expect(() => {
      const accords = screen.getAllByRole("button")
    }).toThrow()
  })
})