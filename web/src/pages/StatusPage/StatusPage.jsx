import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const StatusPage = () => {
  return (
    <>
      <Metadata title="Status" description="Status page" />

      <h1>StatusPage</h1>
      <p>
        Find me in <code>./web/src/pages/StatusPage/StatusPage.jsx</code>
      </p>
      <p>
        My default route is named <code>status</code>, link to me with `
        <Link to={routes.status()}>Status</Link>`
      </p>
    </>
  )
}

export default StatusPage
