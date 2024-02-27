import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import UserLayout from './UserLayout'
import { LightMode, DarkMode, Translate } from '@mui/icons-material'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserLayout />)
    }).not.toThrow()
  })

  it('renders Theme Button successfully', () => {
    expect(screen.getByTestId("themeButton")).toBeInTheDocument()
  })

  it('changes the Theme Button successfully', () => {
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

  it('renders Title Link successfully', () => {
    expect(screen.getByTestId("titleLink")).toBeInTheDocument()
  })

  it('routes to Home when Title Link clicked successfully', () => {
    const button = screen.getByTestId("titleLink");

    fireEvent.click(button);
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  it('renders all Nav Buttons successfully', () => {
    expect(screen.getByTestId("navButtons")).toBeInTheDocument()
  })

  it('renders Translate Button successfully', () => {
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
  })

  it('routes to Translate Page when Translate Button clicked successfully', () => {
    const button = screen.getByTestId("translateButton");

    fireEvent.click(button);
    expect(() => {
      render(<TranslatePage />)
    }).not.toThrow()
  })

  it('renders Status Button successfully', () => {
    expect(screen.getByTestId("statusButton")).toBeInTheDocument()
  })

  it('routes to Status Page when Status Button clicked successfully', () => {
    const button = screen.getByTestId("statusButton");

    fireEvent.click(button);
    expect(() => {
      render(<StatusPage />)
    }).not.toThrow()
  })

  it('renders Feedback Button successfully', () => {
    expect(screen.getByTestId("feedbackButton")).toBeInTheDocument()
  })

  it('routes to Feedback Page when Feedback Button clicked successfully', () => {
    const button = screen.getByTestId("feedbackButton");

    fireEvent.click(button);
    expect(() => {
      render(<FeedbackPage />)
    }).not.toThrow()
  })

})
