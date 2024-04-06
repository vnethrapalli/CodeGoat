import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_FEEDBACK_MUTATION = gql`
  mutation DeleteFeedbackMutation($id: Int!) {
    deleteFeedback(id: $id) {
      id
    }
  }
`

const Feedback = ({ feedback }) => {
  const [deleteFeedback] = useMutation(DELETE_FEEDBACK_MUTATION, {
    onCompleted: () => {
      toast.success('Feedback deleted')
      navigate(routes.feedback())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete feedback ' + id + '?')) {
      deleteFeedback({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Feedback {feedback.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{feedback.id}</td>
            </tr>
            <tr>
              <th>Submission page</th>
              <td>{feedback.submissionPage}</td>
            </tr>
            <tr>
              <th>Output page</th>
              <td>{feedback.outputPage}</td>
            </tr>
            <tr>
              <th>Translation accuracy</th>
              <td>{feedback.translationAccuracy}</td>
            </tr>
            <tr>
              <th>Gpt availability</th>
              <td>{feedback.gptAvailability}</td>
            </tr>
            <tr>
              <th>Experience</th>
              <td>{feedback.experience}</td>
            </tr>
            <tr>
              <th>Comments</th>
              <td>{feedback.comments}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFeedback({ id: feedback.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(feedback.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Feedback
