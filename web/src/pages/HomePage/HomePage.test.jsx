import { render, screen, waitFor } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

jest.mock("src/auth.js");
import { useAuth } from 'src/auth'
import { mocked } from "jest-mock";


  //   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

describe('HomePage', () => {

  beforeEach(() => {
    const mockedUseAuth = mocked(useAuth);
    mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        userMetadata: user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        getAccessTokenWithPopup: jest.fn(),
        getAccessTokenSilently: jest.fn(),
        getIdTokenClaims: jest.fn(),
        loginWithPopup: jest.fn(),
        isLoading: false,
    });
  });

  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })
})

describe('Login button renders', () => {

  beforeEach(() => {
    const mockedUseAuth = mocked(useAuth);
    mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        userMetadata: user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        getAccessTokenWithPopup: jest.fn(),
        getAccessTokenSilently: jest.fn(),
        getIdTokenClaims: jest.fn(),
        loginWithPopup: jest.fn(),
        isLoading: false,
    });
  });

  it('renders successfully', () => {
    render(<HomePage />)

    const login = screen.getByText("Log In")

    expect(login).toBeVisible()
  })
})

describe('Logout button renders', () => {

  beforeEach(() => {
    const mockedUseAuth = mocked(useAuth);
    mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        userMetadata: user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        getAccessTokenWithPopup: jest.fn(),
        getAccessTokenSilently: jest.fn(),
        getIdTokenClaims: jest.fn(),
        loginWithPopup: jest.fn(),
        isLoading: false,
    });
  });


  it('renders successfully', () => {
    render(<HomePage />)

    const logout = screen.getByText("Log Out")

    expect(logout).toBeVisible()
  })
})

describe('Sign Up button renders', () => {

  beforeEach(() => {
    const mockedUseAuth = mocked(useAuth);
    mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        userMetadata: user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        getAccessTokenWithPopup: jest.fn(),
        getAccessTokenSilently: jest.fn(),
        getIdTokenClaims: jest.fn(),
        loginWithPopup: jest.fn(),
        isLoading: false,
    });
  });


  it('renders successfully', () => {
    render(<HomePage />)

    const signup = screen.getByText("sign up")

    expect(signup).toBeVisible()
  })
})

describe('Login works correctly', () => {

  beforeEach(() => {
    const mockedUseAuth = mocked(useAuth);
    mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        userMetadata: user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        getAccessTokenWithPopup: jest.fn(),
        getAccessTokenSilently: jest.fn(),
        getIdTokenClaims: jest.fn(),
        loginWithPopup: jest.fn(),
        isLoading: false,
    });
  });

  it('Login successful', async () => {
    render(<HomePage />)

    const email = screen.getByText("Email: ", {exact: false})

    console.log(email.textContent)

    expect(email.textContent).toEqual('Email: johndoe@me.com')

  })
})

describe('Logout works correctly', () => {

  beforeEach(() => {
    const mockedUseAuth = mocked(useAuth);
    mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        userMetadata: user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
        getAccessTokenWithPopup: jest.fn(),
        getAccessTokenSilently: jest.fn(),
        getIdTokenClaims: jest.fn(),
        loginWithPopup: jest.fn(),
        isLoading: false,
    });
  });

  it('Logout successful', async () => {
    render(<HomePage />)

    const authenticated = screen.getByText('{"isAuthenticated":', {exact: false})

    expect(authenticated.textContent).toEqual('{"isAuthenticated":false}')

  })
})
