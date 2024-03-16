import { routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Form, Submit, TextAreaField } from '@redwoodjs/forms'

// These are for the search bar feature of the FAQ section
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Button, IconButton } from "@mui/material"

import { useTheme } from '@mui/material/styles'
import { TextareaAutosize, Box, Typography, Link, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles'

import QuestionsCell from 'src/components/QuestionsCell' 
import DownloadIcon from '@mui/icons-material/Download';


const DocumentationPage = () => {
  const theme = useTheme()
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Metadata title="Documentation" description="Documentation page" />
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
        <Typography variant='h1' component='span' style={{color: theme.palette.text.secondary, fontSize: '42px', fontStyle: 'normal', fontWeight: '600'}}>Technologies</Typography>
        <Typography data-testid='description' component='span' style={{ backgroundColor: theme.palette.secondary.main, padding: '25px', marginTop: '20px', marginBottom: '0px', width: '85%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          This tool was created using <Link href="https://redwoodjs.com/docs/introduction">Redwood</Link>, a full-stack web framework. As such, most of the technologies we employ are provided and are 
          seamlessly integrated into our workflow and development of our tool.
        </Typography>

        <Typography data-testid='gpt' component='span' style={{ backgroundColor: theme.palette.secondary.main, padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' component='span' style={{ backgroundColor: theme.palette.secondary.main, padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            What is GPT-3?
          </Typography>
          <Typography style={{ backgroundColor: theme.palette.secondary.main, padding: '5px', marginTop: '20px', marginBottom: '0px', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            <Link href="https://platform.openai.com/docs/introduction">GPT</Link> is a natural language processing model developed by OpenAI, which uses a deep learning
            architecture that has seen massive use in recent years. In our tool, we use GPT-3, since GPT-4 costs more overall.
          </Typography>
        </Typography>

        <Typography data-testid='gpt' component='span' style={{ backgroundColor: theme.palette.secondary.main, padding: '25px', marginTop: '20px', marginBottom: '20px', width: '85%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' component='span' style={{ backgroundColor: theme.palette.secondary.main, padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            How do we use GPT-3?
          </Typography>
          <Typography style={{ backgroundColor: theme.palette.secondary.main, padding: '5px', marginTop: '20px', marginBottom: '0px', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
            On our end, we sanitize and quickly error check input from you, the user, on the frontend. That is, anything that you type in the initial code box is pre-processed 
            before we create an API call. Once the API call is made, given that there are no errors or connection issues, your request for translation will be queued. Once the information is 
            sent and translated, a new code box will return with the translation provided by GPT-3. 
          </Typography>
        </Typography>
          
        <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '42px', fontStyle: 'normal', fontWeight: '600'}}>Downloadable Guides</Typography>
        
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>CodeGoat Walkthrough</Typography>
          <a href="Guides/CodeGoat.pdf" download="TranslateGuide" target='_blank'>
            <IconButton color="primary" aria-label="download translate guide">
              <DownloadIcon />
            </IconButton>
          </a>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>Trackier's Guide to GPT</Typography>
          <a href="Guides/ChatGPT.pdf" download="GPTGuide" target='_blank'>
            <IconButton color="primary" aria-label="download gpt guide">
              <DownloadIcon />
            </IconButton>
          </a>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
          <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>About Us</Typography>
          <a href="Guides/AboutUs.pdf" download="About Us" target='_blank'>
            <IconButton color="primary" aria-label="download about us">
              <DownloadIcon />
            </IconButton>
          </a>
        </Box>
        
        <br></br>
        <Typography variant='h1' component='h1' align='center' style={{color: theme.palette.text.secondary, fontSize: '42px', fontStyle: 'normal', fontWeight: '600'}}>FAQ</Typography>
      </Box>
      <br></br>
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              size: "lg",
            }}
          >
        <Form>
          <TextField
            sx={{ input: { color: theme.palette.text.secondary }, '&:active fieldset': {borderColor: theme.palette.text.secondary} }}
            id="search-bar"
            className="text"
            width="65%"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            label="What are you looking for?"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
          <IconButton type="submit" aria-label="search">
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
