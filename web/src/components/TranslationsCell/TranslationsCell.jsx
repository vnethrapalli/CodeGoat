import TranslationCell from 'src/components/TranslationCell'
import { Accordion, AccordionActions, AccordionSummary, AccordionDetails, Tooltip, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles'

import Pagination from 'src/components/Pagination'
import { navigate, useParams } from '@redwoodjs/router';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const languages = {
  "c": "C",
  "cpp": "C++",
  "csharp": "C#",
  "go": "Go",
  "java": "Java",
  "javascript": "JavaScript",
  "kotlin": "Kotlin",
  "php": "PHP",
  "python": "Python",
  "ruby": "Ruby",
  "rust": "Rust",
  "typescript": "TypeScript"
};

export const beforeQuery = ({ page, uid, inLang, outLang, startDate, endDate, sort, inSort, outSort}) => {
  page = page ? parseInt(page, 10) : 1

  startDate = isNaN(startDate) ? "1970-01-01T00:00:01Z" : startDate
  endDate = isNaN(endDate) ? new Date().getFullYear() + 1 + "-01-01T00:00:01Z" : endDate

  return { variables: { page, uid, inLang, outLang, startDate, endDate, sort, inSort, outSort } }
}

export const QUERY = gql`
  query translationHistoryPage($page: Int, $uid: String!, $inLang: [String!]!, $outLang: [String!]!, $startDate: DateTime, $endDate: DateTime, $sort: Int!, $inSort: Int!, $outSort: Int!) {
    translationHistoryPage(page: $page, uid: $uid, inLang: $inLang, outLang: $outLang, startDate: $startDate, endDate: $endDate, sort: $sort, inSort: $inSort, outSort: $outSort) {
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

export const Success = ({ translationHistoryPage, page, uid, inLang, outLang, startDate, endDate, sort, inSort, outSort }) => {
  const theme = useTheme();

  if(translationHistoryPage.translations.length == 0 && page > 1) {
    navigate(`/history?page=${page - 1}`)
  }

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
      {translationHistoryPage.count == 0 && <Typography data-testid="noTranslations" sx={{color: theme.palette.text.secondary, marginTop: '35px', fontWeight: 600, textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: '5px' }}>No translations found</Typography>}

      {translationHistoryPage.translations.map((translation) => {
        return (
          <Accordion
            data-testid="accordion"
            key={translation.id}
            sx={{ backgroundColor: theme.palette.text.success, width: '70%', marginBottom: '5px', marginTop: '5px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id={translation.id}
              sx={{ color: theme.palette.text.primary, minHeight: '64px', display: 'flex', margin: '0px', alignContent: 'center',
                '.MuiAccordion-root.Mui-expanded': {
                  margin: '0px'
                }
              }}
            >
              <Typography data-testid="languageInfo">
                {languages[translation.inputLanguage]} &#8594; {languages[translation.outputLanguage]}
              </Typography>
              <Tooltip title={new Date(translation.createdAt).toISOString()}>{prettyDate(translation)}</Tooltip>
            </AccordionSummary>

            <AccordionDetails>
              <TranslationCell id={translation.id} page={page} uid={uid} inLang={inLang} outLang={outLang} startDate={startDate} endDate={endDate} sort={sort} inSort={inSort} outSort={outSort} />
            </AccordionDetails>
          </Accordion>
        )
      })}

      <Pagination data-testid="pagination" count={translationHistoryPage.count} />
    </>
  )
}