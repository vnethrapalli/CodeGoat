import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { TextField, Typography, List, ListItem, ListItemText } from '@mui/material'

const HomePage = () => {
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Typography variant='h2' component='h2' align='center' style={{ backgroundColor: '#2D9596', padding: '10px', marginTop: '10px', width: '50%'}}>
        Code Translator
      </Typography>

      <Typography paragraph='true' align='center' style={{ backgroundColor: '#2D9596', padding: '10px', marginTop: '10px', width: '50%'}}>
        This tool uses AI models to convert your code from one programming language to another. This tool provides support for a variety of languages such as:
        <List align='center' sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText>C++</ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText>C</ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText>Java</ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText>Python</ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText>JavaScript</ListItemText>
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            <ListItemText>Assembly</ListItemText>
          </ListItem>
        </List>

      </Typography>

      <Typography paragraph='true' align='center' style={{ backgroundColor: '#2D9596', padding: '10px', marginTop: '10px', width: '50%' }}>
        <h4>Getting Started:</h4>
        <List sx={{ listStyleType: 'disc', pl: 4 }}>
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
          </List>
      </Typography>
    </>
  )
}

export default HomePage
