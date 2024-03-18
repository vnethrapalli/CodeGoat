
export const updateUser = async ({ user_id, data, token }) => {
  return JSON.stringify({statusCode: 200, user_id, data})
}
