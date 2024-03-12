import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const HistoryPage = () => {
  return (
    <>
      <Metadata title="History" description="History page" />

      <h1>HistoryPage</h1>
      <p>
        Find me in <code>./web/src/pages/HistoryPage/HistoryPage.jsx</code>
      </p>
      <p>
        My default route is named <code>history</code>, link to me with `
        <Link to={routes.history()}>History</Link>`
      </p>
    </>
  )
}

export default HistoryPage
