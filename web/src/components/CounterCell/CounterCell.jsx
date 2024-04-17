import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export const QUERY = gql`
  query FindCounterQuery {
    counter: translationCount {
      count
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ counter }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        data-testid="counter-box"
        display="flex"
        justifyContent='center'
        alignItems='center'
        sx={{
          background: `url('Images/speechbubble.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          width: '42vw',
          height: '20vh'
        }}
      >
        <Typography
          data-testid='counter'
          display='flex'
          justifyContent='center'
          alignItems='center'
          style={{
            width: '100%',
            color: 'black',
            fontSize: '5vh',
            fontStyle: 'normal',
            fontWeight: '400',
            paddingBottom: '3vh'
          }}
        >
          {counter.count} translations and counting!
        </Typography>
      </Box>
      <img
        data-testid='goat-image'
        src="Images/goat_no_bubble.png"
        alt="CodeGoat Icon"
        style={{
          width: '300px',
          height: '250px',
          objectFit: 'contain',
          objectPosition: 'center'
        }}
      />
    </>
  );
}
