import { navigate, routes, useParams, useLocation } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/toast'
import { IconButton, Divider, AppBar, Link, Box, Button, Container, Tooltip, Typography, Grid, Menu, MenuItem, useScrollTrigger, CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme, useColorScheme, useTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { Logout, Settings, AccessTime, Person, DarkMode, LightMode } from '@mui/icons-material'
import { useAuth, auth0 } from 'src/auth'
import PropTypes from 'prop-types';
import { useEffect } from 'react';


const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#265073"
        },
        secondary: {
          main: "#2D9596"
        },
        background: {
          default: "#F1FADA",
        },
        text: {
          primary: "#F1FADA",
          secondary: "#265073",
          success: "#536D5A",
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
          default: "#1E3231",
        },
        text: {
          primary: "#F1FADA",
          secondary: "#F1FADA",
          success: "#536D5A",
        }
      },
    },
  },
});


const TitleLink = () => {
  const theme = useTheme();

  return (
    <Grid item alignContent='center' alignItems='stretch' xs={3}>
      <Typography data-testid="titleLink" noWrap
        sx={{
          mr: 2,
          display: 'flex',
          fontWeight: 500,
          fontSize: 28,
          color: theme.palette.text.secondary,
          marginLeft: "20px",
        }}
      >
        <Tooltip title='Go Home'>
          <Link href={routes.home()} underline="none" sx={{ color: theme.palette.text.secondary }}>
            CodeGoat
          </Link>
        </Tooltip>
      </Typography>
    </Grid>
  )
}

export function testClick() {
  return "hello"
}

const NavButtons = () => {
  const theme = useTheme();
  const page = useLocation().pathname.split('/')[1]

  return (
    <Grid item alignContent='center' alignItems='center' alignSelf='center' xs={6}>
      <Box data-testid="navButtons" display="flex" sx={{ justifyContent: "center", alignItems: "center" }}>
        <Tooltip title='Translate Code'>
          <Button
            key="Translate"
            variant="text"
            data-testid="translateButton"
            href={routes.translate()}
            onClick={testClick}
            sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block'}}
            style={page==="translate" ? {textDecoration: 'underline', textUnderlineOffset: '5px'} : {}}
          >
            Translate
          </Button>
        </Tooltip>

        {/* <Tooltip title='Check API Status'>
          <Button
            key="Status"
            variant="text"
            data-testid="statusButton"
            onClick={() => (navigate(routes.status()))}
            sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
          >
            GPT-3 Status
          </Button>
        </Tooltip> */}

        <Tooltip title='Give Feedback'>
          <Button
            key="Feedback"
            variant="text"
            data-testid="feedbackButton"
            onClick={testClick}
            href={routes.feedback()}
            sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
            style={page==="feedback" ? {textDecoration: 'underline', textUnderlineOffset: '5px'} : {}}
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
            sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '0px', marginLeft: '0px', color: theme.palette.text.secondary, display: 'block' }}
            style={page==="documentation" ? {textDecoration: 'underline', textUnderlineOffset: '5px'} : {}}
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
      <IconButton data-testid="themeButton" sx={{ display: 'inline-flex', width: '7%'}} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        {mode === 'light'
          ? <LightMode style={{fill: theme.palette.text.secondary}} />
          : <DarkMode style={{fill: theme.palette.text.secondary}} />}
      </IconButton>
    </Tooltip>
  )
}

export const useStyles = makeStyles((theme) => ({
  menuPaper: {
    backgroundColor: theme.palette.background.default + ' !important',
  }
}));

const UserMenu = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { logOut } = useAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logout = async () => {
    await logOut().then(() => {
      localStorage.removeItem('user')
    })
  }

  const handleCloseUserMenuSignOut = () => {
    logout();
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let currUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Box sx={{ display: 'flex', alignContent: 'center', paddingLeft: '10px', flexGrow: 0 }}>
      <Tooltip title="Open User Menu">
        <IconButton data-testid="openUserMenuButton" onClick={handleOpenUserMenu} sx={{ display: 'inline-flex' }}>
          <Person sx={{ fill: theme.palette.text.secondary }} />
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
        classes={{ paper: classes.menuPaper }}
        disableScrollLock={true}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Typography data-testid="userNickname" sx={{ textAlign: 'center', fontSize: '20px', fontWeight: '500', color: theme.palette.text.secondary, p: '5px' }}>
          {currUser.nickname}
        </Typography>

        <Typography data-testid="userEmail" sx={{ textAlign: 'center', fontSize: '16px', fontWeight: '400', color: theme.palette.text.secondary, p: '0px 10px' }}>
          {currUser.email}
        </Typography>

        <Divider  sx={{ paddingTop: '8px' }}/>

        <MenuItem data-testid="settingsButton" sx={{ alignSelf: 'center', color: theme.palette.text.secondary, marginTop: '8px' }} key="Settings" onClick={handleCloseUserMenu}>
          <Link href={routes.userAccount()}
            underline='none'
            sx={{ color: theme.palette.text.secondary, width: '100%', display: 'flex', alignItems: 'center' }}
          >
            <Settings sx={{ fill: theme.palette.text.secondary, paddingRight: '8px' }} />
            Settings
          </Link>
        </MenuItem>

        <MenuItem data-testid="historyButton" sx={{ alignSelf: 'center', color: theme.palette.text.secondary }} key="Translation History" onClick={handleCloseUserMenu}>
          <Link href={routes.history()}
            underline='none'
            sx={{ color: theme.palette.text.secondary, width: '100%', display: 'flex', alignItems: 'center' }}
          >
            <AccessTime sx={{ fill: theme.palette.text.secondary, paddingRight: '8px' }} />
            Translation History
          </Link>
        </MenuItem>

        <Divider sx={{ marginTop: '0px' }} />

        <MenuItem data-testid="signoutButton" sx={{ alignSelf: 'center', color: theme.palette.text.secondary, width: '100%' }} key="Sign Out" onClick={handleCloseUserMenuSignOut}>
          <Logout sx={{ fill: theme.palette.text.secondary, paddingRight: '8px' }}/>
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  )
}

const UserButtons = () => {
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
    let currUser = JSON.parse(localStorage.getItem('user'));
    toast.success("Welcome " + currUser.nickname + "!", {position: "bottom-right"})
  }

  return (
    <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-end', paddingRight: '5px' }} xs={3}>
      <ThemeButton />

      {!isAuth && <Button
        onClick={login}
        data-testid="loginButton"
        key="Log In"
        variant="text"
        sx={{ backgroundColor: theme.palette.text.primary, color: "#265073", height: "30px", marginLeft: '14px', marginRight: '0px', borderRadius: '6px', alignSelf: 'center',
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

      {/* {isAuth && <Tooltip title='Account Management'>
        <IconButton data-testid="accountButton" sx={{ width: '10%'}} href={routes.userAccount()}>
          <AccountBoxIcon style={{fill: theme.palette.text.primary}} sx={{fontSize: 35}} />
        </IconButton>
      </Tooltip>} */}
    </Grid>
  )
}

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
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
            color: theme.palette.text.secondary,
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

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const NavBar = (props) => {
  const theme = useTheme();

  return (
    <ElevationScroll {...props}>
      <AppBar position="sticky" sx={{ background: theme.palette.background.default, marginBottom: '20px', paddingTop: '5px', paddingBottom: '5px', height: '10%' }}>
        <Grid container width="100%" spacing={0} alignItems='center' alignContent='center' justifyContent='center'>
            {/* Title/Home Link */}
            <TitleLink />

            {/* Navigation Buttons */}
            <NavButtons />

            {/* Theme Change and Authentication Button */}
            <UserButtons />

        </Grid>
      </AppBar>
    </ElevationScroll>
  )
}

const UserLayout = ({ children }) => {

  return (
    <>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Box minHeight='100vh'>
          {/* Static Navigation Bar */}
          <NavBar />

          {/* Page Content */}
          <main>{children}</main>

          {/* Static Footer */}
          <Footer />
        </Box>
      </CssVarsProvider>
    </>
  )
}

export default UserLayout
