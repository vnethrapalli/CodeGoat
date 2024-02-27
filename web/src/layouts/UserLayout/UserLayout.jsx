import { routes } from '@redwoodjs/router'

import { AppBar, Link, Box, Button, Container, Tooltip, Typography, Grid } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme, useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#F1FADA"
        },
        secondary: {
          main: "#2D9596"
        },
        background: {
          default: "#F1FADA"
        },
        text: {
          primary: "#F1FADA"
        }
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#F1FADA"
        },
        secondary: {
          main: "#344955"
        },
        background: {
          default: "#35374B"
        },
        text: {
          primary: "#F1FADA"
        }
      },
    },
  },

});

const TitleLink = () => {
  const theme = useTheme();

  return (
    <Grid item alignContent='center' alignItems='stretch' xs="4">
      <Tooltip title='Go Home'>
        <Typography variant="h6" noWrap component="a"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontWeight: 700,
            fontSize: 30,
            color: theme.palette.text.primary,
            textDecoration: 'none',
            marginLeft: "20px",
          }}
        >
          <Link href={routes.home()} underline="none">
            CodeGoat
          </Link>
        </Typography>
      </Tooltip>
    </Grid>
  )
}

const NavButtons = () => {
  const theme = useTheme();

  return (
    <Grid item alignContent='center' alignItems='stretch' alignSelf='center' xs="4">
      <Box display="flex" sx={{ justifyContent: "center", alignItems: "center", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Tooltip title='Translate Code'>
          <Link href={routes.translate()} underline="none" sx={{ color: theme.palette.text.primary, fontWeight: '300' }}>
            <Button
              key="Translate"
              variant="text"
              sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }}
            >
              Translate
            </Button>
          </Link>
        </Tooltip>

        <Tooltip title='Check API Status'>
          <Link href={routes.status()} underline="none" sx={{ color: theme.palette.text.primary, fontWeight: '300' }}>
            <Button
              key="Status"
              variant="text"
              sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }}
            >
              GPT-3 Status
            </Button>
          </Link>
        </Tooltip>

        <Tooltip title='Give Feedback'>
          <Link href={routes.feedback()} underline="none" sx={{ color: theme.palette.text.primary, fontWeight: '300' }}>
            <Button
              key="Feedback"
              variant="text"
              sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }}
            >
              Feedback
            </Button>
          </Link>
        </Tooltip>
      </Box>
    </Grid>
  )
}

const ThemeButton = () => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();

  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton data-testid="themeButton" sx={{ width: '4%'}} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        {mode === 'light'
          ? <LightMode style={{fill: theme.palette.text.primary}} />
          : <DarkMode style={{fill: theme.palette.text.primary}} />}
      </IconButton>
    </Tooltip>
  )
}

const ThemeAuthButtons = () => {
  const theme = useTheme();
  const [auth, setAuth] = React.useState(false);

  return (
    <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-end' }} xs="4">
      <ThemeButton />

      {!auth && <Button
        key="Log In"
        variant="text"
        sx={{ backgroundColor: theme.palette.primary.main, color: "#265073", height: "30px", marginLeft: '14px', marginRight: '0px', borderRadius: '6px', alignSelf: 'center',
          '&:hover': {
            backgroundColor: '#F1FADA',
            color: "#265073",
          },
        }}
      >
        Log In
      </Button>}

      {!auth && <Button
        key="Sign Up"
        variant="text"
        sx={{ backgroundColor: "#2D9596", color: "#F1FADA", height: "30px", marginLeft: '14px', marginRight: '0px', borderRadius: '6px', alignSelf: 'center',
          '&:hover': {
            backgroundColor: '#2D9596',
            color: "#F1FADA",
          },
        }}
      >
        Sign Up
      </Button>}

      {auth && <Button
        key="Sign Out"
        variant="text"
        sx={{ backgroundColor: "#F1FADA", color: "#265073", height: "30px", marginLeft: '14px', marginRight: '0px', borderRadius: '6px', alignSelf: 'center',
          '&:hover': {
            backgroundColor: '#F1FADA',
            color: "#265073",
          },
        }}
      >
        Sign Out
      </Button>}

    </Grid>
  )
}

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: '#265073',
        position: 'relative',
        bottom: 0,
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        height: '40px'
      }}
      component="footer"
    >
      <Container>
        <Typography variant="body2"
          sx={{
            color: theme.palette.text.primary,
            display: 'flex',
            justifyContent: 'center'
          }}>

          {"Copyright © "}
          {new Date().getFullYear()}
          {" Segmentation Cult"}
        </Typography>
      </Container>
    </Box>
  )
}

const UserLayout = ({ children }) => {
  return (
    <>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Box minHeight='100vh'>
          <AppBar position="sticky" sx={{ background: '#265073', marginBottom: '20px', height: '10%' }}>
            <Grid container width="100%" spacing={2} alignItems='center' alignContent='center' justifyContent='center'>
                {/* Title/Home Link */}
                <TitleLink />

                {/* Navigation Buttons */}
                <NavButtons />

                {/* Theme Change and Authentication Button */}
                <ThemeAuthButtons />

            </Grid>
          </AppBar>

          <main>{children}</main>

          {/* Static Footer */}
          <Footer />
        </Box>
      </CssVarsProvider>
    </>
  )
}

export default UserLayout