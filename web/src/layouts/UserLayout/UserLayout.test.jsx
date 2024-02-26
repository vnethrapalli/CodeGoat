import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import UserLayout from './UserLayout'
import { DarkMode } from '@mui/icons-material'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserLayout />)
    }).not.toThrow()
  })

  it('renders IconButton successfully', () => {
    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
  })

  it('changes the theme successfully', () => {
    const button = screen.getByTestId("themeButton");

    fireEvent.click(button);
    expect(() => {
      render(<DarkMode />)
    }).not.toThrow()

    fireEvent.click(button);
    expect(() => {
      render(<LightMode />)
    }).not.toThrow()

  })
})
