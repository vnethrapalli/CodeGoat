import { Link, routes } from '@redwoodjs/router'

import Faqs from 'src/components/FAQ/FAQS'

export const QUERY = gql`
  query FindFaqs {
    faqs {
      id
      question
      answer
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No faqs yet. '}
      <Link to={routes.newFaq()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ faqs }) => {
  return <Faqs faqs={faqs} />
}
