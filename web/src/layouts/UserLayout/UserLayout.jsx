import { navigate, routes } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/toast'
import { Divider, AppBar, Link, Box, Button, Container, Tooltip, Typography, Grid, Menu, MenuItem } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme, useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Logout, Settings, AccessTime, Person, DarkMode, LightMode } from '@mui/icons-material'

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
    <Grid item alignContent='center' alignItems='stretch' xs={3}>
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
    <Grid item alignContent='center' alignItems='center' alignSelf='center' xs={6}>
      <Box data-testid="navButtons" display="flex" sx={{ justifyContent: "center", alignItems: "center" }}>
        <Tooltip title='Translate Code'>
          <Button
            key="Translate"
            variant="text"
            data-testid="translateButton"
            href={routes.translate()}
            sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.primary, display: 'block' }}
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
            sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.primary, display: 'block' }}
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
            sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.primary, display: 'block' }}
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
            sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '0px', marginLeft: '0px', color: theme.palette.text.primary, display: 'block' }}
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
      <IconButton data-testid="themeButton" sx={{ width: '7%'}} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        {mode === 'light'
          ? <LightMode style={{fill: theme.palette.text.primary}} />
          : <DarkMode style={{fill: theme.palette.text.primary}} />}
      </IconButton>
    </Tooltip>
  )
}

const UserMenu = () => {
  const theme = useTheme();
  const { logOut } = useAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenuSignOut = () => {
    logOut();
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let currUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Box sx={{ display: 'flex', alignContent: 'center', paddingLeft: '10px', flexGrow: 0 }}>
      <Tooltip title="Open Settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ marginLeft: '5px', p: 0 }}>
          <Person sx={{ fill: theme.palette.text.primary }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '35px', display: 'flex', alignItems: 'center', overflow: 'auto', color: theme.palette.text.secondary }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock={true}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Typography sx={{ textAlign: 'center', fontSize: '20px', fontWeight: '500', color: theme.palette.text.secondary}}>
          {currUser.nickname}
        </Typography>
        <Typography sx={{ textAlign: 'center', fontSize: '16px', fontWeight: '400', color: theme.palette.text.secondary}}>
          {currUser.email}
        </Typography>
        <Divider  sx={{ paddingTop: '8px' }}/>
        <MenuItem sx={{ alignSelf: 'center', color: theme.palette.text.secondary }} key="Settings" onClick={handleCloseUserMenu}>
          <Link href={routes.account()} underline='none' sx={{ color: theme.palette.text.secondary, width: '100%', display: 'flex', alignItems: 'center' }}>
            <Settings sx={{ fill: theme.palette.text.secondary, paddingRight: '8px' }} />
            Settings
          </Link>
        </MenuItem>
        <MenuItem sx={{ alignSelf: 'center', color: theme.palette.text.secondary }} key="Translation History" onClick={handleCloseUserMenu}>
          <Link href={routes.history()} underline='none' sx={{ color: theme.palette.text.secondary, width: '100%', display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ fill: theme.palette.text.secondary, paddingRight: '8px' }} />
            Translation History
          </Link>
        </MenuItem>
        <Divider sx={{ marginTop: '0px' }} />
        <MenuItem sx={{ alignSelf: 'center', color: theme.palette.text.secondary, width: '100%' }} key="Sign Out" onClick={handleCloseUserMenuSignOut}>
          <Logout sx={{ fill: theme.palette.text.secondary, paddingRight: '8px' }}/>
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  )
}

const UserButtons = () => {
  const theme = useTheme();
  const { isAuthenticated, signUp, logOut, loading } = useAuth()
  const [isAuth, setIsAuth] = React.useState(isAuthenticated)

  if(loading) {
    return null
  }

  const login = async () => {
    await auth0.loginWithPopup().then(t => {
      setIsAuth(true)
      auth0.getUser().then(user => {
        delete user.sub
        delete user.updated_at
        delete user.email_verified
        localStorage.setItem('user', JSON.stringify(user))
      })
    })
    let currUser = JSON.parse(localStorage.getItem('user'));
    toast.success("Welcome " + currUser.nickname + "!", {position: "bottom-right"})
  }

  return (
    <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-end' }} xs={3}>
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

      {isAuth && <UserMenu />}

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
        height: '40px',
        marginTop: '10px',
        marginBottom: '0px'
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
                <UserButtons />

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