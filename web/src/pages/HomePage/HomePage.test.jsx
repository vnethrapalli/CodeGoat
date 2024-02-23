import { render, screen, waitFor } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })
})

describe('Login button renders', () => {
  it('renders successfully', () => {
    render(<HomePage />)

    const login = screen.getByText("Log In")

    expect(login).toBeVisible()
  })
})

describe('Logout button renders', () => {
  it('renders successfully', () => {
    render(<HomePage />)

    const logout = screen.getByText("Log Out")

    expect(logout).toBeVisible()
  })
})

describe('Sign Up button renders', () => {
  it('renders successfully', () => {
    render(<HomePage />)

    const signup = screen.getByText("sign up")

    expect(signup).toBeVisible()
  })
})
