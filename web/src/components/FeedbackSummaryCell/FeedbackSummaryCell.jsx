import { Typography, Box, Rating, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const QUERY = gql`
  query FindFeedbackSummaryQuery {
    feedbackSummary: feedbackStats {
      count
      submissionPageAvg
      outputPageAvg
      translationAccuracyAvg
      gptAvailabilityAvg
      experienceAvg
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ feedbackSummary }) => {
  const theme = useTheme();
  console.log(JSON.stringify(feedbackSummary))

  return (
    <>
      {feedbackSummary.count > 0 &&
        <Box mt={5} width='70%'>
          <Typography data-testid='feedback-summary-header' mb={3} align='center' sx={{ color: theme.palette.text.secondary, fontSize: '30px', fontStyle: 'normal', fontWeight: '500'}}>
            Hear {feedbackSummary.count} Rating{feedbackSummary.count == 1 ? '' : 's'} From Our Users
          </Typography>
          <Grid container textAlign='center' spacing={0}>
            <Grid item xs={4}>
              <Typography data-testid='submission-page-header' sx={{ color: theme.palette.text.secondary, fontSize: '14px', fontStyle: 'normal', fontWeight: '500'}}>
                Submission Page ({feedbackSummary.submissionPageAvg})
              </Typography>
              <Rating readOnly data-testid='submission-page-stars' alight='right' precision={0.1} defaultValue={feedbackSummary.submissionPageAvg} />
            </Grid>

            <Grid item xs={4}>
              <Typography data-testid='output-page-header' sx={{ color: theme.palette.text.secondary, fontSize: '14px', fontStyle: 'normal', fontWeight: '500'}}>
                Output Page ({feedbackSummary.outputPageAvg})
              </Typography>
              <Rating readOnly data-testid='output-page-stars' alight='right' precision={0.1} defaultValue={feedbackSummary.outputPageAvg} />
            </Grid>

            <Grid item xs={4}>
              <Typography data-testid='accuracy-header' sx={{ color: theme.palette.text.secondary, fontSize: '14px', fontStyle: 'normal', fontWeight: '500'}}>
                Translation Accuracy ({feedbackSummary.translationAccuracyAvg})
              </Typography>
              <Rating readOnly data-testid='accuracy-stars' alight='right' precision={0.1} defaultValue={feedbackSummary.translationAccuracyAvg} />
            </Grid>
          </Grid>

          <Grid container textAlign='center'>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              <Typography data-testid='gpt-availability-header' sx={{ color: theme.palette.text.secondary, fontSize: '14px', fontStyle: 'normal', fontWeight: '500'}}>
                GPT Availability ({feedbackSummary.gptAvailabilityAvg})
              </Typography>
              <Rating readOnly data-testid='gpt-availability-stars' alight='right' precision={0.1} defaultValue={feedbackSummary.gptAvailabilityAvg} />
            </Grid>

            <Grid item xs={4}>
              <Typography data-testid='experience-header' sx={{ color: theme.palette.text.secondary, fontSize: '14px', fontStyle: 'normal', fontWeight: '500'}}>
                Overall Experience ({feedbackSummary.experienceAvg})
              </Typography>
              <Rating readOnly data-testid='experience-stars' alight='right' precision={0.1} defaultValue={feedbackSummary.experienceAvg} />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>

        </Box>
      }
    </>
  );
}
