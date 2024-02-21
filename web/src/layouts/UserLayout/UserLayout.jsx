import { routes } from '@redwoodjs/router'
import { Link } from '@mui/material';

const UserLayout = ({ children }) => {
  return (
    <>
      <header>
        <h1>
          <Link href={routes.home()} underline="none">
            CodeGoat
          </Link>
        </h1>
      </header>
      <main>{children}</main>
    </>
  )
}

export default UserLayout
