import { render, screen  } from '@redwoodjs/testing/web'

import Pagination from './Pagination'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Pagination', () => {
  test('renders successfully', () => {
    expect(() => {
      render(<Pagination />)
    }).not.toThrow()
  })

  test('renders page buttons successfully', async () => {
    render(<Pagination count={0} />)

    expect(screen.findByTestId('pageButton')).toEqual({})
  })

  test('renders page buttons successfully', async () => {
    render(<Pagination count={13} />)

    const listPages = screen.getAllByTestId('pageButton')
    expect(listPages).toHaveLength(2)
  })

  test('renders page buttons successfully', async () => {
    render(<Pagination count={53} />)

    const listPages = screen.getAllByTestId('pageButton')
    expect(listPages).toHaveLength(6)
  })
})
