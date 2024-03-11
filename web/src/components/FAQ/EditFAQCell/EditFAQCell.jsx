import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FaqForm from 'src/components/FAQ/FAQForm'

export const QUERY = gql`
  query EditFaqById($id: Int!) {
    faq: faq(id: $id) {
      id
      question
      answer
    }
  }
`

const UPDATE_FAQ_MUTATION = gql`
  mutation UpdateFaqMutation($id: Int!, $input: UpdateFaqInput!) {
    updateFaq(id: $id, input: $input) {
      id
      question
      answer
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ faq }) => {
  const [updateFaq, { loading, error }] = useMutation(UPDATE_FAQ_MUTATION, {
    onCompleted: () => {
      toast.success('Faq updated')
      navigate(routes.faqs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateFaq({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Faq {faq?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <FaqForm faq={faq} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
