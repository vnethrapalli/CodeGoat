import Translation from 'src/components/Translation'

export const QUERY = gql`
  query FindTranslationQuery($id: Int!) {
    translation: translation(id: $id) {
      id
      uid
      inputLanguage
      outputLanguage
      inputCode
      outputCode
      createdAt
      rating
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ translation }) => {
  return (<Translation translation={translation} />)
}