import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { Stack, Box, Button, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { useTheme, darken } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFile from '@mui/icons-material/UploadFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';

const languages = [
  {dropdownItem: "C++", langCode: "cpp"},
  {dropdownItem: "C#", langCode: "csharp"},
  {dropdownItem: "Java", langCode: "java"},
  {dropdownItem: "JavaScript", langCode: "javascript"},
  {dropdownItem: "Python", langCode: "python"},
  {dropdownItem: "TypeScript", langCode: "typescript"},
];

// const LangDropdown = ({ text }) => {
//   return (
//     <>
//       <FormControl>
//         <InputLabel>{text}</InputLabel>
//         <Select style={{ width: 100, height: 30 }}>
//           {languages.map((lang) => {
//             return <MenuItem value={lang}>{lang}</MenuItem>
//           })}
//         </Select>
//       </FormControl>
//     </>
//   )
// }


// const CodeBox = () => {
//   const [codeValue, setCodeValue] = React.useState("write some code...");
//   const editorRef = useRef(null);

//   function handleEditorDidMount(editor, monaco) {
//     editorRef.current = editor;
//   }

//   function showValue() {
//     alert(editorRef.current.getValue());
//   }

//   return (
//     <>
//       {/* <button onClick={showValue}>Show value</button> */}
//       <Editor
//         height='600px'
//         width="40vw"
//         m='10px'
//         defaultLanguage="javascript"
//         defaultValue=""
//         value={codeValue}
//         theme="vs-dark"
//         onMount={handleEditorDidMount}
//         onChange={(newValue) => { setCodeValue(newValue); }}
//       />
//     </>
//   );
// }

const SubmissionPage = () => {
  const [inputCodeValue, setInputCodeValue] = React.useState("// write some code...");
  const [outputCodeValue, setOutputCodeValue] = React.useState("# write some code...");
  const [inputLanguage, setInputLanguage] = React.useState("javascript");
  const [outputLanguage, setOutputLanguage] = React.useState("python");
  const [output, setOutput] = React.useState(false);
  const theme = useTheme();

  const CodeBox = ({ codeValue, updateCodeValue, defaultLanguage, language, defaultValue }) => {
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
          defaultValue={defaultValue}
          value={codeValue}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={updateCodeValue}
        />
      </>
    );
  }

  const codeboxInput = CodeBox({
    codeValue: inputCodeValue,
    updateCodeValue: (newCodeVal) => setInputCodeValue(newCodeVal),
    defaultLanguage: inputLanguage,
    language: inputLanguage,
    defaultValue: inputCodeValue
  });
  const codeboxOutput = CodeBox({
    codeValue: outputCodeValue,
    updateCodeValue: (newCodeVal) => setOutputCodeValue(newCodeVal),
    defaultLanguage: outputLanguage,
    language: outputLanguage,
    defaultValue: outputCodeValue
  });

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
              borderRadius: "40px",
              marginBottom: "25px",
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

  const CopyButton = ({ editor }) => {
    return (
      <Button
        onClick={() => {
          navigator.clipboard.writeText(editor.props.children.props.value)
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
              backgroundColor: theme.palette.secondary.main,
              color: darken(theme.palette.secondary.main, 0.5),
              textTransform: 'none',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px'
            }}
            onClick={readInputFile}
          >
            <UploadFile />
          </Button>
        </label>
      </>
    )
  }


  const DownloadButton = () => {
    return (
      <Button
        style={{
          backgroundColor: theme.palette.secondary.main,
          color: darken(theme.palette.secondary.main, 0.5),
          textTransform: 'none',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px'
        }}
        onClick={() => {
          const element = document.createElement("a");
          element.setAttribute("id", "download-link");
          const file = new Blob([codeboxInput.props.children.props.value], { type: "text/plain" });
          element.href = URL.createObjectURL(file);
          element.download = "code_output.txt";

          // simulate link click
          document.body.appendChild(element); // Required for this to work in FireFox
          element.click();
          document.body.removeChild(element);
        }}
        >
        <DownloadIcon />
      </Button>
    )
  }

  const DropdownAndButtons = ({ input }) => {
    // console.log(input);
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center" width={'40vw'}>
        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
          <LangDropdown text="Source Language" language={inputLanguage} setLanguage={(newLang) => setInputLanguage(newLang)} />
          <LangDropdown text="Target Language" language={outputLanguage} setLanguage={(newLang) => setOutputLanguage(newLang)} />
        </Stack>
        <Stack direction="row" spacing={0} justifyContent="flex-end" alignItems="center">
          <CopyButton editor={codeboxInput}/>
          <Divider orientation="vertical" flexItem style={{ backgroundColor: darken(theme.palette.secondary.main, 0.5), width: '1%' }}/>
          {input ? <UploadButtonInput/> : <DownloadButton/>}
        </Stack>
      </Stack>
    );
  }

  const NoDropdownAndButtons = ({ input }) => {
    // console.log(input);
    return (
      <Stack direction="row" spacing={0} justifyContent="flex-end" alignItems="center">
        <CopyButton editor={input ? codeboxInput : codeboxOutput}/>
        <Divider orientation="vertical" flexItem style={{ backgroundColor: darken(theme.palette.secondary.main, 0.5), width: '1%' }}/>
        {input ? <UploadButtonInput/> : <DownloadButton/>}
      </Stack>
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
          {/* <CodeBox codeValue={inputCodeValue} setCodeValue={newCodeVal => setInputCodeValue(newCodeVal)} defaultLanguage={inputLanguage} language={inputLanguage} /> */}
          {codeboxInput}
          {output &&
          // <CodeBox codeValue={outputCodeValue} setCodeValue={newCodeVal => setOutputCodeValue(newCodeVal)} defaultLanguage={outputLanguage} language={outputLanguage} />}
          codeboxOutput}
        </Stack>
      </Stack>
      <TranslateBtn/>
      {/* <TranslateBtn/> */}
    </>
  );
}

export default SubmissionPage;