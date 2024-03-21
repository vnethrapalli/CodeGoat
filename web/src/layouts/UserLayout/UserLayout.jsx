import { navigate, routes } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/toast'
import { AppBar, Link, Box, Button, Container, Tooltip, Typography, Grid } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme, useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import { useAuth, auth0 } from 'src/auth'

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
          primary: "#F1FADA",
          secondary: "#265073"
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
          primary: "#F1FADA",
          secondary: "#F1FADA"
        }
      },
    },
  },

});

const TitleLink = () => {
  const theme = useTheme();

  return (
    <Grid item alignContent='center' alignItems='stretch' xs={4}>
      <Typography data-testid="titleLink" variant="h6" noWrap component="span"
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
        <Tooltip title='Go Home'>
          <Link href={routes.home()} underline="none">
            CodeGoat
          </Link>
        </Tooltip>
      </Typography>
    </Grid>
  )
}

const NavButtons = () => {
  const theme = useTheme();

  return (
    <Grid item alignContent='center' alignItems='stretch' alignSelf='center' xs={4}>
      <Box data-testid="navButtons" display="flex" sx={{ justifyContent: "center", alignItems: "center", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Tooltip title='Translate Code'>
          <Button
            key="Translate"
            variant="text"
            data-testid="translateButton"
            href={routes.translate()}
            sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }}
          >
            Translate
          </Button>
        </Tooltip>

        <Tooltip title='Check API Status'>
          <Button
            key="Status"
            variant="text"
            data-testid="statusButton"
            onClick={() => (navigate(routes.status()))}
            sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }}
          >
            GPT-3 Status
          </Button>
        </Tooltip>

        <Tooltip title='Give Feedback'>
          <Button
            key="Feedback"
            variant="text"
            data-testid="feedbackButton"
            href={routes.feedback()}
            sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }}
          >
            Feedback
          </Button>
        </Tooltip>

        <Tooltip title='Documentation'>
          <Button
            key="Feedback"
            variant="text"
            data-testid="documentationButton"
            onClick={() => (navigate(routes.documentation()))}
            sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }}
          >
            Documentation
          </Button>
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
  const { isAuthenticated, signUp, logOut, loading, userMetadata } = useAuth()
  const [isAuth, setIsAuth] = React.useState(isAuthenticated)

  React.useEffect(() => {
    if(isAuthenticated) {
      setIsAuth(true)
      if (localStorage.getItem('user') === null) {
        auth0.getUser().then(user => {
          delete user.updated_at
          delete user.email_verified
          localStorage.setItem('user', JSON.stringify(user))
        })
      }
    }
  }, [loading])

  if (loading) {
    return null
  }

  const login = async () => {
    await auth0.loginWithPopup().then(t => {
      setIsAuth(true)
      auth0.getUser().then(user => {
        delete user.updated_at
        delete user.email_verified
        localStorage.setItem('user', JSON.stringify(user))
      })
    })
  }

  const logout = async () => {
    await logOut().then(() => {
      localStorage.removeItem('user')
    })
  }


  return (
    <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-end' }} xs={4}>
      <ThemeButton />

      {!isAuth && <Button
        onClick={login}
        data-testid="loginButton"
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

      {!isAuth && <Button
        onClick={signUp}
        data-testid="signupButton"
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

      {isAuth && <Button
        onClick={logout}
        data-testid="signoutButton"
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

      {isAuth && <Tooltip title='Account Management'>
        <IconButton data-testid="accountButton" sx={{ width: '10%'}} href={routes.userAccount()}>
          <AccountBoxIcon style={{fill: theme.palette.text.primary}} sx={{fontSize: 35}} />
        </IconButton>
      </Tooltip>}

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
        <Typography component='span' variant="body2"
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
        <Toaster />
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
