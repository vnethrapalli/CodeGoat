import { routes } from '@redwoodjs/router'

import { AppBar, Link } from '@mui/material';
import { deepmerge } from "@mui/utils";
import CssBaseline from "@mui/material/CssBaseline";
import { shouldSkipGeneratingVar as muiShouldSkipGeneratingVar, Experimental_CssVarsProvider as CssVarsProvider, ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import { extendTheme as extendJoyTheme, shouldSkipGeneratingVar as joyShouldSkipGeneratingVar, } from "@mui/joy/styles";

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
    },
  },

  variants: {},
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
  },

  variants: {},
});

const joyTheme = extendJoyTheme({ cssVarPrefix: "mui" });

const UserLayout = ({ children }) => {
  const [light, setLight] = React.useState(true);

  return (
    <>
      <CssVarsProvider theme={light ? deepmerge(joyTheme, themeLight) : deepmerge(joyTheme, themeDark)} shouldSkipGeneratingVar={keys => muiShouldSkipGeneratingVar(keys) || joyShouldSkipGeneratingVar(keys)}>
        {/* <CssBaseline /> */}
        <AppBar position="sticky" sx={{ background: '#265073', marginBottom: '20px', height: '10%' }}>
          <h1>
            <Link href={routes.home()} underline="none" sx={{ marginLeft: "25px", color: "#F1FADA" }}>
              CodeGoat
            </Link>
          </h1>

          <IconButton data-testid="themeButton" sx={{ ml: 1, width: '2%' }} onClick={() => setLight((prev) => !prev)}>
            {light === true ? <LightMode /> : <DarkMode />}
          </IconButton>
        </AppBar>

        <main>{children}</main>
      </CssVarsProvider>
    </>
  )
}

export default UserLayout