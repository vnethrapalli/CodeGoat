import { Link, routes, navigate, useParams } from '@redwoodjs/router'
import { useTheme } from '@mui/material/styles'
import { Box, Typography, Tooltip, Button } from '@mui/material'

const POSTS_PER_PAGE = 10

const Pagination = ({ count }) => {
  const theme = useTheme();
  let { page } = useParams();
  const items = []

  for (let i = 0; i < Math.ceil(count / POSTS_PER_PAGE); i++) {
    let toolTipString = "Go to Page " + (i + 1);
    let backgroundCol, textCol;

    if (!page) {
      page = 1;
    }
    if ((i + 1) == page){
      backgroundCol = theme.palette.text.secondary;
      textCol = theme.palette.background.default;
    }else {
      backgroundCol = theme.palette.background.default;
      textCol = theme.palette.text.secondary;
    }

    items.push(
      <Tooltip title={toolTipString}>
        <Button variant="text" onClick={() => (navigate(routes.history({ page: i + 1 })))}
        sx={{
          width: '10px',
          backgroundColor: backgroundCol,
          color: textCol,
          '&:hover': {
            backgroundColor: backgroundCol,
            color: textCol,
          },
          }}>
          <Typography data-testid="titleLink" component="span"
            sx={{
              // color: theme.palette.text.secondary,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 18,
            }}
          >
          {i + 1}
          </Typography>
        </Button>
      </Tooltip>
    )
  }

  return (
    <Box sx={{ display: 'flex', marginTop: '10px' }}>
      {items}
    </Box>
  )
}

export default Pagination