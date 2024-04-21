import { routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'

// These are for the search bar feature of the FAQ section
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { useTheme } from '@mui/material/styles'
import { Button, Grid, Box, Typography, Link, IconButton, List, ListItemIcon, ListItemText, ListItem } from '@mui/material';

import QuestionsCell from 'src/components/QuestionsCell'
import DownloadIcon from '@mui/icons-material/Download';
import { Divider } from '@mui/material';

export function testClick() {
  return "hello"
}

export const releaseData = {
  'version': 'v1.0',
  'date': '23 April 2024',
  'content': {
      'General: ':['First release!', 'Detailed instructions on usage can be found on the downloadable guides section of the documentation page.'],
      'New Features: ':['Feature 1', 'Feature 2', 'Feature 3'],
      'Planned Improvements: ':['Automatic bagel maker'],
    }
}

const DocumentationPage = () => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Metadata title="Documentation" description="Documentation Page" />

      <Typography variant='h2' component='h2' align='center' style={{color: theme.palette.text.secondary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>Documentation</Typography>
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 20
          }}
        >
      <Grid item display='flex' alignContent='center' alignItems='center' justifyContent='center' xs={6}>
      <Box data-testid="docButtons" display="flex" sx={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            key="Release Notes"
            variant="text"
            data-testid="notesButton"
            onClick={testClick}
            href={'#releasenotes'}
            sx={{ fontSize: '18px', marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
          >
            Release Notes
          </Button>
          <Button
            key="Technologies"
            variant="text"
            data-testid="techButton"
            href={'#technologies'}
            onClick={testClick}
            sx={{ fontSize: '18px', marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block'}}
          >
            Technologies
          </Button>
          <Button
            key="Feedback"
            variant="text"
            data-testid="feedbackButton"
            onClick={testClick}
            href={'#downloads'}
            sx={{ fontSize: '18px', marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
          >
            Downloadable Guides
          </Button>
          <Button
            key="FAQ"
            variant="text"
            data-testid="faqButton"
            onClick={testClick}
            href={'#faq'}
            sx={{ fontSize: '18px', marginTop: '2px', marginBottom: '2px', marginRight: '0px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
          >
            FAQ
          </Button>
      </Box>
    </Grid>

      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
        <Divider id='releasenotes' variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500', width: '90%'}}>Release Notes</Divider>
          <Box style={{ padding: '25px', paddingBottom: '0px', marginTop: '20px', marginBottom: '0px', width: '85%'}}>
            <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '30px', fontStyle: 'normal', fontWeight: '550'}}>
              CodeGoat v1.0
            </Typography>
            <Typography data-testid='description' component="span" sx={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
              23 April 2024
            </Typography>
            <div></div>
            <Typography data-testid='general' component="span"  style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
              <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                General:
              </Typography>
              <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.secondary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px'}}
                    primary="- Officially released!"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px'}}
                    primary="- Detailed instructions on usage can be found in the downloadable guides section below."
                  />
                </ListItem>
              </List>

              <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                New Features:
              </Typography>
              <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.secondary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                    primary="- Account creation and login have been implemented, allowing users to make their accounts and track their translation histories."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                    primary="- ChatGPT integration allows for code translation requests to be sent from our website. Users can select their desired language and will receive their code translated into that language."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                    primary="- Users can take advantage of copy text, upload file, and download file buttons from the translation page."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                    primary="- Translation reviews appear after each translation completes, allowing users to give rated feedback for that specific translation."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                    primary="- The feedback page allows users to rate their overall experiences on a scale of 1 - 10, with 1 being the worst and 10 being the best. An additional comments box is provided for any type of feedback desired."
                  />
                </ListItem>
              </List>

              <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                Planned Improvements:
              </Typography>
              <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.secondary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                    primary="- Additional user customization through profile pictures!"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                    primary="- Paid subscription plan for premium users!"
                  />
                </ListItem>
              </List>

            </Typography>
          </Box>
        <Divider id='technologies' variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500', width: '90%'}}>Technologies</Divider>

        <Box style={{ padding: '25px', paddingBottom: '0px', marginTop: '20px', marginBottom: '0px', width: '85%'}}>
          <Typography data-testid='description' component="span" sx={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            This tool was created using <Link data-testid='redwood link' href="https://redwoodjs.com/docs/introduction" sx={{textDecoration: 'underline' + '!important', textUnderlineOffset: '5px' + " !important" }}>Redwood</Link>, a full-stack web framework. As such, most of the technologies we employ are provided and are
            seamlessly integrated into our workflow and development of our tool. This includes:
          </Typography>

          <List style={{ width: "6%", padding: '0px', marginBottom: '0px', color: theme.palette.text.secondary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
            <ListItem
              component="a"
              href="https://reactjs.org"
            >
              <img src="Images/react.png" alt="React Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center', marginRight: '5px'}} />
              <ListItemText
                primaryTypographyProps={{fontSize: '24px'}}
                primary="React"
              />
            </ListItem>
            <ListItem
              component="a"
              href="https://www.prisma.io/"
            >
              <img src="Images/prismaHD.png" alt="Prisma Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center',  marginRight: '5px' }} />
              <ListItemText
                primaryTypographyProps={{fontSize: '24px'}}
                primary="Prisma"
              />
            </ListItem>
            <ListItem
              component="a"
              href="https://www.graphql.com/"
            >
              <img src="Images/graphql.png" alt="GrahphQL Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center', marginRight: '5px' }} />
              <ListItemText
                primaryTypographyProps={{fontSize: '24px'}}
                primary="GrahphQL"
              />
            </ListItem>
            <ListItem
              component="a"
              href="https://storybook.js.org/"
            >
              <img src="Images/storybook.png" alt="Storybook Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center', marginRight: '10px'}} />
              <ListItemText
                primaryTypographyProps={{fontSize: '24px'}}
                primary="Storybook"
              />
            </ListItem>
            <ListItem
              component="a"
              href="https://jestjs.io/"
            >
              <img src="Images/jest.png" alt="Jest Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center', marginRight: '5px' }} />
              <ListItemText
                primaryTypographyProps={{fontSize: '24px'}}
                primary="Jest"
              />
            </ListItem>
          </List>
        </Box>

        <Typography data-testid='whatgpt' component="span" style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
            What is GPT-3.5?
          </Typography>

          <Typography component="span" style={{ marginTop: '20px', marginBottom: '0px', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            <Link data-testid='gpt link' href="https://platform.openai.com/docs/introduction" sx={{textDecoration: 'underline' + '!important', textUnderlineOffset: '5px' + " !important" }}>GPT</Link> is a natural language processing model developed by OpenAI, which uses a deep learning
            architecture that has seen massive use in recent years. In our tool, we use GPT-3.5 Turbo, since GPT-4 costs more overall.
          </Typography>
        </Typography>

        <Typography data-testid='howgpt' component="span"  style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
            How do we use GPT-3?
          </Typography>

          <Typography component="span"  style={{ marginTop: '20px', marginBottom: '0px', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            On our end, we sanitize and quickly error check input from you, the user, on the frontend. That is, anything that you type in the initial code box is pre-processed
            before we create an API call. Once the API call is made, given that there are no errors or connection issues, your request for translation will be queued. Once the information is
            sent and translated, a new code box will return with the translation provided by GPT-3.
          </Typography>
        </Typography>

        <Divider id="downloads" variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500', width: '90%'}}>Downloadable Guides</Divider>

        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>CodeGoat Walkthrough</Typography>
          <Link data-testid='translate guide' href="Guides/CodeGoat.pdf" download="TranslateGuide" target='_blank'>
            <IconButton color="primary" aria-label="download translate guide">
              <DownloadIcon />
            </IconButton>
          </Link>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>Trackier's Guide to GPT</Typography>
          <Link data-testid='gpt guide' href="Guides/ChatGPT.pdf" download="GPTGuide" target='_blank'>
            <IconButton color="primary" aria-label="download gpt guide">
              <DownloadIcon />
            </IconButton>
          </Link>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>About Us</Typography>
          <Link data-testid='about us' href="Guides/AboutUs.pdf" download="About Us" target='_blank'>
            <IconButton color="primary" aria-label="download about us">
              <DownloadIcon />
            </IconButton>
          </Link>
        </Box>

        <br></br>
        <Divider id="faq" variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500', width: '90%'}}>FAQ</Divider>
      </Box>
      <br></br>
        <Form data-testid='search'>
          <TextField
            sx={{ input: { color: theme.palette.text.secondary }, '&:active fieldset': {borderColor: theme.palette.text.secondary} }}
            id="search-bar"
            className="text"
            style={{width:'97%'}}
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            label="What are you looking for?"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
          <IconButton data-testid='search icon' type="submit" aria-label="search">
            <SearchIcon style={{ fill: theme.palette.text.secondary, size:"xl" }} />
          </IconButton>
        </Form>
        <br></br>
        <QuestionsCell searchQuery={searchQuery}/>

      </div>



    </>
  )
}

export default DocumentationPage
