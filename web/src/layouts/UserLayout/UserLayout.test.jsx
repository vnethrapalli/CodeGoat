import { render } from '@redwoodjs/testing/web'

import UserLayout from './UserLayout'
import IconButton from '@mui/material/IconButton';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserLayout />)
    }).not.toThrow()
  })

  it('renders IconButton successfully', () => {
    expect(() => {
      render(<IconButton />)
    }).not.toThrow()
  })
})
