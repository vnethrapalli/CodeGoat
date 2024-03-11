import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import FaqForm from 'src/components/FAQ/FAQForm'

const CREATE_FAQ_MUTATION = gql`
  mutation CreateFaqMutation($input: CreateFaqInput!) {
    createFaq(input: $input) {
      id
    }
  }
`

const NewFaq = () => {
  const [createFaq, { loading, error }] = useMutation(CREATE_FAQ_MUTATION, {
    onCompleted: () => {
      toast.success('Faq created')
      navigate(routes.faqs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createFaq({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Faq</h2>
      </header>
      <div className="rw-segment-main">
        <FaqForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFaq
