import { render, screen, fireEvent } from '@redwoodjs/testing/web'
import mediaQuery from "css-mediaquery";

jest.mock("src/auth.js");
import { useAuth } from 'src/auth'
import { navigate, routes } from "@redwoodjs/router";
import { mocked } from "jest-mock";

import UserLayout from './UserLayout'
import HomePage from 'src/pages/HomePage/HomePage';
import { LightMode, DarkMode } from '@mui/icons-material'
import { testClick } from './UserLayout';

jest.mock('@redwoodjs/router', () => ({
  ...jest.requireActual('@redwoodjs/router'),
  navigate: jest.fn(),
}));

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
  nickname: "johndoe",
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

const localStorageMock = (function () {
  let user = {};

  return {
    getItem(key) {
      return user[key];
    },

    setItem(key, value) {
      user[key] = value;
    },

    clear() {
      user = {};
    },

    removeItem(key) {
      delete user[key];
    },

    getAll() {
      return user;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

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

  const mockId = "user";
  const mockJson = { data: "json data" };
  setLocalStorage(mockId, mockJson);
});

describe('UserLayout', () => {
  test('renders successfully', () => {
    expect(() => {
      render(<UserLayout />)
    }).not.toThrow()
  })

  test('renders Theme Button successfully', () => {
    render(<UserLayout />)
    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
  })

  test('changes the Theme Button successfully', () => {
    render(<UserLayout />)

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

  test('renders Title Link successfully', () => {
    render(<UserLayout />)
    expect(screen.getByTestId("titleLink")).toBeInTheDocument()
  })

  test('routes to Home when Title Link clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("titleLink");

    fireEvent.click(button);
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  test('renders all Nav Buttons successfully', () => {
    render(<UserLayout />)
    expect(screen.getByTestId("navButtons")).toBeInTheDocument()
  })

  test('renders Translate Button successfully', () => {
    render(<UserLayout />)
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
  })

  test('routes to Translate Page when Translate Button clicked successfully', () => {
    const originalTestClick = testClick();

    render(<UserLayout />)

    const button = screen.getByTestId("translateButton");
    fireEvent.click(button);

    expect(originalTestClick).toEqual("hello");
  })

  test('renders Status Button successfully', () => {
    render(<UserLayout />)

    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
  })

  test('routes to Status Page when Status Button clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("statusButton");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(routes.status());
  })

  test('renders Feedback Button successfully', () => {
    render(<UserLayout />)

    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
  })

  test('routes to Feedback Page when Feedback Button clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("feedbackButton");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalled();
  })

  test('renders Documentation Button successfully', () => {
    render(<UserLayout />)

    expect(screen.getByTestId("documentationButton")).toBeInTheDocument()
  })

  test('routes to Documentation Page when Documentation Button clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("documentationButton");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(routes.documentation());
  })

  test('renders user menu when User Menu Button clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("openUserMenuButton");
    fireEvent.click(button);

    expect(screen.getByTestId("userNickname")).toBeVisible();
    expect(screen.getByTestId("userEmail")).toBeVisible();
    expect(screen.getByTestId("settingsButton")).toBeVisible();
    expect(screen.getByTestId("historyButton")).toBeVisible();
    expect(screen.getByTestId("signoutButton")).toBeVisible();

  })

  test('routes to Account Page when Account Button clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("settingsButton");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalled();
  })

  test('routes to History Page when History Button clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("historyButton");
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalled();
  })
});

describe("Media & Navbar Test - Logged Out", () => {

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
  test("Desktop Test", async () => {
    window.matchMedia = createMatchMedia(1500);

    render(<UserLayout />);

    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
    expect(screen.getByTestId("titleLink")).toBeInTheDocument()
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
    expect(screen.getByTestId("loginButton")).toBeInTheDocument()
    expect(screen.getByTestId("signupButton")).toBeInTheDocument()
  });

  test("Laptop Test", async () => {
    window.matchMedia = createMatchMedia(750);

    render(<UserLayout />);

    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
    expect(screen.getByTestId("titleLink")).toBeInTheDocument()
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
    expect(screen.getByTestId("loginButton")).toBeInTheDocument()
    expect(screen.getByTestId("signupButton")).toBeInTheDocument()
  });

  test("Mobile Test", async () => {
    window.matchMedia = createMatchMedia(200);

    render(<UserLayout />);

    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
    expect(screen.getByTestId("titleLink")).toBeInTheDocument()
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
    expect(screen.getByTestId("loginButton")).toBeInTheDocument()
    expect(screen.getByTestId("signupButton")).toBeInTheDocument()
  });
});

describe("Media & Navbar Test - Logged In", () => {

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
  test("Desktop Test", async () => {
    window.matchMedia = createMatchMedia(1500);

    render(<UserLayout />);

    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
    expect(screen.getByTestId("titleLink")).toBeInTheDocument()
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
    expect(screen.getByTestId("signoutButton")).toBeInTheDocument()
  });

  test("Laptop Test", async () => {
    window.matchMedia = createMatchMedia(750);

    render(<UserLayout />);

    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
    expect(screen.getByTestId("titleLink")).toBeInTheDocument()
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
    expect(screen.getByTestId("signoutButton")).toBeInTheDocument()

  });

  test("Mobile Test", async () => {
    window.matchMedia = createMatchMedia(200);

    render(<UserLayout />);

    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
    expect(screen.getByTestId("titleLink")).toBeInTheDocument()
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
    expect(screen.getByTestId("signoutButton")).toBeInTheDocument()
  });
});