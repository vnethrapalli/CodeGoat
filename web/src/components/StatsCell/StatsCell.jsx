import { Box, Typography, Divider, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LineChart } from '@mui/x-charts/LineChart';

// export const beforeQuery = (props) => {
//   return {
//     variables: props,
//     fetchPolicy: 'cache-and-network'
//    }
// }

export const QUERY = gql`
  query StatsQuery($uid: String!) {
    stats: translationStats(uid: $uid) {
      count
      favPair
      favPairFreq
      weekDates
      weekRequests
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ stats }) => {
  const theme = useTheme();

  /* convert date string to date object */
  const weekDates = stats.weekDates.map((val) => {
    console.log(val)
    return new Date(val);
  });


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <>
      <Box sx={{ width: "70%", marginBottom: '10px', marginTop: '10px' }}>
        <Typography data-testid='your-stats-header' align='left' sx={{ color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '500', marginBottom: '10px'}}>
          Your Stats
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography data-testid='user-num-translations' align='left' sx={{ color: theme.palette.text.secondary, fontSize: '12px', fontStyle: 'normal', fontWeight: '500', marginBottom: '10px'}}>
              {stats.count} total translations
            </Typography>

            <Typography data-testid='user-mostfreq-pair' align='left' sx={{ color: theme.palette.text.secondary, fontSize: '12px', fontStyle: 'normal', fontWeight: '500', marginBottom: '10px'}}>
              translated from {stats.favPair[0]} to {stats.favPair[1]} a whopping {stats.favPairFreq} times!
            </Typography>
          </Grid>

          <Grid item xs={6} sx={{ border: 1}}>
            <LineChart
              xAxis={[
                {
                  scaleType: 'time',
                  data: weekDates,
                  valueFormatter: (dt, context) =>
                    `${months[dt.getMonth()]} ${dt.getDate()}`
                }
              ]}
              series={[
                {
                  data: stats.weekRequests,
                },
              ]}
              height={300}
            />
          </Grid>
        </Grid>

        <Divider aria-hidden="true" sx={{ bgcolor: theme.palette.text.secondary, light: false, opacity: 1, borderBottomWidth: 1 }}/>
      </Box>
    </>
  )
}
