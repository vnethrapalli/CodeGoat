import { render, screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './CounterCell'
import { standard } from './CounterCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('CounterCell', () => {
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
      render(<Success counter={standard().counter} />)
    }).not.toThrow()
  })
})

describe('Counter functionality and image loading', () => {
  it('correctly pulls the number of translations and displays the image', () => {
    render(<Success counter={standard().counter} />);

    expect(screen.getByTestId("counter-box")).toHaveStyle(`background: url('Images/speechbubble.svg')`);
    expect(screen.getByTestId("counter")).toHaveTextContent(`${standard().counter.count} translations and counting!`);
    expect(screen.getByTestId("goat-image")).toBeInTheDocument();
  })
});
