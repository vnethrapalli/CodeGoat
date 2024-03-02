import { Link, routes } from '@redwoodjs/router'

import Feedbacks from 'src/components/Feedback/Feedbacks'

export const QUERY = gql`
  query FindFeedbacks {
    feedbacks {
      id
      submissionPage
      outputPage
      translationAccuracy
      gptAvailability
      experience
      comments
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No feedbacks yet. '}
      <Link to={routes.newFeedback()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ feedbacks }) => {
  return <Feedbacks feedbacks={feedbacks} />
}
