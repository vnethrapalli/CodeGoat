import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { Box, Typography, List, ListItem } from '@mui/material'
import { useTheme } from '@mui/material/styles';


const HomePage = () => {
  const theme = useTheme();

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant='h2' component='h2' align='center' style={{ backgroundColor: theme.palette.secondary.main, padding: '15px', width: '65%', borderRadius: '25px' , color: '#F1FADA', fontSize: '56px', fontStyle: 'normal', fontWeight: '600'}}>
          Code Translator
        </Typography>

        <Typography paragraph='true' style={{ backgroundColor: '#2D9596', padding: '25px', marginTop: '20px', marginBottom: '0px', width: '65%', borderRadius: '25px', color: '#F1FADA', fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
          This tool uses an AI model to convert your code from one programming language to another. We provide support for a variety of languages such as:

          <List dense disablePadding sx={{ listStyleType: 'disc', pl: 4, marginTop: '5px', marginBottom: '0px'}}>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              C++
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              C
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              Java
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              Python
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              JavaScript
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              Assembly
            </ListItem>
          </List>
        </Typography>

        <Typography paragraph='true' style={{ backgroundColor: '#2D9596', padding: '25px', marginTop: '20px', marginBottom: '20px', width: '65%', borderRadius: '25px', color: '#F1FADA', fontSize: '28px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' component='h4' style={{ backgroundColor: '#2D9596', padding: '0px', margin: '0px', color: '#F1FADA', fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            Getting Started
          </Typography>

          <List dense disablePadding sx={{ listStyle: 'decimal', pl: 4, marginTop: '5px', marginBottom: '0px'}}>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              Click on the Translate button in the NavBar above
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              Select the language of the source code and the language of the translated code using the two dropdowns
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              Paste source code in the text editor
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              Click the translate button
            </ListItem>
            <ListItem dense disablePadding sx={{ display: 'list-item' }}>
              Make sure to give positive/negative feedback!
            </ListItem>
          </List>
        </Typography>
      </Box>

    </>
  )
}

export default HomePage
