import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material';

const DocumentationPage = () => {
  const theme = useTheme();
  
  return (
    <>
      <Metadata title="Documentation" description="Documentation page" />

      <Typography component='h2' sx={{ color: theme.palette.text.secondary }}>DocumentationPage</Typography>
      {/* <p>
        Find me in{' '}
        <code>./web/src/pages/DocumentationPage/DocumentationPage.jsx</code>
      </p>
      <p>
        My default route is named <code>documentation</code>, link to me with `
        <Link to={routes.documentation()}>Documentation</Link>`
      </p> */}
    </>
  )
}

export default DocumentationPage
