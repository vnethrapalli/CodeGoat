import TranslationCell from 'src/components/TranslationCell'
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Tooltip, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles'

import Pagination from 'src/components/Pagination'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const languages = {
  "cpp": "C++",
  "csharp": "C#",
  "java": "Java",
  "javascript": "JavaScript",
  "python": "Python",
  "typescript": "TypeScript",
}

export const beforeQuery = ({ page, uid, inLang, outLang, startDate, endDate}) => {
  page = page ? parseInt(page, 10) : 1

  return { variables: { page, uid, inLang, outLang, startDate, endDate } }
}

export const QUERY = gql`
  query TranslationHistoryQuery($page: Int, $uid: String!, $inLang: [String!], $outLang: [String!], , $startDate: DateTime!, $endDate: DateTime!) {
    translationHistoryPage(page: $page, uid: $uid, inLang: $inLang, outLang: $outLang, startDate: $startDate, endDate: $endDate) {
      translations {
        id
        uid
        inputLanguage
        outputLanguage
        createdAt
        status
      }
      count
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ translationHistoryPage }) => {
  const theme = useTheme();

  const prettyDate = (translation) => {
    const translationDate = new Date(translation.createdAt);
    let ampm = translationDate.getHours() >= 12 ? "PM" : "AM";

    return (
      <Typography data-testid="dateInfo" sx={{marginLeft: 'auto', marginRight: '10px', opacity: '0.75'}}>
        {monthNames[translationDate.getMonth()]} {translationDate.getDate()}, {translationDate.getFullYear()}, {String(translationDate.getHours()%12).padStart(2, '0')}:{String(translationDate.getMinutes()).padStart(2, '0')} {ampm}
      </Typography>
    )
  };

  return (
    <>
      {translationHistoryPage.translations.map((translation) => {
        return (
          <Accordion
            data-testid="accordion"
            key={translation.id}
            sx={{ backgroundColor: theme.palette.secondary.main, width: '70%', marginBottom: '5px', marginTop: '5px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id={translation.id}
              sx={{ color: theme.palette.text.primary, minHeight: '64px', display: 'flex', margin: '0', alignContent: 'center',
                // '&:not(:last-child)': {
                // },
                // '&::before': {
                // },
                '.css-o4b71y-MuiAccordionSummary-content.Mui-expanded': {
                  my: '12px'
                }
              }}
            >
              <Typography data-testid="languageInfo">
                {languages[translation.inputLanguage]} &#8594; {languages[translation.outputLanguage]}
              </Typography>
              {prettyDate(translation)}
            </AccordionSummary>

            <AccordionDetails>
              <TranslationCell id={translation.id}/>
            </AccordionDetails>
          </Accordion>
        )
      })}

      <Pagination data-testid="pagination" count={translationHistoryPage.count} />
    </>
  )
}