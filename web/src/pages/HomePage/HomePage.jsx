import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web';
import { Tooltip, Button, Paper, Box, Typography, List, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { languages } from '../SubmissionPage/SubmissionPage.jsx';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useRef } from 'react';
import CounterCell from 'src/components/CounterCell';
import FeedbackSummaryCell from 'src/components/FeedbackSummaryCell';

const instructions = ['Click on the Translate button in the navigation bar above',
                      'Select the language of the source code and the language of the translated code using the two dropdowns',
                      'Paste source code in the text editor',
                      'Click the translate button',
                      'Make sure to give positive/negative feedback!']

const HomePage = () => {
  const theme = useTheme();
  const myRef = useRef(null)

  const executeScroll = () => myRef.current.scrollIntoView({behavior: 'smooth'})

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
        <Paper elevation={0} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '20px', width: '100%', height: '95vh', borderRadius: '0px', background: 'linear-gradient(90deg, #F1FADA, 30%, #1E3231)', backgroundColor: theme.palette.secondary.main }}>

          <Typography data-testid='title' variant='h1' component='span' align='right' style={{ width: '100%', color: theme.palette.text.primary, fontSize: '96px', fontStyle: 'normal', fontWeight: '600'}}>
            CodeGoat
          </Typography>

          <Typography data-testid='phrase' variant='h2' component='span' align='right' style={{ width: '100%', color: theme.palette.text.primary, fontSize: '45px', fontStyle: 'normal', fontWeight: '600'}}>
            Effortless Code Translation, Elevated Results.
          </Typography>


          <Tooltip title='Scroll Down For More Information'>
            <Button
              key="More Info"
              variant="text"
              data-testid="moreInfoButton"
              onClick={executeScroll}
              sx={{ display: 'flex', position: 'absolute', left: '50%', top: '90%', transform: 'translateX(-50%)', color: theme.palette.text.primary, fontSize: '16px' }}
            >
              More Info
              <KeyboardArrowDown />
            </Button>
          </Tooltip>

          <Tooltip title='Translate Code'>
            <Button
              key="Translate"
              variant="text"
              data-testid="translateNowButton"
              href={routes.translate()}
              align='right'
              sx={{ color: theme.palette.text.primary + "!important", fontSize: '24px', marginTop: '10px', textDecoration: 'underline', textUnderlineOffset: '5px',
                '&:hover': {
                  textDecoration: 'underline',
                  textUnderlineOffset: '5px',
              }}}
            >
              Translate Now
            </Button>
          </Tooltip>
        </Paper>

        <Box ref={myRef}></Box>

        <Typography data-testid='description' style={{ padding: '25px', marginTop: '25px', marginBottom: '0px', width: '90%', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          This tool uses an AI model to convert your code from one programming language to another. We provide support for a variety of languages such as:

          <List dense disablePadding sx={{ listStyleType: 'disc', pl: 4, marginTop: '5px', marginBottom: '0px'}}>
            {languages.map((language) => (
              <ListItem dense key={language.dropdownItem} disablePadding sx={{ display: 'list-item' }}>
                {language.dropdownItem}
              </ListItem>
            ))}
          </List>
        </Typography>

        <CounterCell />
        <FeedbackSummaryCell />

        <Typography data-testid='tutorial' style={{ padding: '25px', marginTop: '20px', marginBottom: '10px', width: '90%', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' component='span' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            Getting Started
          </Typography>

          <List dense disablePadding sx={{ listStyle: 'decimal', pl: 4, marginTop: '5px', marginBottom: '0px'}}>
            {instructions.map((instruction) => (
              <ListItem dense key={instruction} disablePadding sx={{ display: 'list-item' }}>
                {instruction}
              </ListItem>
            ))}
          </List>
        </Typography>
      </Box>
    </>
  )
}

export default HomePage