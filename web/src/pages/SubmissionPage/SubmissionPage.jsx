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
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  return (
    <>
      <button onClick={showValue}>Show value</button>
      <Editor
        height='600px'
        width='400px'
        m='10px'
        defaultLanguage="javascript"
        defaultValue="// some comment"
        value="write some code..."
        theme="vs-dark"
        onMount={handleEditorDidMount}
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

  return (
    <>
      <Metadata title="Submission" description="Submission page"/>
      <Stack
        direction="row"
        spacing={5}
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" m={2}>
          <LangDropdown/>
          <CodeBox/>
        </Stack>
        {output &&
          <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" m={2}>
            <LangDropdown/>
            <CodeBox/>
          </Stack>
        }
      </Stack>
      <TranslateBtn/>
    </>
  )
}

export default SubmissionPage;