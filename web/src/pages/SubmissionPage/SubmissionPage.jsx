import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { Stack, Box } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const languages = ["C++", "C", "Java", "Python", "JavaScript", "Assembly"];

const LangDropdown = () => {
  return (
    <>
      <FormControl>
        <InputLabel>Source Language</InputLabel>
        <Select>
          {languages.map((lang) => {
            return <MenuItem value={lang}>{lang}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}

const CodeBox = () => {
  return (
    <Box sx = {{ padding: 0 }}>
      <Box
        sx={{
          outline: 1,
          width: "500px",
          height: "30px",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottom: 0
         }}
      >
        <Stack direction="row">
          <Box sx={{
            width: "500px",
            textAlign: "right"
          }}>
            <Button startIcon={<ContentCopyIcon/>}/>
            <Button startIcon={<DownloadIcon/>}/>
          </Box>
        </Stack>
      </Box>
      <TextareaAutosize
        placeholder="Code Area"
        minRows={30}
        maxRows={30}
        sx={{
          width: "500px",
          outline: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15
         }}
      >
      </TextareaAutosize>
    </Box>
  )
}

const TranslateBtn = () => {
  return (
    <>
      <Box textAlign="center">
        <Button
          sx={{ width: "250px" }}
        >
          Translate
        </Button>
      </Box>
    </>
  )
}

const SubmissionPage = () => {
  return (
    <>
      <Metadata title="Submission" description="Submission page"/>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" justifyContent="center" spacing={10}>
          <Stack direction="column" spacing={2}>
            <LangDropdown/>
            <CodeBox/>
          </Stack>
          <Stack direction="column" spacing={2}>
            <LangDropdown/>
            <CodeBox/>
          </Stack>
        </Stack>
        <TranslateBtn/>
      </Stack>
    </>
  )
}

export default SubmissionPage;