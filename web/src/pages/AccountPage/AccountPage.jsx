import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const AccountPage = () => {
  return (
    <>
      <Metadata title="Account" description="Account page" />

      <h1>AccountPage</h1>
      <p>
        Find me in <code>./web/src/pages/AccountPage/AccountPage.jsx</code>
      </p>
      <p>
        My default route is named <code>account</code>, link to me with `
        <Link to={routes.account()}>Account</Link>`
      </p>
    </>
  )
}

export default AccountPage
