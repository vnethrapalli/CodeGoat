import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const TranslatePage = () => {
  return (
    <>
      <Metadata title="Translate" description="Translate page" />

      <h1>TranslatePage</h1>
      <p>
        Find me in <code>./web/src/pages/TranslatePage/TranslatePage.jsx</code>
      </p>
      <p>
        My default route is named <code>translate</code>, link to me with `
        <Link to={routes.translate()}>Translate</Link>`
      </p>
    </>
  )
}

export default TranslatePage
