import { render, screen, fireEvent } from '@redwoodjs/testing/web'
import mediaQuery from "css-mediaquery";

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

import UserLayout from './UserLayout'
import HomePage from 'src/pages/HomePage/HomePage';
import TranslatePage from 'src/pages/TranslatePage/TranslatePage';
import StatusPage from 'src/pages/StatusPage/StatusPage';
import FeedbackPage from 'src/pages/FeedbackPage/FeedbackPage';
import { LightMode, DarkMode } from '@mui/icons-material'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

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
    render(<UserLayout />)

    const button = screen.getByTestId("translateButton");

    fireEvent.click(button);
    expect(() => {
      render(<TranslatePage />)
    }).not.toThrow()
  })

  test('renders Status Button successfully', () => {
    render(<UserLayout />)

    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
  })

  test('routes to Status Page when Status Button clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("statusButton");

    fireEvent.click(button);
    expect(() => {
      render(<StatusPage />)
    }).not.toThrow()
  })

  test('renders Feedback Button successfully', () => {
    render(<UserLayout />)

    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
  })

  test('routes to Feedback Page when Feedback Button clicked successfully', () => {
    render(<UserLayout />)

    const button = screen.getByTestId("feedbackButton");

    fireEvent.click(button);
    expect(() => {
      render(<FeedbackPage />)
    }).not.toThrow()
  })

  test('renders Login Button successfully', () => {
    render(<UserLayout />)

    expect(screen.getByTestId("loginButton")).toBeInTheDocument()
  })

  test('renders Sign Up successfully', () => {
    render(<UserLayout />)

    expect(screen.getByTestId("signupButton")).toBeInTheDocument()
  })

});

describe("Media Test", () => {
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