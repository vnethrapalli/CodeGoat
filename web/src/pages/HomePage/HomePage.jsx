import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated, signUp, logIn, logOut, userMetadata, loading } = useAuth()

  if(loading) {
    return null
  }

  return (
    <>
      {/* MetaTags, h1, paragraphs, etc. */}
      <p>{JSON.stringify({ isAuthenticated })}</p>
      { isAuthenticated && <p>Email: {userMetadata.email}</p>}
      <button onClick={signUp}>sign up</button>
      <button onClick={logIn}>Log In</button>
      <button onClick={logOut}>Log Out</button>
    </>
  )
}

export default HomePage
