import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { auth0 } from 'src/auth'
import { useEffect, useState } from 'react'

import TranslationsCell from 'src/components/TranslationsCell'

const HistoryPage = () => {
  const theme = useTheme();
  const [userId, setUserId] = React.useState()
  const regex = /.+\|(.*)/;

  useEffect(()=>{
    auth0.getUser().then(user => {
      setUserId(user.sub.match(regex)[1]);
    })
  },[])

  // useEffect(()=>{
  //   console.log('USERID changed');
  // },[userId])

  return (
    <>
      <Metadata title="History" description="History page" />

      <Box minHeight='100vh' width='100%' display="flex" flexDirection='column' alignItems="center">

        <Typography data-testid='title' variant='h2' component='span' align='center' style={{ padding: '15px', width: '65%', borderRadius: '20px' , color: theme.palette.text.secondary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>
          Translation History
        </Typography>

        <TranslationsCell uid={userId} />
      </Box>
    </>
  )
}

export default HistoryPage