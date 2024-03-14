import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { Button, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { useAuth, auth0 } from 'src/auth'
import { set } from '@redwoodjs/forms'


const UserAccountPage = () => {
  const theme = useTheme()
  const [deleteAccount, setDeleteAccount] = React.useState(false)
  const { userMetadata } = useAuth()

  const [username, setUsername] = React.useState(userMetadata.nickname)
  const [usernameError, setUsernameError] = React.useState({error: false, helperText: ''})

  let email = userMetadata.email

  const inputStyle = {style:{color: "#344955", fontSize: '18px', fontStyle: 'normal', fontWeight: '600', margin: '1%'}}

  const handleUsernameChange = (e) => {
    let value = e.target.value
    if (value.length < 5) {
      setUsernameError({error: true, helperText: 'Username must be at least 5 characters'})
      return
    }
    if (value.length > 12) {
      setUsernameError({error: true, helperText: 'Username must be less than 12 characters'})
      return
    }
    if (!value.match(/^[a-zA-Z]+[a-zA-Z0-9_]*$/)) {
      setUsernameError({error: true, helperText: 'Username must start with a letter and must contain only letters, numbers, and underscores'})
      return
    }
    setUsername(value)
    setUsernameError({error: false, helperText: ''})

    console.log(usernameError)
  }

  return (
    <>
      <Typography variant='h2' component='h2' align='left' style={{color: "#344955", fontSize: '36px', fontStyle: 'normal', fontWeight: '600', margin: '1%'}}>Account</Typography>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField id="outlined-basic" label="Email" variant="outlined" inputProps={{...inputStyle, readOnly: true}} value={email} style={{margin: '1%', display: 'block'}}/>
          <TextField id="outlined-basic" label="Name" variant="outlined" inputProps={{...inputStyle}} defaultValue={username} style={{margin: '1%', display: 'block'}} onChange={handleUsernameChange} error={usernameError.error} helperText={usernameError.helperText}/>

          <Button variant="contained" style={{backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, margin: '1%', display: 'block'}} onClick={() => alert(username)}>Save</Button>

          <Button variant="contained" style={{backgroundColor: 'red', color: theme.palette.primary.main, margin: '1%', display: 'block'}} onClick={() => {
            setDeleteAccount(!deleteAccount)
            alert('Delete Account')
            }}>Delete Account</Button>
          <TextField id="outlined-basic" label="Delete Account" variant="outlined" inputProps={{...inputStyle}} helperText='Type your email to delete account' style={{margin: '1%', display: deleteAccount ? 'block' : 'none', width: '50%'}}/>

        </div>
      </Box>
    </>
  )
}

export default UserAccountPage
