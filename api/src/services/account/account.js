import { UsersManager } from 'auth0'
import axios from 'axios'

export const updateUsername = async ({ user_id, nickname, token }) => {

  const token_options = {
    method: 'POST',
    url: 'https://' + process.env.AUTH0_DOMAIN+ '/oauth/token',
    headers: {'content-type': 'application/json'},
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTHO_MANAGEMENT_CLIENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE
    }
  };

  let access_token = null
  let fetchError = null

  await axios.request(token_options).then((response) => {
    access_token = response.data.access_token
  }).catch(function (error) {
    fetchError = error
  });

  if (fetchError) {
    console.error('Failed to fetch access token:', fetchError)
    return JSON.stringify({ statusCode: 500, message: "Failed to update username" })
  }

  const userUpdateOptions = {
    method: 'PATCH',
    url: process.env.AUTH0_AUDIENCE + 'users/' + user_id,
    headers: {'content-type': 'application/json', 'accept': 'application/json','authorization': 'Bearer ' + access_token},
    data: {
      nickname: nickname
    }
  };

  let userUpdateError = null
  let userUpdateResponse = null

  await axios.request(userUpdateOptions).then((response) => {
    userUpdateResponse = response.data
  }).catch(function (error) {
    userUpdateError = error
  });

  if (userUpdateError) {
    console.error('Failed to update user:', userUpdateError)
    return JSON.stringify({ statusCode: 500, message: "Failed to update username" })
  }

  if (userUpdateResponse) {
    console.log('User updated:', userUpdateResponse)
    return JSON.stringify({ statusCode: 200, message: "Username updated successfully" })
  }

}
