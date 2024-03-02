import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material';

const StatusPage = () => {
  const theme = useTheme();

  return (
    <>
      <Metadata title="Status" description="Status page" />


      <Typography component='h2' sx={{ color: theme.palette.text.secondary }}>StatusPage</Typography>
      {/* <p>
        Find me in <code>./web/src/pages/StatusPage/StatusPage.jsx</code>
      </p>
      <p>
        My default route is named <code>status</code>, link to me with `
        <Link to={routes.status()}>Status</Link>`
      </p> */}
    </>
  )
}

export default StatusPage
