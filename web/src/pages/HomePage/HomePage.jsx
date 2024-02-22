import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated } = useAuth()


  return (
    <>
      <p>{JSON.stringify({ isAuthenticated })}</p>
    </>
  )
}

export default HomePage
