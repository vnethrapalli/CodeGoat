import { routes } from '@redwoodjs/router'

import { AppBar, Link, Toolbar, Box, Button, Container, Typography} from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

const UserLayout = ({ children }) => {
  const [light, setLight] = React.useState(true);

  return (
    <>
      <ThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <AppBar position="sticky" sx={{ background: '#265073', marginBottom: '20px', height: '10%' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  // fontFamily: 'monospace',
                  fontWeight: 700,
                  // letterSpacing: '.3rem',
                  color: "#F1FADA",
                  textDecoration: 'none',
                  marginLeft: "25px",
                }}
              >
                <Link href={routes.home()} underline="none">
                  CodeGoat
                </Link>
              </Typography>

              {/* <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Link href={routes.home()} underline="none" sx={{ marginLeft: "25px", color: "#F1FADA" }}>
                  CodeGoat
                </Link>
              </Typography> */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Link href={routes.translate()} underline="none" sx={{ marginLeft: "25px", color: "#F1FADA", fontWeight: '300' }}>
                  <Button
                    key="Translate"
                    variant="text"
                    sx={{ my: 2, color: "#F1FADA", display: 'block' }}
                  >
                    Translate
                  </Button>
                </Link>

                <Link href={routes.status()} underline="none" sx={{ marginLeft: "5px", color: "#F1FADA", fontWeight: '300' }}>
                  <Button
                    key="Status"
                    variant="text"
                    sx={{ my: 2, color: "#F1FADA", display: 'block' }}
                  >
                    GPT-3 Status
                  </Button>
                </Link>

                <Link href={routes.feedback()} underline="none" sx={{ marginLeft: "5px", color: "#F1FADA", fontWeight: '300' }}>
                  <Button
                    key="Feedback"
                    variant="text"
                    sx={{ my: 2, color: "#F1FADA", display: 'block' }}
                  >
                    Feedback
                  </Button>
                </Link>
              </Box>
              <IconButton data-testid="themeButton" sx={{ ml: 1, width: '2%' }} onClick={() => setLight((prev) => !prev)}>
                {light === true ? <LightMode style={{fill: "#F1FADA"}} /> : <DarkMode style={{fill: "#F1FADA"}} />}
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>


        {/* <AppBar position="sticky" sx={{ background: '#265073', marginBottom: '20px', height: '10%' }}>
          <h1>
            <Link href={routes.home()} underline="none" sx={{ marginLeft: "25px", color: "#F1FADA" }}>
              CodeGoat
            </Link>
          </h1>

          <Toolbar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Link href={routes.home()} underline="none" sx={{ marginLeft: "25px", color: "#F1FADA", fontWeight: '300' }}>
                Translate
              </Link>

              <Link href={routes.status()} underline="none" sx={{ marginLeft: "5px", color: "#F1FADA", fontWeight: '300' }}>
                GPT-3 Status
              </Link>

              <Link href={routes.feedback()} underline="none" sx={{ marginLeft: "5px", color: "#F1FADA", fontWeight: '300' }}>
                Feedback
              </Link>
            </Box>
          </Toolbar>

          <IconButton data-testid="themeButton" sx={{ ml: 1, width: '2%' }} onClick={() => setLight((prev) => !prev)}>
            {light === true ? <LightMode /> : <DarkMode />}
          </IconButton>
        </AppBar> */}

        <main>{children}</main>

        <Box position='static' sx={{ background: '#265073', marginTop: '10px', height: '5%' }}></Box>

      </ThemeProvider>
    </>
  )
}

export default UserLayout