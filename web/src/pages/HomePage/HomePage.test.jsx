import { render, screen, waitFor } from '@redwoodjs/testing/web'

import HomePage from './HomePage'
import { useAuth } from 'src/auth'
import { mocked } from "jest-mock";

  //   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

const user = {
  email: "tma29@njit.edu",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("@auth0/auth0-spa-js");

const mockedUseAuth0 = mocked(useAuth, true);

console.log(mockedUseAuth0.toString())

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

describe('Login works correctly', () => {

  beforeEach(() => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getAccessTokenWithPopup: jest.fn(),
      getAccessTokenSilently: jest.fn(),
      getIdTokenClaims: jest.fn(),
      loginWithPopup: jest.fn(),
      isLoading: false,
    });
  })

  it('Login successful', async () => {

    const { isAuthenticated } = mockedUseAuth0()
    render(<HomePage />)

    const login = screen.getByText("Log In")

    await login.click()

    expect(isAuthenticated).toBeTruthy()

  })
})
