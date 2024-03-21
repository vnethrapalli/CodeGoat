import { Metadata, useQuery } from '@redwoodjs/web';
import { Stack, Box, Button, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFile from '@mui/icons-material/UploadFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';


export const languages = [
  {dropdownItem: "C++", langCode: "cpp"},
  {dropdownItem: "C#", langCode: "csharp"},
  {dropdownItem: "Java", langCode: "java"},
  {dropdownItem: "JavaScript", langCode: "javascript"},
  {dropdownItem: "Python", langCode: "python"},
  {dropdownItem: "TypeScript", langCode: "typescript"},
];
const extensions = {
  "cpp": ".cpp",
  "csharp": ".cs",
  "java": ".java",
  "javascript": ".js",
  "python": ".py",
  "typescript": ".ts"
};


const SubmissionPage = ({ defaultReadInputFile, defaultDownloadTextAsFile }) => {
  const [inputCodeValue, setInputCodeValue] = React.useState("// write some code...");
  const [outputCodeValue, setOutputCodeValue] = React.useState("# your new code will be here...");
  const [inputLanguage, setInputLanguage] = React.useState("javascript");
  const [outputLanguage, setOutputLanguage] = React.useState("python");
  const [output, setOutput] = React.useState(false);
  const theme = useTheme();

  const CodeBox = ({ codeValue, updateCodeValue, defaultLanguage, language, defaultValue, isInput }) => {
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
    }

    return (
      <div data-testid={isInput ? "inputEditor" : "outputEditor"}>
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
          title={isInput ? "inputEditor" : "outputEditor"}
        />
      </div>
    );
  }

  const codeboxInput = CodeBox({
    codeValue: inputCodeValue,
    updateCodeValue: (newCodeVal) => setInputCodeValue(newCodeVal),
    defaultLanguage: inputLanguage,
    language: inputLanguage,
    defaultValue: inputCodeValue,
    isInput: true
  });
  const codeboxOutput = CodeBox({
    codeValue: outputCodeValue,
    updateCodeValue: (newCodeVal) => setOutputCodeValue(newCodeVal),
    defaultLanguage: outputLanguage,
    language: outputLanguage,
    defaultValue: outputCodeValue,
    isInput: false
  });

  const readInputFile = defaultReadInputFile || ((event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(e) {
      const fileContents = e.target.result;
      setInputCodeValue(fileContents);
    }
  });

  const downloadTextAsFile = defaultDownloadTextAsFile || ((text, fname) => {
    const element = document.createElement("a");
    element.setAttribute("id", "download-link");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = fname;

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  });

  const LangDropdown = ({ text, language, setLanguage }) => {
    return (
      <>
        <Stack direction="column" spacing={0.5}>
          <InputLabel>{text}</InputLabel>
          <FormControl size='small'>
            <Select
              style={{ color: theme.palette.text.secondary }}
              variant="outlined"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <MenuItem
                  style={{
                     color: theme.palette.text.secondary,
                  }}
                  value={lang.langCode}
                >
                    {lang.dropdownItem}
                </MenuItem>
              ))}
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
            data-testid="translateButton"
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              textTransform: 'none'
            }}
            sx={{
              width: "250px",
              borderRadius: "40px",
              marginBottom: "25px",
            }}
            onClick={async () => {
              setOutput(() => true);
              const reqUrl = `http://localhost:8910/.redwood/functions/translate`;
              const translation = await fetch(reqUrl, {
                method: "POST",
                body: JSON.stringify({
                  code: inputCodeValue,
                  inputLanguage: inputLanguage,
                  outputLanguage: outputLanguage
                })
              });

              // const reader = translation.body.getReader();
              let response = await translation.json();
              setOutputCodeValue(response.data);
            }}
          >
            Translate
          </Button>
        </Box>
      </>
    );
  }

  const CopyButton = ({ editor, isInput }) => {
    return (
      <Button
        onClick={() => {
          navigator.clipboard.writeText(editor.props.children.props.value)
        }}
        style={{
          backgroundColor: theme.palette.secondary.main,
          textTransform: 'none',
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px'
        }}
        data-testid={isInput ? "inputCopy" : "outputCopy"}
      >
        <ContentCopyIcon sx={{ fill: theme.palette.text.primary }} />
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
              textTransform: 'none',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px'
            }}
            onClick={readInputFile}
            data-testid="uploadButton"
          >
            <UploadFile sx={{ fill: theme.palette.text.primary }} />
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
          textTransform: 'none',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px'
        }}
        onClick={() => {
          // console.log(outputLanguage);
          downloadTextAsFile(codeboxOutput.props.children.props.value, 'code_output' + extensions[outputLanguage]);
        }}
        data-testid="downloadButton"
        >
        <DownloadIcon sx={{ fill: theme.palette.text.primary }} />
      </Button>
    )
  }

  const DropdownAndButtons = ({ input }) => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center" width={'40vw'}>
        <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
          <LangDropdown text="Source Language" language={inputLanguage} setLanguage={(newLang) => setInputLanguage(newLang)} />
          <LangDropdown text="Target Language" language={outputLanguage} setLanguage={(newLang) => setOutputLanguage(newLang)} />
        </Stack>
        <Stack direction="row" spacing={0} justifyContent="flex-end" alignItems="center">
          <CopyButton editor={codeboxInput} isInput={input}/>
          <Divider orientation="vertical" flexItem style={{ backgroundColor: theme.palette.text.primary, width: '1%' }}/>
          {input ? <UploadButtonInput/> : <DownloadButton/>}
        </Stack>
      </Stack>
    );
  }

  const NoDropdownAndButtons = ({ input }) => {
    return (
      <Stack direction="row" spacing={0} justifyContent="flex-end" alignItems="center">
        <CopyButton editor={input ? codeboxInput : codeboxOutput}/>
        <Divider orientation="vertical" flexItem style={{ backgroundColor: theme.palette.text.primary, width: '1%' }}/>
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
          {codeboxInput}
          {output && codeboxOutput}
        </Stack>
      </Stack>
      <TranslateBtn/>
    </>
  );
}

// {output && <CodeOutputCell code={inputCodeValue} inLang={inputLanguage} outLang={outputLanguage} />}
export default SubmissionPage;