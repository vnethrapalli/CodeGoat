import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const FeedbackPage = () => {
  return (
    <>
      <Metadata title="Feedback" description="Feedback page" />

      <h1>FeedbackPage</h1>
      <h1>{localStorage.getItem('token')}</h1>
      <p>
        Find me in <code>./web/src/pages/FeedbackPage/FeedbackPage.jsx</code>
      </p>
      <p>
        My default route is named <code>feedback</code>, link to me with `
        <Link to={routes.feedback()}>Feedback</Link>`
      </p>
    </>
  )
}

export default FeedbackPage
