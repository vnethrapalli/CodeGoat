import { render } from '@redwoodjs/testing/web'

import UserAccountPage from './UserAccountPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserAccountPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserAccountPage />)
    }).not.toThrow()
  })
})
