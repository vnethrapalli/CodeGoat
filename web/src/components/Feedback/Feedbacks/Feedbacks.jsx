import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Feedback/FeedbacksCell'
import { truncate } from 'src/lib/formatters'

const DELETE_FEEDBACK_MUTATION = gql`
  mutation DeleteFeedbackMutation($id: Int!) {
    deleteFeedback(id: $id) {
      id
    }
  }
`

const FeedbacksList = ({ feedbacks }) => {
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION, {
    onCompleted: () => {
      toast.success('Feedback deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete feedback ' + id + '?')) {
      deleteFeedback({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Submission page</th>
            <th>Output page</th>
            <th>Translation accuracy</th>
            <th>Gpt availability</th>
            <th>Experience</th>
            <th>Comments</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{truncate(feedback.id)}</td>
              <td>{truncate(feedback.submissionPage)}</td>
              <td>{truncate(feedback.outputPage)}</td>
              <td>{truncate(feedback.translationAccuracy)}</td>
              <td>{truncate(feedback.gptAvailability)}</td>
              <td>{truncate(feedback.experience)}</td>
              <td>{truncate(feedback.comments)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.feedback({ id: feedback.id })}
                    title={'Show feedback ' + feedback.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFeedback({ id: feedback.id })}
                    title={'Edit feedback ' + feedback.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete feedback ' + feedback.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(feedback.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FeedbacksList
