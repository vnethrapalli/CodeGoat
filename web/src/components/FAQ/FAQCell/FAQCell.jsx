import Faq from 'src/components/FAQ/FAQ'

export const QUERY = gql`
  query FindFaqById($id: Int!) {
    faq: faq(id: $id) {
      id
      question
      answer
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Faq not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ faq }) => {
  return <Faq faq={faq} />
}
