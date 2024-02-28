import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Form, Submit, TextField, TextAreaField } from '@redwoodjs/forms'
import { Button, Box, Rating, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LensIcon from '@mui/icons-material/Lens';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/material/styles';
import { alpha } from "@mui/material";


// For the sql stuff
const CREATE_FEEDBACK = gql`
  mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
    }
  }
`
const FeedbackPage = () => {
  const theme = useTheme();
  // This is for getting the correct color to display when hovered / unhovered
  // Alpha controls the transparency; prevents needing another color added to the UserLayout palette
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: alpha(theme.palette.secondary.main == "#344955" ? "#3f6b79" : theme.palette.secondary.main, 0.6),
    },
    '& .MuiRating-iconHover': {
      color: alpha(theme.palette.secondary.main, 1),
    },
  });
  
  const [create] = useMutation(CREATE_FEEDBACK)

  // Gets the input into the database
  const onSubmit = (data) => {
    data.preventDefault();
    console.log(sub, com)
    create({ variables: { input: {"submissionPage":sub, "outputPage":out, "translationAccuracy":acc, "gptAvailability":gpt, "experience":exp, "comments":com} } })
  }
  // By default, hover is not on
  const [hover, setHover] = React.useState(-1);

  // Set the variables to 0 / empty initially
  const [sub, setSub] = React.useState(0);
  const [out, setOut] = React.useState(0);
  const [acc, setAcc] = React.useState(0);
  const [gpt, setGPT] = React.useState(0);
  const [exp, setExp] = React.useState(0);
  const [com, setCom] = React.useState("");

  return (
    <>
      <Metadata title="Feedback" description="Feedback page" />
      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
      <Typography variant='h2' component='h2' align='center' style={{color: (theme.palette.secondary.main == "#344955" ? theme.palette.text.primary : "#344955"), fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>Feedback</Typography>
        <Form onSubmit={onSubmit}>
          <Typography variant='h5' component='h5' align='center' style={{color: (theme.palette.secondary.main == "#344955" ? theme.palette.text.primary : "#344955")}}>Submission Page</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
            }}
          >
            <StyledRating
              name="submissionPage"
              value={sub}
              precision={1}
              max={10}
              onChange={(event, newValue) => {
                setSub(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              sx={{
                fontSize: "5rem"
              }}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />      
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: (theme.palette.secondary.main == "#344955" ? theme.palette.text.primary : "#344955")}}>Output Page</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
            }}
          >
            <StyledRating
              name="outputPage"
              value={out}
              precision={1}
              max={10}
              onChange={(event, newValue) => {
                setOut(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              sx={{
                fontSize: "5rem"
              }}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />       
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: (theme.palette.secondary.main == "#344955" ? theme.palette.text.primary : "#344955")}}>Translation Accuracy</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
            }}
          >
            <StyledRating
              name="translationAccuracy"
              value={acc}
              precision={1}
              max={10}
              onChange={(event, newValue) => {
                setAcc(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              sx={{
                fontSize: "5rem"
              }}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />     
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: (theme.palette.secondary.main == "#344955" ? theme.palette.text.primary : "#344955")}}>GPT-3 Availability</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
            }}
          >
            <StyledRating
              name="gptAvailability"
              value={gpt}
              precision={1}
              max={10}
              onChange={(event, newValue) => {
                setGPT(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              sx={{
                fontSize: "5rem"
              }}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />     
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: (theme.palette.secondary.main == "#344955" ? theme.palette.text.primary : "#344955")}}>Overall Experience</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
            }}
          >
            <StyledRating
              name="experience"
              value={exp}
              precision={1}
              max={10}
              onChange={(event, newValue) => {
                setExp(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              sx={{
                fontSize: "5rem"
              }}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />    
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: (theme.palette.secondary.main == "#344955" ? theme.palette.text.primary : "#344955")}}>Additional Comments</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              size: "lg",
            }}
          >
            <TextareaAutosize 
              name="comments"
              value={com}
              minRows={5}
              placeholder="Type here."
              onChange={(event) => {
                setCom(event.target.value);
              }}
            ></TextareaAutosize>
          </Box>
          

          <Button type="submit" sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }} style={{color: (theme.palette.secondary.main == "#344955" ? theme.palette.text.primary : "#344955")}} onClick={onSubmit}>Submit</Button>
        </Form>
      </Box>
    </>
  )
}

export default FeedbackPage
