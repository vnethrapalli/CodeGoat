import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'

import { Button, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { useAuth, auth0 } from 'src/auth'
import { Toaster, toast } from '@redwoodjs/web/toast'
import {Modal} from '@mui/material'
import {IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const UserAccountPage = () => {

  const UPDATE_USERNAME_MUTATION = gql`
    mutation UpdateUsername($user_id: String!, $nickname: String!, $token: String!) {
      updateUsername(user_id: $user_id, nickname: $nickname, token: $token)
    }
  `
  const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccount($user_id: String!, $token: String!) {
    deleteAccount(user_id: $user_id, token: $token)
  }
`

  const [updateUsername] = useMutation(UPDATE_USERNAME_MUTATION);
  const [deleteAccount] = useMutation(DELETE_ACCOUNT_MUTATION);

  const { logOut } = useAuth()


  const theme = useTheme()
  const [isDeleteAccount, setIsDeleteAccount] = React.useState(false)

  const [username, setUsername] = React.useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).nickname : '')
  const [usernameError, setUsernameError] = React.useState({error: false, helperText: ''})

  let email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : ''

  const inputStyle = {style:{color: theme.palette.text.secondary, fontSize: '18px', fontStyle: 'normal', fontWeight: '600', margin: '1%'}}
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: theme.palette.secondary.main,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    height:"30%",
    textAlign: 'center'
  };
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
        throw new Error('Failed to update username')
      }

      token = await auth0.getTokenSilently()
      auth0.getUser().then(user => {
        delete user.updated_at
        delete user.email_verified
        user.nickname = username
        localStorage.setItem('user', JSON.stringify(user))
      })

      toast.success(response.message, {duration: 2500})

    } catch (error) {
      toast.error(error.message, {duration: 2500})
    }

  }

  const onDeleteAccount = async () => {


    let token = await auth0.getTokenSilently()
    try {
      const {data} = await deleteAccount({
        variables: { user_id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).sub : '', token: token }
      })

      const response = JSON.parse(data.deleteAccount)

      console.log(response)

      if (response.statusCode === 500) {
        throw new Error('Failed to delete account')
      }

      toast.success(response.message, {duration: 1500})
      setTimeout(() => {
        logOut().then(() => {
          localStorage.removeItem('user')
        })
        navigate(routes.home())
      }, 1500)

    } catch (error) {
      console.log(error)
      toast.error(error.message, {duration: 2500})
    }
  }

  return (
    <>
      <Toaster />
      <Typography variant='h2' component='h2' align='left' style={{color:theme.palette.text.secondary, fontSize: '36px', fontStyle: 'normal', fontWeight: '600', margin: '1%', marginBottom: '2%'}}>Account</Typography>

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

          <Button variant="contained" style={{backgroundColor: 'red', color: theme.palette.primary.main, margin: '1%', display: 'block'}} onClick={()=> {setIsDeleteAccount(!isDeleteAccount)}}>Delete Account</Button>
          <Modal
            open={isDeleteAccount}
            onClose={() => setIsDeleteAccount(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:theme.palette.primary.main, fontSize: '30px', fontStyle: 'normal', fontWeight: '600', margin: '1%', display: 'block'}}>
                Do you want to permanently delete your account?
              </Typography>
              <Button variant="contained" style={{backgroundColor: 'red', color: theme.palette.primary.main, margin: '', display: 'inline-block'}} onClick={onDeleteAccount}>Yes, Delete Account</Button>
              <IconButton onClick={() => setIsDeleteAccount(false)} style={{position: 'absolute', top: '10px', right: '10px'}}>
                  <CloseIcon />
              </IconButton>
            </Box>
          </Modal>

        </div>
      </Box>
    </>
  )
}

export default UserAccountPage
