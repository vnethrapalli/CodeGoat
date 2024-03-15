import TranslationCell from 'src/components/TranslationCell'
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Box, Button, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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

  const prettyDate = (dateString) => {

    const translationDate = new Date(dateString);

    return (

      <Typography sx={{marginLeft: 'auto', marginRight: '0', opacity: '0.75'}}>

        {monthNames[translationDate.getMonth()]} {translationDate.getDate()}, {translationDate.getFullYear()}

      </Typography>
    )

  };

  return (
    <>
      {translations.map((translation) => {
        return (
          <Accordion sx={{ backgroundColor: theme.palette.background.default, width: '70%', marginBottom: '5px', marginTop: '5px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ minHeight: '64px', display: 'flex', margin: '0', alignContent: 'center',
                '&:not(:last-child)': {

                },
                '&::before': {

                },
                '.css-o4b71y-MuiAccordionSummary-content.Mui-expanded': {
                  my: '12px'
                }
              }}
            >
              <Typography>{translation.inputLanguage} &#8594; {translation.outputLanguage}</Typography>

              {prettyDate(translation.createdAt)}
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
