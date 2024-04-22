import { Link, routes } from '@redwoodjs/router'
import { Metadata, useMutation } from '@redwoodjs/web'
import { Form, Submit, TextField, TextAreaField } from '@redwoodjs/forms'
import { Toaster, toast } from '@redwoodjs/web/toast'
import { Button, Box, Rating, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LensIcon from '@mui/icons-material/Lens';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { useTheme } from '@mui/material/styles';
import { alpha } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
// import { styled } from '@mui/system';
import { useMediaQuery } from 'react-responsive'
import { Divider } from '@mui/material';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 70%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
)

// For the sql stuff
const CREATE_FEEDBACK = gql`
  mutation CreateFeedbackMutation($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      id
    }
  }
`
const FeedbackPage = ({ defaultOnSubmit, defaultOnHandle, defaultRatings }) => {
  const theme = useTheme();
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1000px)'})

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

  const [create] = useMutation(CREATE_FEEDBACK, {
    onCompleted: () => {
      toast.success("Submitted!", {duration: 2500, position: "bottom-right"})
    },
    onError: () => {
      toast.error("An error occurred.", {duration: 2500, position: "bottom-right"})
    },
  })

  const handleSubmit = defaultOnHandle || ((data) => {
    data.preventDefault();
    let submitted = true;
    if (!(sub <= 10 && sub >= 0)) {
      toast.error("Invalid 'Submission Page' rating!");
      submitted = false;
    }
    if (!(out <= 10 && out >= 0)) {
      toast.error("Invalid 'Output Page' rating!");
      submitted = false;
    }
    if (!(acc <= 10 && acc >= 0)) {
      toast.error("Invalid 'Translation Accuracy' rating!");
      submitted = false;
    }
    if (!(gpt <= 10 && gpt >= 0)) {
      toast.error("Invalid 'GPT-3 Availability' rating!");
      submitted = false;
    }
    if (!(exp <= 10 && exp >= 0)) {
      toast.error("Invalid 'Overall Experience' rating!");
      submitted = false;
    }
    if (sub === 0 && out === 0 && acc === 0 && gpt === 0 && exp === 0 && com === "") {
      toast.error("Please try to fill out SOMETHING!");
      submitted = false;
    }
    if (submitted) {
      onSubmit();
    }
  });

  const onSubmit = defaultOnSubmit || (async(data) => {
    create({ variables: { input: {"submissionPage":sub, "outputPage":out, "translationAccuracy":acc, "gptAvailability":gpt, "experience":exp, "comments":com} } })
  });
  // By default, hover is not on
  const [hover, setHover] = React.useState(-1);

  // Set the variables to 0 / empty initially
  const [sub, setSub] = React.useState(defaultRatings ? defaultRatings["sub"] : 0);
  const [out, setOut] = React.useState(defaultRatings ? defaultRatings["out"] : 0);
  const [acc, setAcc] = React.useState(defaultRatings ? defaultRatings["acc"] : 0);
  const [gpt, setGPT] = React.useState(defaultRatings ? defaultRatings["gpt"] : 0);
  const [exp, setExp] = React.useState(defaultRatings ? defaultRatings["exp"] : 0);
  const [com, setCom] = React.useState("");

  return (
    <>
      <Metadata title="Feedback" description="Submit Feedback"/>
      <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center">
      <Typography variant='h2' component='h2' align='center' style={{color: theme.palette.text.secondary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>Feedback</Typography>
        <Form data-testid="ratingForm" onSubmit={handleSubmit}>
          <Typography variant='h5' component='h5' align='center' style={{color: theme.palette.text.secondary}}>Submission Page</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
              marginBottom: '20px',
            }}
          >
            <StyledRating
              label = "submissionPage"
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
              sx={isDesktopOrLaptop ? {fontSize: "5rem"} : {fontSize: "2.5rem"}}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: theme.palette.text.secondary}}>Output Page</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
              marginBottom: '20px',
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
              sx={isDesktopOrLaptop ? {fontSize: "5rem"} : {fontSize: "2.5rem"}}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: theme.palette.text.secondary}}>Translation Accuracy</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
              marginBottom: '20px',
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
              sx={isDesktopOrLaptop ? {fontSize: "5rem"} : {fontSize: "2.5rem"}}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: theme.palette.text.secondary}}>GPT-3 Availability</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
              marginBottom: '20px',
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
              sx={isDesktopOrLaptop ? {fontSize: "5rem"} : {fontSize: "2.5rem"}}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: theme.palette.text.secondary}}>Overall Experience</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: "1.5rem",
              justifyContent:"center",
              marginBottom: '20px',
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
              sx={isDesktopOrLaptop ? {fontSize: "5rem"} : {fontSize: "2.5rem"}}
              icon={<LensIcon fontSize="inherit" />}
              emptyIcon={<RadioButtonUncheckedIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>

          <Typography variant='h5' component='h5' align='center' style={{color: theme.palette.text.secondary}}>Additional Comments</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <TextareaAutosize
              aria-label="empty textarea"
              name="comments"
              placeholder="Type your comments here."
              minRows={5}
              value={com}
              onChange={(event) => {
                setCom(event.target.value);
              }}
            />
          </Box>
          <Button name="submit" type="submit" sx={{ my: 2, color: theme.palette.text.primary, display: 'block', margin: 'auto auto' }} style={{color: theme.palette.text.secondary}} onClick={handleSubmit}>Submit</Button>
        </Form>
      </Box>
    </>
  )
}

export default FeedbackPage