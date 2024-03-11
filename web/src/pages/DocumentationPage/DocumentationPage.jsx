import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useTheme } from '@mui/material/styles'
import { Typography } from '@mui/material';

const DocumentationPage = () => {
  const theme = useTheme();
  
  return (
    <>
      <Metadata title="Documentation" description="Documentation page" />

      <Typography variant='h2' component='h2' align='center' style={{color: theme.palette.text.secondary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>Documentation</Typography>
      {
        <p>Documentation Page!</p>
      }
    </>
  )
}

export default DocumentationPage
