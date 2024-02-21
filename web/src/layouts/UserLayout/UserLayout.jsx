import { routes } from '@redwoodjs/router'
import { Link } from '@mui/material';

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

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
        <header>
          <h1>
            <Link href={routes.home()} underline="none">
              CodeGoat
            </Link>
          </h1>

          <nav>
            <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button>
          </nav>
        </header>
      </ThemeProvider>
      <main>{children}</main>
    </>
  )
}

export default UserLayout
