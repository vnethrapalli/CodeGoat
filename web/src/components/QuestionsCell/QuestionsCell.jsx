import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles'

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

// puts data to standard lowercase and compares to data passed
const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d) => d.toString().toLowerCase().includes(query));
  }
};

export const Success = ({ questions, searchQuery }) => {
  const theme = useTheme()
  const [expanded, setExpanded] = React.useState('panel1');
  //const dataFiltered = filterData(searchQuery, questions);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      {questions.map((question) => (
        <question key={question.id}>
          {(question.question.toLowerCase().includes(searchQuery) || question.answer.toLowerCase().includes(searchQuery))&&
          <Accordion sx={{bgcolor: theme.palette.secondary.main}} expanded={expanded === 'panel'+question.id} onChange={handleChange('panel'+question.id)}>
            <AccordionSummary sx={{bgcolor: theme.palette.primary}} aria-controls="panel1d-content" id="panel1d-header">
              <Typography>{question.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{bgcolor: theme.palette.primary}}>
              <Typography>{question.answer}</Typography>
            </AccordionDetails>
          </Accordion> 
          }
        </question>
      ))}
    </>
  )
}
