// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

// const HomePage = () => {
//   const { isAuthenticated, signUp, logIn, logOut, userMetadata, loading } = useAuth()

//   if(loading) {
//     return null
//   }

//   return (
//     <>
//       {/* MetaTags, h1, paragraphs, etc. */}
//       <p>{JSON.stringify({ isAuthenticated })}</p>
//       { isAuthenticated && <p>Email: {userMetadata.email}</p>}
//       <button onClick={signUp}>sign up</button>
//       <button onClick={logIn}>Log In</button>
//       <button onClick={logOut}>Log Out</button>
//     </>
//   )
// }

// export default HomePage


import { Box, Typography, List, ListItem } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const languages = ['C++', 'C', 'Java', 'Python', 'Javascript', 'Assembly']
const instructions = ['Click on the Translate button in the NavBar above',
                      'Select the language of the source code and the language of the translated code using the two dropdowns',
                      'Paste source code in the text editor',
                      'Click the translate button',
                      'Make sure to give positive/negative feedback!']

const HomePage = () => {
  const theme = useTheme();

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
        <Typography variant='h2' component='h2' align='center' style={{ backgroundColor: theme.palette.secondary.main, padding: '15px', width: '65%', borderRadius: '20px' , color: theme.palette.text.primary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>
          Code Translator
        </Typography>

        <Typography style={{ backgroundColor: theme.palette.secondary.main, padding: '25px', marginTop: '20px', marginBottom: '0px', width: '65%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          This tool uses an AI model to convert your code from one programming language to another. We provide support for a variety of languages such as:

          <List dense disablePadding sx={{ listStyleType: 'disc', pl: 4, marginTop: '5px', marginBottom: '0px'}}>
            {languages.map((language) => (
              <ListItem dense disablePadding sx={{ display: 'list-item' }}>
                {language}
              </ListItem>
            ))}
          </List>
        </Typography>

        <Typography style={{ backgroundColor: theme.palette.secondary.main, padding: '25px', marginTop: '20px', marginBottom: '20px', width: '65%', borderRadius: '20px', color: theme.palette.text.primary, fontSize: '24px', fontStyle: 'normal', fontWeight: '300'}}>
          <Typography variant='h4' component='h4' style={{ backgroundColor: theme.palette.secondary.main, padding: '0px', margin: '0px', color: theme.palette.text.primary, fontSize: '32px', fontStyle: 'normal', fontWeight: '550'}}>
            Getting Started
          </Typography>

          <List dense disablePadding sx={{ listStyle: 'decimal', pl: 4, marginTop: '5px', marginBottom: '0px'}}>
            {instructions.map((instruction) => (
              <ListItem dense disablePadding sx={{ display: 'list-item' }}>
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