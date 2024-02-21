import { Link, routes } from '@redwoodjs/router'

const UserLayout = ({ children }) => {
  return (
    <>
      <header>
        <h1>
          <Link to={routes.home()}>
            CodeGoat
          </Link>
        </h1>
      </header>
      <main>{children}</main>
    </>
  )
}

export default UserLayout
