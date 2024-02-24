import Feedback from 'src/components/Feedback/Feedback'

export const QUERY = gql`
  query FindFeedbackById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Feedback not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ feedback }) => {
  return <Feedback feedback={feedback} />
}
