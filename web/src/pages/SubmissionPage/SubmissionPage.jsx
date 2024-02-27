import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { Stack, Box } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';

const languages = ["C++", "C", "Java", "Python", "JavaScript", "Assembly"];

const LangDropdown = ({ text }) => {
  return (
    <>
      <FormControl>
        <InputLabel>{text}</InputLabel>
        <Select style={{ width: 100, height: 30 }}>
          {languages.map((lang) => {
            return <MenuItem value={lang}>{lang}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}

// const CodeBox = () => {
//   return (
//     <Box sx = {{ padding: 0 }}>
//       <Box
//         sx={{
//           outline: 1,
//           width: "500px",
//           height: "30px",
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//           borderBottomLeftRadius: 0,
//           borderBottomRightRadius: 0,
//           borderBottom: 0
//          }}
//       >
//         <Stack direction="row">
//           <Box sx={{
//             width: "500px",
//             textAlign: "right"
//           }}>
//             <Button startIcon={<ContentCopyIcon/>}/>
//             <Button startIcon={<DownloadIcon/>}/>
//           </Box>
//         </Stack>
//       </Box>
//       <TextareaAutosize
//         placeholder="Code Area"
//         minRows={30}
//         maxRows={30}
//         sx={{
//           width: "500px",
//           outline: 1,
//           borderTopLeftRadius: 0,
//           borderTopRightRadius: 0,
//           borderBottomLeftRadius: 15,
//           borderBottomRightRadius: 15
//          }}
//       >
//       </TextareaAutosize>
//     </Box>
//   )
// }

const CodeBox = () => {
  const [codeValue, setCodeValue] = React.useState("write some code...");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  return (
    <>
      {/* <button onClick={showValue}>Show value</button> */}
      <Editor
        height='600px'
        width='400px'
        m='10px'
        defaultLanguage="javascript"
        defaultValue=""
        value={codeValue}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={(newValue) => { setCodeValue(newValue); }}
      />
    </>
  );
}

const SubmissionPage = () => {
  const [output, setOutput] = React.useState(false);

  const TranslateBtn = () => {
    return (
      <>
        <Box textAlign="center">
          <Button
            sx={{ width: "250px" }}
            onClick={() =>
              setOutput(() => true)
            }
          >
            Translate
          </Button>
        </Box>
      </>
    )
  }

  const codeboxInput = CodeBox();
  const codeboxOutput = CodeBox();

  return (
    <>
      <Metadata title="Submission" description="Submission page"/>
      <Stack
        direction="row"
        spacing={5}
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="column" spacing={1} justifyContent="center" alignItems="center" m={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width='400px'>
            <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
              <LangDropdown text="source" />
              <LangDropdown text="target" />
            </Stack>

            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
              <Button
                startIcon={<ContentCopyIcon/>}
                onClick={() => {
                  console.log(codeboxInput.props.children.props.value)
                  navigator.clipboard.writeText(codeboxInput.props.children.props.value)
                }}
              />
              <Button startIcon={<DownloadIcon/>}/>
            </Stack>
          </Stack>
          {codeboxInput}

        </Stack>
        {output &&
          <Stack direction="column" spacing={1} justifyContent="center" alignItems="center" m={4}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" width='400px'>
              <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
                <Button
                  startIcon={<ContentCopyIcon/>}
                  onClick={() => {
                    console.log(codeboxOutput.props.children.props.value)
                    navigator.clipboard.writeText(codeboxOutput.props.children.props.value)
                  }}
                />
                <Button startIcon={<DownloadIcon/>}/>
              </Stack>
            </Stack>
            {codeboxOutput}
          </Stack>
        }
      </Stack>
      <TranslateBtn/>
    </>
  )
}

export default SubmissionPage;