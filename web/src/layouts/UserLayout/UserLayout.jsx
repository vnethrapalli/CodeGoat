import { navigate, routes, useParams, useLocation } from '@redwoodjs/router'
import { Toaster, toast } from '@redwoodjs/web/toast'
import { IconButton, Divider, AppBar, Link, Box, Button, Container, Tooltip, Typography, Grid, Menu, MenuItem, useScrollTrigger, Modal, TextField, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider, experimental_extendTheme as extendTheme, useColorScheme, useTheme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { Logout, Settings, AccessTime, Person, DarkMode, LightMode } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth, auth0 } from 'src/auth'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useMutation } from '@redwoodjs/web';
import { set } from '@redwoodjs/forms';

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

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1000px)'})

  return (
    <Grid item display="flex" alignContent='center' alignItems='stretch' xs={isDesktopOrLaptop ? 3 : 8}>
      <Typography data-testid="titleLink" noWrap
        sx={{
          mr: 2,
          display: 'flex',
          fontWeight: 500,
          fontSize: 28,
          color: theme.palette.text.secondary,
          marginLeft: "5px",
        }}
      >
        <Tooltip title='Go Home'>
          <Link href={routes.home()} underline="none" sx={{ color: theme.palette.text.secondary, textDecoration: 'none !important' }}>
            <img data-testid="logo" src={theme.palette.mode === "light" ? "Images/goat2.png" : "Images/goat3.png"} alt="Code Translator Logo" style={{ width: '100%', height: 'auto', maxWidth: '25px', maxHeight: '50px', objectFit: 'contain', objectPosition: 'center', marginLeft: "15px", marginRight: '5px' }} />
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
    <Grid item display='flex' alignContent='center' alignItems='center' justifyContent='center' xs={6}>
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
            key="Documentation"
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

const NavDrawer = () => {
  const theme = useTheme();
  const page = useLocation().pathname.split('/')[1]
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ height: '100%', width: 180, backgroundColor: theme.palette.text.success, color: theme.palette.text.primary }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key={'Translate'} >
          <Tooltip title='Translate Code'>
            <Button
              key="Translate"
              variant="text"
              data-testid="translateButton"
              href={routes.translate()}
              onClick={testClick}
              sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.primary + '!important', display: 'block'}}
              style={page==="translate" ? {textDecoration: 'underline', textUnderlineOffset: '5px'} : {}}
            >
              Translate
            </Button>
          </Tooltip>
        </ListItem>

        <ListItem key={'Feedback'} >
          <Tooltip title='Give Feedback'>
            <Button
              key="Feedback"
              variant="text"
              data-testid="feedbackButton"
              onClick={testClick}
              href={routes.feedback()}
              sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '5px', marginLeft: '0px', color: theme.palette.text.primary + '!important', display: 'block' }}
              style={page==="feedback" ? {textDecoration: 'underline', textUnderlineOffset: '5px'} : {}}
            >
              Feedback
            </Button>
          </Tooltip>
        </ListItem>

        <ListItem key={'Documentation'} >
          <Tooltip title='Documentation'>
            <Button
              key="Documentation"
              variant="text"
              data-testid="documentationButton"
              onClick={() => (navigate(routes.documentation()))}
              sx={{ marginTop: '2px', marginBottom: '2px', marginRight: '0px', marginLeft: '0px', color: theme.palette.text.primary, display: 'block' }}
              style={page==="documentation" ? {textDecoration: 'underline', textUnderlineOffset: '5px'} : {}}
            >
              Documentation
            </Button>
          </Tooltip>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ fill: theme.palette.text.secondary }} />
      </IconButton>
      <Drawer open={open} variant="temporary" anchor={'right'} disableScrollLock={true} onClose={toggleDrawer(false)}
        ModalProps={{
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          keepMounted: true,
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  )

}

export const useStyles = makeStyles((theme) => ({
  menuPaper: {
    backgroundColor: theme.palette.background.default + ' !important',
  }
}));

const UserMenu = () => {
  const page = useLocation().pathname.split('/')[1]
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
            style={page==="user-account" ? {textDecoration: 'underline', textUnderlineOffset: '5px'} : {}}
          >
            <Settings sx={{ fill: theme.palette.text.secondary, paddingRight: '8px' }} />
            Settings
          </Link>
        </MenuItem>

        <MenuItem data-testid="historyButton" sx={{ alignSelf: 'center', color: theme.palette.text.secondary }} key="Translation History" onClick={handleCloseUserMenu}>
          <Link href={routes.history()}
            underline='none'
            style={page==="history" ? {textDecoration: 'underline', textUnderlineOffset: '5px'} : {}}
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
  const [is2faModal, setIs2faModal] = React.useState(false)
  const [otp, setOtp] = React.useState("")
  const [otpError, setOtpError] = React.useState({error: false, helperText: ""})
  const [otpResponse, setOtpResponse] = React.useState("")
  const [user, setUser] = React.useState(null)
  const ADD_USER_MUTATION = gql`
    mutation AddUser($user_id: String!, $email: String!) {
      addUser(user_id: $user_id, email: $email)
    }
  `
  const GENERATE_OTP_MUTATION = gql`
    mutation GenerateOTP($user_id: String!) {
      generateCode(user_id: $user_id)
    }
  `
  const VERIFY_OTP_MUTATION = gql`
    mutation VerifyCode($user_id: String!, $code: String!) {
      verifyCode(user_id: $user_id, code: $code)
    }
  `
  const VERIFICATION_IN_PROGRESS_MUTATION = gql`
    mutation VerificationInProgress($user_id: String!) {
      verificationInProgress(user_id: $user_id)
    }
  `

  const USER_EXISTS_MUTATION = gql`
    mutation UserExists($user_id: String!) {
      userExists(user_id: $user_id)
    }
  `

  const [addUser] = useMutation(ADD_USER_MUTATION)
  const [generateOTP] = useMutation(GENERATE_OTP_MUTATION)
  const [verifyOTP] = useMutation(VERIFY_OTP_MUTATION)
  const [verificationInProgress] = useMutation(VERIFICATION_IN_PROGRESS_MUTATION)
  const [userExists] = useMutation(USER_EXISTS_MUTATION)

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1000px)'})

  React.useEffect(() => {
    if(isAuthenticated) {
      if (localStorage.getItem('user') === null) {
        auth0.getUser().then(user => {
          delete user.updated_at
          delete user.email_verified
          localStorage.setItem('user', JSON.stringify(user))
        })
      }
      let userID = userMetadata.sub || null
      let userEmail = userMetadata.email || null
      setUser(JSON.parse(localStorage.getItem('user')))

      userExists({variables: { user_id: userID }}).then(({data}) => {
        const response = JSON.parse(data.userExists)
        if (!response) {
          addUser({
            variables: { user_id: userID, email: userEmail }
          }).then(({data}) => {
            const response = JSON.parse(data.addUser)
            if (response.statusCode === 500) {
              logOut().then(() => {
                localStorage.removeItem('user')
              })
              setIsAuth(false)
            } else {
              generateOTP({
                variables: { user_id: userID }
              }).then(({data}) => {
                const otp_response = JSON.parse(data.generateCode)
                if (otp_response.statusCode === 500) {
                  toast.error(otp_response.message, {position: "bottom-right", duration: 2500})
                  logOut().then(() => {
                    localStorage.removeItem('user')
                    setIsAuth(false)
                  })
                } else {
                  setOtpResponse("")
                  setOtpError({error: false, helperText: ''})
                  setIs2faModal(true)
                }
              })
            }
          })
        } else {
          verificationInProgress({
            variables: { user_id: userID }
          }).then(({data}) => {
            const response = JSON.parse(data.verificationInProgress)
            if (response) {
              toast.error(otp_response.message, {position: "bottom-right", duration: 2500})
              logOut().then(() => {
                localStorage.removeItem('user')
              })
              setIsAuth(false)
            } else {
              setIsAuth(true)
            }
          })
        }
      })


    }
  }, [loading])

  if (loading) {
    return null
  }

  const resendOtp = async () => {
    const userID = userMetadata.sub
    const {data: otp_data} = await generateOTP({
      variables: { user_id: userID }
    })

    const otp_response = JSON.parse(otp_data.generateCode)

    if (otp_response.statusCode === 500) {
      toast.error(otp_response.message, {position: "bottom-right", duration: 2500})
      await logOut().then(() => {
        localStorage.removeItem('user')
      })
    } else {
      toast.success('One Time Password Resent', {position: "bottom-right", duration: 2500})
      setOtpResponse("")
      setOtpError({error: false, helperText: ''})
    }
  }

  const login = async () => {
    await auth0.loginWithPopup().then(t => {
      auth0.getUser().then(async user => {
        delete user.updated_at
        delete user.email_verified
        setUser(user)
        const { data } = await addUser({
          variables: { user_id: user.sub, email: user.email }
        })

        const {data: otp_data} = await generateOTP({
          variables: { user_id: user.sub }
        })

        const otp_response = JSON.parse(otp_data.generateCode)

        if (otp_response.statusCode === 500) {
          toast.error(otp_response.message, {position: "bottom-right", duration: 2500})
          await logOut().then(() => {
            localStorage.removeItem('user')
            setIsAuth(false)
          })
        } else {
          setOtpResponse("")
          setOtpError({error: false, helperText: ''})
          setIs2faModal(true)
        }

      })
    })
    let currUser = JSON.parse(localStorage.getItem('user'));
    toast.success("Welcome " + currUser.nickname + "!", {position: "bottom-right"})
  }

  const inputStyle = {style:{color: theme.palette.text.secondary, fontSize: '18px', fontStyle: 'normal', fontWeight: '600', margin: '1%', textAlign: 'center'}}

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: theme.palette.background.default,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    textAlign: 'center',
    height: 'auto',
  };

  const handleOTPChange = (e) => {
    let value = e.target.value
    if(value.length !== 6) {
      setOtpError({error: true, helperText: 'OTP must be 6 characters'})
      return
    }

    if (!value.match(/^[A-Z0-9]+$/)) {
      setOtpError({error: true, helperText: 'OTP must contain only uppercase letters and numbers'})
      return
    }

    setOtp(value)
    setOtpError({error: false, helperText: ''})

  }

  const verifyOtp = async () => {
    const { data } = await verifyOTP({
      variables: { user_id: user.sub, code: otp }
    })

    const response = JSON.parse(data.verifyCode)

    if (response.statusCode === 401) {
      setOtpResponse(response.message)
      return
    }

    if (response.statusCode === 402) {
      setOtpResponse(response.message)
      return
    }

    if (response.statusCode === 500) {
      setOtpResponse(response.message)
      return
    }

    if (response.statusCode === 200) {
      setOtpResponse("")
      toast.success(response.message, {position: "bottom-right", duration: 2500})
      localStorage.setItem('user', JSON.stringify(user))
      setIsAuth(true)
      setIs2faModal(false)
    }

  }



  return (
    <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }} xs={isDesktopOrLaptop ? 3 : 4}>
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
        sx={{ backgroundColor: "#2D9596", color: "#F1FADA", height: "30px", textWrap: 'nowrap', marginLeft: '14px', marginRight: '0px', borderRadius: '6px', alignSelf: 'center',
          '&:hover': {
            backgroundColor: '#2D9596',
            color: "#F1FADA",
          },
        }}
      >
        Sign Up
      </Button>}

      <Modal
        open={is2faModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:theme.palette.primary.main, fontSize: '30px', fontStyle: 'normal', fontWeight: '600', margin: '1%', display: 'block'}}>
            Two Factor Authentication
          </Typography>
          <Typography id="modal-modal-description" variant="body1" component="p" style={{color:theme.palette.text.secondary, fontSize: '20px', fontStyle: 'normal', fontWeight: '400', margin: '1%', display: 'block'}}>
            A One Time Password has been sent to your email. Please enter it below to continue.
          </Typography>
          <TextField id="outlined-basic" data-testid="username" variant="outlined" inputProps={{...inputStyle}} style={{margin: '1%', display: 'block'}} onChange={handleOTPChange} error={otpError.error} helperText={otpError.helperText}/>
          <Typography id="modal-modal-description" variant="body1" component="p" style={{color: 'red', fontSize: '14px', fontStyle: 'normal', fontWeight: '400', margin: '1%', display: 'block'}}>
            {otpResponse}
          </Typography>

          <Button
            variant="contained"
            style={{
              backgroundColor: theme.palette.text.secondary,
              color: theme.palette.background.default,
              margin: '1%',
              display: 'inline-block',
            }}
            onClick={verifyOtp}
          >
            Verify
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.secondary,
              border: '1px solid ' + theme.palette.text.secondary,
              boxShadow: 'none',
              margin: '1%',
              display: 'inline-block',
            }}
            onClick={resendOtp}
          >
            Resend Code
          </Button>


        </Box>
      </Modal>

      {isAuth && <UserMenu />}

      {!isDesktopOrLaptop && <NavDrawer />}
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
    elevation: trigger ? 3 : 0,
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

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1000px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1100px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  return (
    <ElevationScroll {...props}>
      <AppBar position="sticky" sx={{ background: theme.palette.background.default, marginBottom: '5px', paddingTop: '5px', paddingBottom: '5px', height: '10%' }}>
        <Grid container width="100%" spacing={0} alignItems='center' alignContent='center' justifyContent='center'>
            {/* Title/Home Link */}
            <TitleLink />

            {/* Navigation Buttons */}
            {isDesktopOrLaptop && <NavButtons />}

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
