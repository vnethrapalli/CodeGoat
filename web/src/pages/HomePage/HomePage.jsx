import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { Typography, List, ListItem, ListItemText } from '@mui/material'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Typography variant='h2' component='h2' align='center'>
        Code Translator
      </Typography>

      <Typography paragraph='true' align='center'>
        This tool uses AI models to convert your code from one programming language to another. This tool provides support for a variety of languages such as:
        <List sx={{ listStyleType: 'disc' }}>
          <ListItem>
            <ListItemText>C++</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>C</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Java</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Python</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>JavaScript</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Assembly</ListItemText>
          </ListItem>
        </List>

      </Typography>

      <Typography variant='h4'>
        Getting Started:
      </Typography>

      <Typography paragraph='true' align='center'>
        <List sx={{ listStyleType: 'disc' }}>
            <ListItem>
              <ListItemText>Click on the Translate button in the NavBar above</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Select the language of the source code and the language of the translated code using the two dropdowns</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Paste source code in the text editor</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Click the translate button</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Make sure to give positive/negative feedback</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Assembly</ListItemText>
            </ListItem>
          </List>
      </Typography>
    </>
  )
}

export default HomePage
