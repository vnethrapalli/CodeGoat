import React from 'react';
import { fireEvent, render, screen, waitFor } from '@redwoodjs/testing/web'
import UserAccountPage from './UserAccountPage';
import {MockedProvider} from '@apollo/client/testing'
jest.mock("src/auth.js");
import { useAuth, auth0 } from 'src/auth'
import { mocked } from "jest-mock";
import { GraphQLHooksProvider } from '@redwoodjs/web';

const createMatchMedia = (width) => (query) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => {},
  removeListener: () => {}
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
  nickname: 'johndoe'
};

const localStorageMock = (function() {
  let store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

beforeEach(() => {
  const mockedUseAuth = mocked(useAuth);
  mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      userMetadata: user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      getAccessTokenWithPopup: jest.fn(),
      getTokenSilently: 'abcdf',
      getIdTokenClaims: jest.fn(),
      loginWithPopup: jest.fn(),
      isLoading: false,
  });

  const mockedAuth0 = mocked(auth0);
  mockedAuth0.getUser = jest.fn().mockResolvedValue(user);
  localStorage.clear();
  localStorage.setItem('user', JSON.stringify(user));
});




describe('User Account Management', () => {
  it('renders the page with user info', async () => {

    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
      >
        <UserAccountPage />
      </GraphQLHooksProvider>
    )

    const email = (await screen.findByTestId('email')).children[1].children[0]
    const username = (await screen.findByTestId('username')).children[1].children[0]

    expect(email.value).toBe(user.email)
    expect(username.value).toBe(user.nickname)
  })

  it('username input validation', async () => {

    render(
      <GraphQLHooksProvider
        useMutation={jest.fn().mockReturnValue([jest.fn(), {}])}
      >
        <UserAccountPage />
      </GraphQLHooksProvider>
    )

    const username = (await screen.findByTestId('username')).children[1].children[0]
    const save = await screen.findByText('Save')

    expect(username.value).toBe(user.nickname)

    fireEvent.change(username, { target: { value: '' } })
    expect(await screen.findByText('Username must be at least 5 characters')).toBeInTheDocument()
    expect(save).toBeDisabled()

    fireEvent.change(username, { target: { value: '1234' } })
    expect(await screen.findByText('Username must be at least 5 characters')).toBeInTheDocument()
    expect(save).toBeDisabled()

    fireEvent.change(username, { target: { value: '123456789012345' } })
    expect(await screen.findByText('Username must be less than 12 characters')).toBeInTheDocument()
    expect(save).toBeDisabled()

    fireEvent.change(username, { target: { value: '123456789012' } })
    expect(await screen.findByText('Username must start with a letter and must contain only letters, numbers, and underscores')).toBeInTheDocument()
    expect(save).toBeDisabled()

    fireEvent.change(username, { target: { value: 'john_doe' } })
    expect(save).not.toBeDisabled()


  })

  it('renders toast on successfull username update', async () => {

    render(
      <GraphQLHooksProvider
        useMutation={(name) => {
          let requestName = name.loc.source.body
          if (requestName.includes("updateUsername")) {
            return [(variables) => {
              return {
                data: {updateUsername: JSON.stringify({ statusCode: 200, message: "Username updated successfully" })}
              }
            }, {}]
          } else {
            return [(variables) => {
              return {
                data: {deleteAccount: JSON.stringify({ statusCode: 200, message: "User successfully deleted" })}
              }

            }, {}]
          }

        }}
      >
        <UserAccountPage />
      </GraphQLHooksProvider>
    )

    const save = await screen.findByText('Save')
    save.click()

    expect(await screen.findByText('Username updated successfully')).toBeInTheDocument()
  })

  it('renders toast on unsuccessful username update', async () => {

    render(
      <GraphQLHooksProvider
        useMutation={(name) => {
          let requestName = name.loc.source.body
          if (requestName.includes("updateUsername")) {
            return [(variables) => {
              return {
                data: {updateUsername: JSON.stringify({ statusCode: 500, message: "Failed to update username" })}
              }
            }, {}]
          } else {
            return [(variables) => {
              return {
                data: {deleteAccount: JSON.stringify({ statusCode: 200, message: "User successfully deleted" })}
              }

            }, {}]
          }

        }}
      >
        <UserAccountPage />
      </GraphQLHooksProvider>
    )

    const save = await screen.findByText('Save')
    save.click()

    expect(await screen.findByText('Failed to update username')).toBeInTheDocument()
  })

  it('renders toast on successfull account delete', async () => {

    render(
      <GraphQLHooksProvider
        useMutation={(name) => {
          let requestName = name.loc.source.body
          if (requestName.includes("updateUsername")) {
            return [(variables) => {
              return {
                data: {updateUsername: JSON.stringify({ statusCode: 200, message: "Username updated successfully" })}
              }
            }, {}]
          } else {
            return [(variables) => {
              return {
                data: {deleteAccount: JSON.stringify({ statusCode: 204, message: "User successfully deleted" })}
              }

            }, {}]
          }

        }}
      >
        <UserAccountPage />
      </GraphQLHooksProvider>
    )

    const deleteAccount = await screen.findByText('Delete Account')
    deleteAccount.click()
    const confirm = await screen.findByText('Yes, Delete Account')
    confirm.click()

    await waitFor(() => expect(screen.getByText('User successfully deleted')).toBeInTheDocument())

  })

  it('renders toast on unsuccessful account delete', async () => {

    render(
      <GraphQLHooksProvider
        useMutation={(name) => {
          let requestName = name.loc.source.body
          if (requestName.includes("updateUsername")) {
            return [(variables) => {
              return {
                data: {updateUsername: JSON.stringify({ statusCode: 200, message: "Username updated successfully" })}
              }
            }, {}]
          } else {
            return [(variables) => {
              return {
                data: {deleteAccount: JSON.stringify({ statusCode: 500, message: "Failed to delete account" })}
              }

            }, {}]
          }

        }}
      >
        <UserAccountPage />
      </GraphQLHooksProvider>
    )

    const deleteAccount = await screen.findByText('Delete Account')
    deleteAccount.click()
    const confirm = await screen.findByText('Yes, Delete Account')
    confirm.click()
    await waitFor(() => expect(screen.getByText('Failed to delete account')).toBeInTheDocument())
  })
})
