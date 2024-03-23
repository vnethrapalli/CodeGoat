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
})