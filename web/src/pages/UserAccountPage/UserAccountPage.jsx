import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'

import { Button, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { useAuth, auth0 } from 'src/auth'

const UserAccountPage = () => {

  const UPDATE_USERNAME_MUTATION = gql`
    mutation UpdateUsername($user_id: String!, $nickname: String!, $token: String!) {
      updateUsername(user_id: $user_id, nickname: $nickname, token: $token)
    }
  `

  const [updateUsername] = useMutation(UPDATE_USERNAME_MUTATION);


  const theme = useTheme()
  const [deleteAccount, setDeleteAccount] = React.useState(false)

  const [username, setUsername] = React.useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).nickname : '')
  const [usernameError, setUsernameError] = React.useState({error: false, helperText: ''})
  const [usernameUpdated, setUsernameUpdated] = React.useState(false)

  let email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : ''

  const inputStyle = {style:{color: theme.palette.text.secondary, fontSize: '18px', fontStyle: 'normal', fontWeight: '600', margin: '1%'}}

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
  }

  const updateData = async () => {
    let token = await auth0.getTokenSilently()
    try {
      const {data} = await updateUsername({
        variables: { user_id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).sub : '', nickname: username, token: token }
      })

      const response = JSON.parse(data.updateUsername)

      if (response.statusCode === 500) {
        throw new Error('Failed to update user')
      }

      token = await auth0.getTokenSilently()
      auth0.getUser().then(user => {
        delete user.updated_at
        delete user.email_verified
        user.nickname = username
        localStorage.setItem('user', JSON.stringify(user))
      })

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <>
      <Typography variant='h2' component='h2' align='left' style={{color:theme.palette.text.secondary, fontSize: '36px', fontStyle: 'normal', fontWeight: '600', margin: '1%'}}>Account</Typography>

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

          <Button variant="contained" style={{backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main, margin: '1%', display: 'block'}} onClick={updateData} disabled={usernameError.error}>Save</Button>

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
