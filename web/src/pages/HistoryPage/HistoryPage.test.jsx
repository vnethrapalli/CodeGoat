import { render, waitFor, screen } from '@redwoodjs/testing/web'
import HistoryPage from './HistoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('HistoryPage', () => {

  test('renders successfully', async () => {
    mockCurrentUser({sub: "auth0|12345678901234"});

    await waitFor(() => {
      expect(() => {
        render(<HistoryPage />)
      }).not.toThrow()
    })
  })

  test('renders Title successfully', async () => {
    mockCurrentUser({sub: "auth0|12345678901234"});
    render(<HistoryPage />)

    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument()
    })
  })

  test('renders Filter successfully', async () => {
    mockCurrentUser({sub: "auth0|12345678901234"});
    render(<HistoryPage />)

    await waitFor(() => {
      expect(screen.getByTestId("filter")).toBeInTheDocument()
      expect(screen.getByTestId("inputLanguage")).toBeInTheDocument()
      expect(screen.getByTestId("outputLanguage")).toBeInTheDocument()
      expect(screen.getByTestId("start")).toBeInTheDocument()
      expect(screen.getByTestId("end")).toBeInTheDocument()
      expect(screen.getByTestId("sort")).toBeInTheDocument()
      expect(screen.getByTestId("inputSort")).toBeInTheDocument()
      expect(screen.getByTestId("outputSort")).toBeInTheDocument()
      expect(screen.getByTestId("dateSort")).toBeInTheDocument()
      expect(screen.getByTestId("resetButton")).toBeInTheDocument()
      expect(screen.getByTestId("deleteAllButton")).toBeInTheDocument()
    })
  })
})