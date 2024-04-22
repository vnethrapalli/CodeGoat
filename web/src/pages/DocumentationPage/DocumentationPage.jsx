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
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useRef } from 'react';

import { useMediaQuery } from 'react-responsive'

const DocumentationPage = (defaultScroll) => {
  const theme = useTheme()
  const myRefRel = useRef(null)
  const executeScrollRel = () => myRefRel.current.scrollIntoView({behavior: 'smooth'})
  const myRefTec = useRef(null)
  const executeScrollTec = () => myRefTec.current.scrollIntoView({behavior: 'smooth'})
  const myRefDow = useRef(null)
  const executeScrollDow = () => myRefDow.current.scrollIntoView({behavior: 'smooth'})
  const myRefFAQ = useRef(null)
  const executeScrollFAQ = () => myRefFAQ.current.scrollIntoView({behavior: 'smooth'})

  const [searchQuery, setSearchQuery] = useState("");

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1000px)'})

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
            onClick={executeScrollRel}
            sx={{ fontSize: '16px', marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
          >
            Release Notes
          </Button>
          <Button
            key="Technologies"
            variant="text"
            data-testid="techButton"
            onClick={executeScrollTec}
            sx={{ fontSize: '16px', marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block'}}
          >
            Technologies
          </Button>
          <Button
            key="Download"
            variant="text"
            data-testid="downButton"
            onClick={executeScrollDow}
            sx={{ fontSize: '16px', marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
          >
            Downloadable Guides
          </Button>
          <Button
            key="FAQ"
            variant="text"
            data-testid="faqButton"
            onClick={executeScrollFAQ}
            sx={{ fontSize: '16px', marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
          >
            FAQs
          </Button>
      </Box>
    </Grid>
    <Box ref={myRefRel} style={{paddingBottom: '50px'}}></Box>
      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
        <Divider data-testid='releasenotes' variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500', width: '90%'}}>Release Notes</Divider>
          <Box style={{ padding: '25px', paddingBottom: '0px', marginTop: '20px', marginBottom: '0px', width: '90%'}}>
              <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '30px', fontStyle: 'normal', fontWeight: '450'}}>
                Current Release
              </Typography>
            <Accordion data-testid="new" sx={{bgcolor: theme.palette.text.success, width: '100%', border: '1px solid'}}>
              <AccordionSummary sx={{bgcolor: theme.palette.text.success, fontSize: '24px'}} aria-controls="panel1d-content" id="panel1d-header">
              <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '30px', fontStyle: 'normal', fontWeight: '550'}}>
                v1.0
              </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{bgcolor: theme.palette.text.success, fontSize: '18px'}}>
                <Typography data-testid='date' component="span" sx={{color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
                  23 April 2024
                </Typography>
                <div></div>
                <Typography data-testid='general' component="span"  style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
                  <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                    General:
                  </Typography>
                  <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.primary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Officially released!"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Detailed instructions on usage can be found in the downloadable guides section below."
                      />
                    </ListItem>
                  </List>

                  <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                    Available Features:
                  </Typography>
                  <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.primary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
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

                  <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                    Planned Improvements:
                  </Typography>
                  <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.primary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
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
              </AccordionDetails>
            </Accordion>
            <br></br>
            <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '30px', fontStyle: 'normal', fontWeight: '450'}}>
              Old Releases
            </Typography>
            <Accordion data-testid="old"sx={{bgcolor: theme.palette.text.success, width: '100%', border: '1px solid'}}>
              <AccordionSummary sx={{bgcolor: theme.palette.text.success, fontSize: '24px'}} aria-controls="panel1d-content" id="panel1d-header">
              <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '30px', fontStyle: 'normal', fontWeight: '550'}}>
                v0.8
              </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{bgcolor: theme.palette.text.success, fontSize: '18px'}}>
                <Typography data-testid='description' component="span" sx={{color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
                  9 April 2024
                </Typography>
                <div></div>
                <Typography data-testid='general' component="span"  style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
                  <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                    General:
                  </Typography>
                  <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.primary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Mainly focused on refinement and debugging."
                      />
                    </ListItem>
                  </List>

                  <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                    New Features:
                  </Typography>
                  <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.primary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Added comment removal prior to API calls."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Added user profile editing."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Added translation history sorting and filtering."
                      />
                    </ListItem>
                  </List>

                  <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                    Bug Fixes:
                  </Typography>
                  <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.primary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Added better validation and user feedback to the translation and feedback pages."
                      />
                    </ListItem>
                  </List>

                  <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '26px', fontStyle: 'normal', fontWeight: '550'}}>
                    Planned Improvements:
                  </Typography>
                  <List style={{ padding: '0px', marginBottom: '0px', color: theme.palette.text.primary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Deploy website."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primaryTypographyProps={{fontSize: '24px', fontWeight:'300'}}
                        primary="- Add 2FA."
                      />
                    </ListItem>
                  </List>

                </Typography>
              </AccordionDetails>
            </Accordion>

          </Box>
        <Box ref={myRefTec} style={{paddingBottom: '50px'}}></Box>

        <Divider data-testid='technologies' variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500', width: '90%'}}>Technologies</Divider>
        <Box style={{ padding: '25px', paddingBottom: '0px', marginTop: '20px', marginBottom: '0px', width: '85%'}} sx={ isDesktopOrLaptop ? { width: '85%' } : { width: '95%' }}>
          <Typography data-testid='description' component="span" sx={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            This tool was created using <Link data-testid='redwood link' href="https://redwoodjs.com/docs/introduction" sx={{textDecoration: 'underline' + '!important', textUnderlineOffset: '5px' + " !important" }}>Redwood</Link>, a full-stack web framework. As such, most of the technologies we employ are provided and are
            seamlessly integrated into our workflow and development of our tool. This includes:
          </Typography>

          <List style={{ width: "6%", padding: '0px', marginBottom: '0px', color: theme.palette.text.secondary, fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
            <ListItem
              data-testid="react"
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
              data-testid="prisma"
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
              data-testid="graphql"
              component="a"
              href="https://www.graphql.com/"
            >
              <img src="Images/graphql.png" alt="GraphQL Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center', marginRight: '5px' }} />
              <ListItemText
                primaryTypographyProps={{fontSize: '24px'}}
                primary="GrahphQL"
              />
            </ListItem>
            <ListItem
              data-testid="storybook"
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
              data-testid="jest"
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

        <Typography data-testid='whatgpt' component="span" style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}} sx={ isDesktopOrLaptop ? { width: '85%' } : { width: '95%' }}>
          <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            What is GPT-3.5?
          </Typography>

          <Typography component="span" style={{ marginTop: '20px', marginBottom: '0px', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            <Link data-testid='gpt link' href="https://platform.openai.com/docs/introduction" sx={{textDecoration: 'underline' + '!important', textUnderlineOffset: '5px' + " !important" }}>GPT</Link> is a natural language processing model developed by OpenAI, which uses a deep learning
            architecture that has seen massive use in recent years. In our tool, we use GPT-3.5 Turbo, since GPT-4 costs more overall.
          </Typography>
        </Typography>

        <Typography data-testid='howgpt' component="span"  style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}} sx={ isDesktopOrLaptop ? { width: '85%' } : { width: '95%' }}>
          <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            How do we use GPT-3?
          </Typography>

          <Typography component="span"  style={{ marginTop: '20px', marginBottom: '0px', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            On our end, we sanitize and quickly error check input from you, the user, on the frontend. That is, anything that you type in the initial code box is pre-processed
            before we create an API call. Once the API call is made, given that there are no errors or connection issues, your request for translation will be queued. Once the information is
            sent and translated, a new code box will return with the translation provided by GPT-3.5.
          </Typography>
        </Typography>
        <Box ref={myRefDow} style={{paddingBottom: '50px'}}></Box>
        <Divider data-testid="downloads" variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500', width: '90%'}}>Downloadable Guides</Divider>

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

        <Box ref={myRefFAQ} style={{paddingBottom: '50px'}}></Box>
        <Divider data-testid="faqtitle" variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500', width: '90%'}}>FAQ</Divider>
      </Box>
      <br></br>
      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
        <Box align="center" style={{ padding: '25px', paddingBottom: '0px', marginTop: '20px', marginBottom: '0px', width: '90%'}}>
          <Form data-testid='search'>
            <TextField
              sx={{ input: { color: theme.palette.text.secondary }, '&:active fieldset': {borderColor: theme.palette.text.secondary} }}
              id="search-bar"
              className="text"
              style={{width:'85%'}}
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
          </Box>
        </Box>

      </div>
    </>
  )
}

export default DocumentationPage
