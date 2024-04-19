import { routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'

// These are for the search bar feature of the FAQ section
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { useTheme } from '@mui/material/styles'
import { Grid, Box, Typography, Link, IconButton, List, ListItemIcon, ListItemText, ListItem } from '@mui/material';

import QuestionsCell from 'src/components/QuestionsCell'
import DownloadIcon from '@mui/icons-material/Download';


const DocumentationPage = () => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Metadata title="Documentation" description="Documentation Page" />
      <Typography variant='h2' component='h2' align='center' style={{color: theme.palette.text.secondary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>Documentation</Typography>
      {
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 20
          }}
        >
      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
        <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '40px', fontStyle: 'normal', fontWeight: '500'}}>Technologies</Typography>

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
                primary="React"
              />
            </ListItem>
            <ListItem
              component="a"
              href="https://www.prisma.io/"
            >
              <img src="Images/prismaHD.png" alt="Prisma Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center',  marginRight: '5px' }} />
              <ListItemText
                primary="Prisma"
              />
            </ListItem>
            <ListItem
              component="a"
              href="https://www.graphql.com/"
            >
              <img src="Images/graphql.png" alt="GrahphQL Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center', marginRight: '5px' }} />
              <ListItemText
                primary="GrahphQL"
              />
            </ListItem>
            <ListItem
              component="a"
              href="https://storybook.js.org/"
            >
              <img src="Images/storybook.png" alt="Storybook Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center', marginRight: '10px'}} />
              <ListItemText
                primary="Storybook"
              />
            </ListItem>
            <ListItem
              component="a"
              href="https://jestjs.io/"
            >
              <img src="Images/jest.png" alt="Jest Icon" style={{ width: '25px', height: '25px', objectFit: 'contain', objectPosition: 'center', marginRight: '5px' }} />
              <ListItemText
                primary="Jest"
              />
            </ListItem>
          </List>
        </Box>

        <Typography data-testid='whatgpt' component="span" style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            What is GPT-3.5?
          </Typography>

          <Typography component="span" style={{ marginTop: '20px', marginBottom: '0px', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            <Link data-testid='gpt link' href="https://platform.openai.com/docs/introduction" sx={{textDecoration: 'underline' + '!important', textUnderlineOffset: '5px' + " !important" }}>GPT</Link> is a natural language processing model developed by OpenAI, which uses a deep learning
            architecture that has seen massive use in recent years. In our tool, we use GPT-3.5 Turbo, since GPT-4 costs more overall.
          </Typography>
        </Typography>

        <Typography data-testid='howgpt' component="span"  style={{ padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' style={{ padding: '0px', margin: '0px', color: theme.palette.text.secondary, fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            How do we use GPT-3?
          </Typography>

          <Typography component="span"  style={{ marginTop: '20px', marginBottom: '0px', borderRadius: '20px', color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            On our end, we sanitize and quickly error check input from you, the user, on the frontend. That is, anything that you type in the initial code box is pre-processed
            before we create an API call. Once the API call is made, given that there are no errors or connection issues, your request for translation will be queued. Once the information is
            sent and translated, a new code box will return with the translation provided by GPT-3.
          </Typography>
        </Typography>

        <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '42px', fontStyle: 'normal', fontWeight: '600', marginTop: '30px'}}>Downloadable Guides</Typography>

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
        <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '42px', fontStyle: 'normal', fontWeight: '600'}}>FAQ</Typography>
      </Box>
      <br></br>
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignSelf: 'center',
              width: "85%",
            }}
          >
        <Form data-testid='search'>
          <TextField
            sx={{ input: { color: theme.palette.text.secondary }, '&:active fieldset': {borderColor: theme.palette.text.secondary} }}
            id="search-bar"
            className="text"
            width="100%"
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
        </Box>
        <br></br>
        <QuestionsCell searchQuery={searchQuery}/>
      </div>
      }
    </>
  )
}

export default DocumentationPage
