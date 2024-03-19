import { Link, routes } from '@redwoodjs/router'
import { useTheme } from '@mui/material/styles'

const POSTS_PER_PAGE = 10

const Pagination = ({ count }) => {
  const theme = useTheme();
  const items = []

  for (let i = 0; i < Math.ceil(count / POSTS_PER_PAGE); i++) {
    items.push(
      // <li key={i}>
        <Link underline='none' to={routes.history({ page: i + 1 })} sx={{ color: theme.palette.text.secondary }}>
          {i + 1}
        </Link>
      // </li>
    )
  }

  return (
    <>
      {/* <h2>Pagination</h2> */}
      {items}
    </>
  )
}

export default Pagination