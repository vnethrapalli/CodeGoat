import { routes } from '@redwoodjs/router'

import { AppBar, Link, Toolbar, Box, Button, Container, Typography, Paper, Grid } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';

const themeLight = createTheme({
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
  }
});

const themeDark = createTheme({
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
  }
});

const TitleLink = () => {
  const theme = useTheme();

  return (
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
  )
}

const NavButtons = () => {
  const theme = useTheme();

  return (
    <Box display="flex" sx={{ justifyContent: "center", alignItems: "center", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Link href={routes.translate()} underline="none" sx={{ color: theme.palette.text.primary, fontWeight: '300' }}>
        <Button
          key="Translate"
          variant="text"
          sx={{ my: 2, color: "#F1FADA", display: 'block', margin: 'auto auto' }}
        >
          Translate
        </Button>
      </Link>

      <Link href={routes.status()} underline="none" sx={{ color: theme.palette.text.primary, fontWeight: '300' }}>
        <Button
          key="Status"
          variant="text"
          sx={{ my: 2, color: "#F1FADA", display: 'block', margin: 'auto auto' }}
        >
          GPT-3 Status
        </Button>
      </Link>

      <Link href={routes.feedback()} underline="none" sx={{ color: theme.palette.text.primary, fontWeight: '300' }}>
        <Button
          key="Feedback"
          variant="text"
          sx={{ my: 2, color: "#F1FADA", display: 'block', margin: 'auto auto' }}
        >
          Feedback
        </Button>
      </Link>
    </Box>
  )
}

const AuthButtons = () => {
  const theme = useTheme();

  return (
    <Button></Button>
  )
}

const Footer = () => {
  const theme = useTheme();

  return (
    <Paper component="footer" square variant="text"
      sx={{ background: '#265073', marginBottom: '0px', height: '25px', width: '100%', position: 'fixed', bottom: 0 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
            mb: 2,
          }}
        >
          <Typography variant="caption" sx = {{ color: theme.palette.text.primary, fontSize: '14px', margin: 'auto auto'}}>
            Copyright ©2024. Segmentation Cult
          </Typography>
        </Box>
      </Container>
    </Paper>
  )
}

const UserLayout = ({ children }) => {
  const [light, setLight] = React.useState(true);

  return (
    <>
      <ThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <AppBar position="sticky" sx={{ background: '#265073', marginBottom: '20px', height: '10%' }}>
          <Grid container height='10%' width="100%" spacing={2}>
              {/* Title/Home Link */}
              <Grid item alignContent='center' alignItems='center' alignSelf='center' xs>
                <TitleLink />
              </Grid>

              {/* Navigation Buttons */}
              <Grid item alignContent='center' alignItems='center' alignSelf='center' xs="8">
                <NavButtons />
              </Grid>

              {/* Theme Change Button */}
              <Grid item alignContent='center' alignItems='center' alignSelf='center' xs>
                <IconButton data-testid="themeButton" sx={{ width: '2%' }} onClick={() => setLight((prev) => !prev)}>
                  {light === true
                    ? <LightMode style={{fill: "#F1FADA"}} />
                    : <DarkMode style={{fill: "#F1FADA"}} />}
                </IconButton>
              </Grid>

              { /* Add login, logoff, and sign up buttons */ }

          </Grid>
        </AppBar>

        <main>{children}</main>

        {/* Static Footer */}
        {/* <Footer /> */}

      </ThemeProvider>
    </>
  )
}

export default UserLayout