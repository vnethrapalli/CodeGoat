import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

<<<<<<< HEAD
const StatusPage = () => {
=======
import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material';

const StatusPage = () => {
  const theme = useTheme();

>>>>>>> 0d31ac4e8a62b6c313079e14a7bd86b084649286
  return (
    <>
      <Metadata title="Status" description="Status page" />

<<<<<<< HEAD
      <h1>StatusPage</h1>
      <p>
=======

      <Typography component='h2' sx={{ color: theme.palette.text.secondary }}>StatusPage</Typography>
      {/* <p>
>>>>>>> 0d31ac4e8a62b6c313079e14a7bd86b084649286
        Find me in <code>./web/src/pages/StatusPage/StatusPage.jsx</code>
      </p>
      <p>
        My default route is named <code>status</code>, link to me with `
        <Link to={routes.status()}>Status</Link>`
<<<<<<< HEAD
      </p>
=======
      </p> */}
>>>>>>> 0d31ac4e8a62b6c313079e14a7bd86b084649286
    </>
  )
}

export default StatusPage
