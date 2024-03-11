import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/FAQ/FAQSCell'
import { truncate } from 'src/lib/formatters'

const DELETE_FAQ_MUTATION = gql`
  mutation DeleteFaqMutation($id: Int!) {
    deleteFaq(id: $id) {
      id
    }
  }
`

const FaqsList = ({ faqs }) => {
  const [deleteFaq] = useMutation(DELETE_FAQ_MUTATION, {
    onCompleted: () => {
      toast.success('Faq deleted')
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
    if (confirm('Are you sure you want to delete faq ' + id + '?')) {
      deleteFaq({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Question</th>
            <th>Answer</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td>{truncate(faq.id)}</td>
              <td>{truncate(faq.question)}</td>
              <td>{truncate(faq.answer)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.faq({ id: faq.id })}
                    title={'Show faq ' + faq.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFaq({ id: faq.id })}
                    title={'Edit faq ' + faq.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete faq ' + faq.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(faq.id)}
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

export default FaqsList
