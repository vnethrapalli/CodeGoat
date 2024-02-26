import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Form, Submit, TextField, TextAreaField } from '@redwoodjs/forms'
import { Button, Box, Rating, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LensIcon from '@mui/icons-material/Lens';
import Textarea from '@mui/joy/Textarea';

// This is for getting the correct color to display when hovered / unhovered
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#9AD0C2',
  },
  '& .MuiRating-iconHover': {
    color: '#2D9596',
  },
});

const CREATE_FEEDBACK = gql`
  mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
    }
  }
`
const FeedbackPage = () => {
  const [create] = useMutation(CREATE_FEEDBACK)

  const onSubmit = (data) => {
    data.preventDefault();
    console.log(sub, out, acc, gpt, exp, com)
    create({ variables: { input: {"submissionPage":sub, "outputPage":out, "translationAccuracy":acc, "gptAvailability":gpt, "experience":exp, "comments":com} } })
  }
  // By default, hover is not on
  const [hover, setHover] = React.useState(-1);
  // By default, the stars will be unfilled until hovered / selected
  const [sub, setSub] = React.useState(0);
  const [out, setOut] = React.useState(0);
  const [acc, setAcc] = React.useState(0);
  const [gpt, setGPT] = React.useState(0);
  const [exp, setExp] = React.useState(0);
  const [com, setCom] = React.useState("");

  return (
    <>
      <Metadata title="Feedback" description="Feedback page" />
      <h1>Feedback</h1>
      <Form onSubmit={onSubmit}>
        <Typography component="legend">Submission Page</Typography>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            fontSize: "1.5rem",
          }}
        >
          <StyledRating
            name="submissionPage"
            value={sub}
            precision={1}
            onChange={(event, newValue) => {
              setSub(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            sx={{
              fontSize: "4rem"
            }}
            icon={<LensIcon fontSize="inherit" />}
            emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />      
        </Box>

        <Typography component="legend">Output Page</Typography>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            fontSize: "1.5rem",
          }}
        >
          <StyledRating
            name="outputPage"
            value={out}
            precision={1}
            onChange={(event, newValue) => {
              setOut(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            sx={{
              fontSize: "4rem"
            }}
            icon={<LensIcon fontSize="inherit" />}
            emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />       
        </Box>

        <Typography component="legend">Translation Accuracy</Typography>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            fontSize: "1.5rem",
          }}
        >
          <StyledRating
            name="translationAccuracy"
            value={acc}
            precision={1}
            onChange={(event, newValue) => {
              setAcc(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            sx={{
              fontSize: "4rem"
            }}
            icon={<LensIcon fontSize="inherit" />}
            emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />     
        </Box>

        <Typography component="legend">GPT-3 Availability</Typography>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            fontSize: "1.5rem",
          }}
        >
          <StyledRating
            name="gptAvailability"
            value={gpt}
            precision={1}
            onChange={(event, newValue) => {
              setGPT(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            sx={{
              fontSize: "4rem"
            }}
            icon={<LensIcon fontSize="inherit" />}
            emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />     
        </Box>

        <Typography component="legend">Overall Experience</Typography>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
            fontSize: "1.5rem",
          }}
        >
          <StyledRating
            name="experience"
            value={exp}
            precision={1}
            onChange={(event, newValue) => {
              setExp(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            sx={{
              fontSize: "4rem"
            }}
            icon={<LensIcon fontSize="inherit" />}
            emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />    
        </Box>

        <Typography component="legend">Additional Comments</Typography>
        <Textarea
          name="comments"
          value={com}
          minRows={2}
          placeholder="Type here."
          size="lg"
          variant="outlined"
          onChange={(event) => {
            setCom(event.target.value);
          }}
          ></Textarea>
        <Button type="submit" onClick={onSubmit}>Submit</Button>
      </Form>
    </>
  )
}

export default FeedbackPage
