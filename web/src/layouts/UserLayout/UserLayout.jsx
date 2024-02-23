import { routes } from '@redwoodjs/router'

import { AppBar, Link } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@emotion/react';

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
      primary: "#000000"
    }
  }
});

const themeDark = createTheme({
  palette: {
    primary: {
      main: "#F1FADA"
    },
    secondary: {
      main: "#FFFFFF"
    },
    background: {
      default: "#565656"
    },
    text: {
      primary: "#FFFFFF"
    }
  }
});

const UserLayout = ({ children }) => {
  const [light, setLight] = React.useState(true);
  const theme = useTheme();

  return (
    <>
      <ThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <AppBar position="static" sx={{ background: '#265073', marginBottom: '20px', height: '10%' }}>
          <h1>
            <Link href={routes.home()} underline="none" sx={{ marginLeft: "10px", color: "#F1FADA" }}>
              CodeGoat
            </Link>
          </h1>

          <IconButton sx={{ ml: 1, width: '3%' }} onClick={() => setLight((prev) => !prev)}>
            {light === true ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </AppBar>

        <main>{children}</main>
      </ThemeProvider>
    </>
  )
}

export default UserLayout
