import { render } from '@redwoodjs/testing/web'

import HistoryPage from './HistoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HistoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HistoryPage />)
    }).not.toThrow()
  })
})
