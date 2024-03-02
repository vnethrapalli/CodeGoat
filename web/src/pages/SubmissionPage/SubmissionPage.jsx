import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { Stack, Box, Divider } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import UploadIcon from '@mui/icons-material/Upload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Editor from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { useTheme, darken } from '@mui/material/styles';

const languages = [
    {dropdownItem: "C++", langCode: "cpp"},
    {dropdownItem: "C#", langCode: "csharp"},
    {dropdownItem: "Java", langCode: "java"},
    {dropdownItem: "JavaScript", langCode: "javascript"},
    {dropdownItem: "Python", langCode: "python"},
    {dropdownItem: "TypeScript", langCode: "typescript"},
];

const SubmissionPage = () => {
  const [inputCodeValue, setInputCodeValue] = useState("// write some code...");
  const [outputCodeValue, setOutputCodeValue] = useState("# write some code...");
  const [inputLanguage, setInputLanguage] = useState("javascript");
  const [outputLanguage, setOutputLanguage] = useState("python");
  const [output, setOutput] = React.useState(false);
  const theme = useTheme();

  const readInputFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(e) {
      const fileContents = e.target.result;
      setInputCodeValue(fileContents);
    }
  }

  const readOutputFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(e) {
      const fileContents = e.target.result;
      setOutputCodeValue(fileContents);
    }
  }

  const LangDropdown = ({ text, language, setLanguage }) => {
    return (
      <>
        <Stack direction="column" spacing={0.5}>
          <InputLabel>{text}</InputLabel>
          <FormControl>
            <Select
              style={{ width: 140, height: 30, backgroundColor: 'white' }}
              variant="outlined"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {languages.map((lang) => {
                return <MenuItem value={lang.langCode}>{lang.dropdownItem}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Stack>
      </>
    )
  }

  const TranslateBtn = () => {
    return (
      <>
        <Box textAlign="center" pt={2}>
          <Button
            variant="contained"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: 'white',
              textTransform: 'none'
            }}
            sx={{
              width: "250px",
              borderRadius: "40px"
            }}
            onClick={() => {
              setOutput(() => true);
              codeboxInput.props.children.props.width = "48%";
              codeboxOutput.props.children.props.width = "48%";
            }}
          >
            Translate
          </Button>
        </Box>
      </>
    );
  }

  const CopyButton = () => {
    return (
      <Button
        onClick={() => {
          console.log(codeboxOutput.props.children.props.value)
          navigator.clipboard.writeText(codeboxOutput.props.children.props.value)
        }}
        style={{
          backgroundColor: theme.palette.secondary.main,
          color: darken(theme.palette.secondary.main, 0.5),
          textTransform: 'none',
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px'
        }}
      >
        <ContentCopyIcon/>
      </Button>
    );
  }

  const UploadButtonInput = () => {
    return (
      <>
        <input
          type="file"
          accept="*"
          style={{ display: 'none' }}
          id="upload-button-input"
          onChange={readInputFile}
        />
        <label htmlFor="upload-button-input">
          <Button
            component="span"
            style={{
              backgroundColor: theme.palette.secondary.main, color: darken(theme.palette.secondary.main, 0.5),
              textTransform: 'none',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px'
            }}
          >
            <UploadIcon/>
          </Button>
        </label>
      </>
    )
  }

  const UploadButtonOutput = () => {
    return (
      <>
        <input
          type="file"
          accept="*"
          style={{ display: 'none' }}
          id="upload-button-output"
          onChange={readOutputFile}
        />
        <label htmlFor="upload-button-output">
          <Button
            component="span"
            style={{
              backgroundColor: theme.palette.secondary.main, color: darken(theme.palette.secondary.main, 0.5),
              textTransform: 'none',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px'
            }}
          >
            <UploadIcon/>
          </Button>
        </label>
      </>
    )
  }

  const DropdownAndButtons = ({ input }) => {
    console.log(input);
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center" width={'40vw'}>
        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
          <LangDropdown text="Source Language" language={inputLanguage} setLanguage={newLang => setInputLanguage(newLang)} />
          <LangDropdown text="Target Language" language={outputLanguage} setLanguage={newLang => setOutputLanguage(newLang)} />
        </Stack>
        <Stack direction="row" spacing={0} justifyContent="flex-end" alignItems="center">
          <CopyButton/>
          <Divider orientation="vertical" flexItem style={{ backgroundColor: darken(theme.palette.secondary.main, 0.5), width: '1%' }}/>
          {input ? <UploadButtonInput/> : <UploadButtonOutput/>}
        </Stack>
      </Stack>
    );
  }

  const NoDropdownAndButtons = ({ input }) => {
    console.log(input);
    return (
      <Stack direction="row" spacing={0} justifyContent="flex-end" alignItems="center">
        <CopyButton/>
        <Divider orientation="vertical" flexItem style={{ backgroundColor: darken(theme.palette.secondary.main, 0.5), width: '1%' }}/>
        {input ? <UploadButtonInput/> : <UploadButtonOutput/>}
      </Stack>
    );
  }

  const CodeBox = ({ codeValue, setCodeValue, defaultLanguage, language }) => {
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
    }

    // function showValue() {
    //   alert(editorRef.current.getValue());
    // }

    return (
      <>
        {/* <button onClick={showValue}>Show value</button> */}
        <Editor
          height='600px'
          width="40vw"
          m='10px'
          defaultLanguage={defaultLanguage}
          language={language}
          value={codeValue}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={setCodeValue}
        />
      </>
    );
  }

  return (
    <>
      <Metadata title="Submission" description="Submission page"/>
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
      >
        <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center" width={output ? '80vw' : '40vw'}>
          <DropdownAndButtons input={true} />
          {output && <NoDropdownAndButtons input={false} />}
        </Stack>
        <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center" width={output ? '80vw' : '40vw'}>
          <CodeBox codeValue={inputCodeValue} setCodeValue={newCodeVal => setInputCodeValue(newCodeVal)} defaultLanguage={inputLanguage} language={inputLanguage} />
          {output &&
          <CodeBox codeValue={outputCodeValue} setCodeValue={newCodeVal => setOutputCodeValue(newCodeVal)} defaultLanguage={outputLanguage} language={outputLanguage} />}
        </Stack>
      </Stack>
      <TranslateBtn/>
      <TranslateBtn/>
    </>
  );

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
//             <Button startIcon={<UploadIcon/>}/>
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

}

export default SubmissionPage;