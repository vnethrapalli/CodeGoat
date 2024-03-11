import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_FAQ_MUTATION = gql`
  mutation DeleteFaqMutation($id: Int!) {
    deleteFaq(id: $id) {
      id
    }
  }
`

const Faq = ({ faq }) => {
  const [deleteFaq] = useMutation(DELETE_FAQ_MUTATION, {
    onCompleted: () => {
      toast.success('Faq deleted')
      navigate(routes.faqs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete faq ' + id + '?')) {
      deleteFaq({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Faq {faq.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{faq.id}</td>
            </tr>
            <tr>
              <th>Question</th>
              <td>{faq.question}</td>
            </tr>
            <tr>
              <th>Answer</th>
              <td>{faq.answer}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFaq({ id: faq.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(faq.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Faq
