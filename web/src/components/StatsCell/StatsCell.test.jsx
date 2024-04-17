import { render, screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './StatsCell'
import { standard } from './StatsCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('StatsCell', () => {
  beforeEach(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => {
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        unobserve: jest.fn()
      }
    })
  })

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
      render(<Success stats={standard().stats} />)
    }).not.toThrow()
  })
})

describe('render tests for stats section', () => {
  beforeEach(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => {
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        unobserve: jest.fn()
      }
    })
  })

  it('renders all text components when all data is provided', () => {
    let data = standard().stats;
    render(<Success stats={data} />);

    expect(screen.getByTestId("your-stats-header")).toHaveTextContent('Your Stats');

    expect(screen.getByTestId("translation-count-header")).toHaveTextContent('Number of Translations');
    expect(screen.getByTestId("user-num-translations")).toHaveTextContent(`${data.count} total translations`);

    expect(screen.getByTestId("mostfreq-pair-header")).toHaveTextContent('Most Frequent Language Pair');
    expect(screen.getByTestId("user-mostfreq-pair")).toHaveTextContent(`${data.count} total translations`);

  })
});
