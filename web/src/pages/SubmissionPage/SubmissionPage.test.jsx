import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import SubmissionPage from './SubmissionPage'

jest.mock("src/auth.js");
import { useAuth } from 'src/auth'
import { mocked } from "jest-mock";
//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts


// INITIAL RENDER TESTS

describe('SubmissionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubmissionPage />)
    }).not.toThrow()
  })
})

test('renders Translate Button successfully', () => {
  render(<SubmissionPage />)
  expect(screen.getByTestId("translateButton")).toBeInTheDocument()
})

test('renders input copy Button successfully', () => {
  render(<SubmissionPage />)
  expect(screen.getByTestId("inputCopy")).toBeInTheDocument()
})


test('renders input Editor successfully', () => {
  render(<SubmissionPage />)
  expect(screen.getByTestId("inputEditor")).toBeInTheDocument()
})

// TESTS AFTER CLICKING THE TRANSLATE BUTTON
test('renders output Editor when Translate Button clicked successfully', () => {
  render(<SubmissionPage />)
  const button = screen.getByTestId("translateButton");
  fireEvent.click(button);
  expect(screen.getByTestId("outputEditor")).toBeInTheDocument()
})

test('renders output Copy Button when Translate Button clicked successfully', () => {
  render(<SubmissionPage />)
  const button = screen.getByTestId("translateButton");
  fireEvent.click(button);
  expect(screen.getByTestId("outputCopy")).toBeInTheDocument()
})

test('renders output Download Button when Translate Button clicked successfully', () => {
  render(<SubmissionPage />)
  const button = screen.getByTestId("translateButton");
  fireEvent.click(button);
  expect(screen.getByTestId("downloadButton")).toBeInTheDocument()
})
