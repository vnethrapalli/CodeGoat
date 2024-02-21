import { routes } from '@redwoodjs/router'

import { Link } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const themeLight = createTheme({
  palette: {
    background: {
      default: "#F1FADA"
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#565656"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

const UserLayout = ({ children }) => {
  const [light, setLight] = React.useState(true);

  return (
    <>
      <ThemeProvider theme={light ? themeLight : themeDark}>
        <CssBaseline />
        <header className='relative flex'>
          <h1>
            <Link href={routes.home()} underline="none">
              CodeGoat
            </Link>
          </h1>

          <nav>
            <IconButton sx={{ ml: 1 }} onClick={() => setLight((prev) => !prev)}>
              {light === true ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </nav>
        </header>
      </ThemeProvider>
      <main>{children}</main>
    </>
  )
}

export default UserLayout
