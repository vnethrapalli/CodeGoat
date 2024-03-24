import { Metadata, useQuery } from '@redwoodjs/web';
import { Stack, Box, Button, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFile from '@mui/icons-material/UploadFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Editor from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { Toaster, toast } from '@redwoodjs/web/toast'


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

let queueCount = 0;

const MAXQUEUE = 5;

const SubmissionPage = ({ defaultReadInputFile, defaultDownloadTextAsFile, defaultTranslationRequest }) => {
  const [inputCodeValue, setInputCodeValue] = React.useState("// write some code...");
  const [outputCodeValue, setOutputCodeValue] = React.useState("Processing...");
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

  const translateRequest = defaultTranslationRequest || (async (queueCount) => {
    let sent = false;
    if (queueCount < MAXQUEUE) {
      queueCount++;
      toast.dismiss();
      toast.success("Your request has been sent! \nQueued Requests: " + queueCount.toString(), {duration: 1200});
      sent = true;
    } else {
      toast.dismiss();
      toast.error("Slow down there! I can't afford all those API calls lmao", {duration: 2500});
      return sent;
    }
    const reqUrl = `http://localhost:8910/.redwood/functions/translate`;
    const translation = await fetch(reqUrl, {
      method: "POST",
      body: JSON.stringify({
        code: inputCodeValue,
        inputLanguage: inputLanguage,
        outputLanguage: outputLanguage
      })
    });
    let response = await translation;
    let status = response.status;
    response = await response.json();
    setOutputCodeValue(response.data);
    queueCount--;
    if(status === 200) {
      toast.success("Code translated successfully! \nQueued Requests: " + queueCount.toString(), { duration: 1500 });
      setOutputCodeValue(response.data);
    } else {
      switch(status) {
        case 429:
          toast.error("The API has reached its rate limit. Please try again later.", { duration: 2500 });
          break;
        case 400:
          toast.error("There was an error in the communication between the backend and API. Please try again.", { duration: 2500 });
          break;
        case 403:
          toast.error("The length of the code is too long. Please shorten the code and try again.", { duration: 2500 });
          break;
        case 401:
          toast.error("There was an error on the backend. Please try again later.", { duration: 2500 });
          break;
        case 404:
          toast.error("The GPT API is unavalaible", { duration: 2500 });
          break;
        case 500:
          toast.error("There was an error on the API side. Please try again.", { duration: 2500 });
          break;
        case 405:
          toast.error("This action is not permitted by the API. Please try again.", { duration: 2500 });
          break;
        default:
          toast.error("Error translating code.", { duration: 2500 });
          break;
      }
    }
    return sent;
  });

  const TranslateBtn = () => {
    const [queue, setQueue] = React.useState(Promise.resolve())

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
            onClick={() => {
              setOutput(() => true);
              setQueue(queue
                .then(() => {
                  translateRequest(queueCount);
                })
                .catch((err) => {console.error(err)})
                )
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
      <Toaster />
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