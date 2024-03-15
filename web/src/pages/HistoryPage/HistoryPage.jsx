import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

import TranslationsCell from 'src/components/TranslationsCell'

const HistoryPage = () => {
  const theme = useTheme();

  return (
    <>
      <Metadata title="History" description="History page" />

      <Box height='100vh' width='100%' display="flex" flexDirection='column' justifyContent="center" alignItems="center">

        <Typography data-testid='title' variant='h2' component='span' align='center' style={{ padding: '15px', width: '65%', borderRadius: '20px' , color: theme.palette.text.secondary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>
          Translation History
        </Typography>

        <TranslationsCell />

      </Box>
    </>
  )
}

export default HistoryPage
