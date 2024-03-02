import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FeedbackForm from 'src/components/Feedback/FeedbackForm'

export const QUERY = gql`
  query EditFeedbackById($id: Int!) {
    feedback: feedback(id: $id) {
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

const UPDATE_FEEDBACK_MUTATION = gql`
  mutation UpdateFeedbackMutation($id: Int!, $input: UpdateFeedbackInput!) {
    updateFeedback(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ feedback }) => {
  const [updateFeedback, { loading, error }] = useMutation(
    UPDATE_FEEDBACK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Feedback updated')
        navigate(routes.feedbacks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateFeedback({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Feedback {feedback?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FeedbackForm
          feedback={feedback}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
