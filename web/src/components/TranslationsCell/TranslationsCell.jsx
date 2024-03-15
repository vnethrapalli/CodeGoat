import TranslationCell from 'src/components/TranslationCell'
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Box, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles'

export const QUERY = gql`
  query TranslationsQuery {
    translations {
      id
      uid
      inputLanguage
      outputLanguage
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ translations }) => {
  const theme = useTheme();

  return (
    <>
      {translations.map((translation) => {
      // return <li key={item.id}>{JSON.stringify(item)}</li>

        return (
          <Accordion sx={{ backgroundColor: theme.palette.background.default, width: '50%', marginBottom: '10px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {translation.inputLanguage} &#8594; {translation.outputLanguage}
              {translation.createdAt}
            </AccordionSummary>
            <AccordionDetails>
              <TranslationCell id={translation.id}/>
            </AccordionDetails>

          </Accordion>
        )
      })}
    </>
  )
}
