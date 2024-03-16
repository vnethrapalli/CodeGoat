import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles'

// This is for the regex highlighting stuff
import _ from "lodash";

export const QUERY = gql`
  query QuestionsQuery {
    questions: faqs {
      id
      question
      answer
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const Success = ({ questions, searchQuery }) => {
  const theme = useTheme()
  
  const [expanded, setExpanded] = React.useState('panel1');
  const Highlighted = ({text = '', highlight = ''}) => {
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${escapeRegex(highlight)})`, 'gi')
    const parts = text.split(regex)
    return (
      <span>
         {parts.filter(part => part).map((part, i) => (
             regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
         ))}
     </span>
    )
  }
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      {questions.map((question) => (
        <question key={question.id}>
          {(question.question.toLowerCase().includes(searchQuery.toLowerCase()) || question.answer.toLowerCase().includes(searchQuery))&&
          <Accordion sx={{bgcolor: theme.palette.secondary.main}} expanded={expanded === 'panel'+question.id} onChange={handleChange('panel'+question.id)}>
            <AccordionSummary sx={{bgcolor: theme.palette.primary, fontSize: '24px'}} aria-controls="panel1d-content" id="panel1d-header">
              <Highlighted text={question.question} highlight={searchQuery} />
            </AccordionSummary>
            <AccordionDetails sx={{bgcolor: theme.palette.primary, fontSize: '18px'}}>
              <Highlighted text={question.answer} highlight={searchQuery} />
            </AccordionDetails>
          </Accordion> 
          }
        </question>
      ))}
    </>
  )
}
