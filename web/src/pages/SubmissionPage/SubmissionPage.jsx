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
        width="40vw"
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

  const codeboxInput = CodeBox();
  const codeboxOutput = CodeBox();

  const TranslateBtn = () => {
    return (
      <>
        <Box textAlign="center">
          <Button
            sx={{ width: "250px" }}
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
    )
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

          <Stack direction="row" justifyContent="space-between" alignItems="center" width={'40vw'}>
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
              <Button
              startIcon={<DownloadIcon/>}
              onClick={() => {
                const element = document.createElement("a");
                element.setAttribute("id", "download-link");
                const file = new Blob([codeboxInput.props.children.props.value], { type: "text/plain" });
                element.href = URL.createObjectURL(file);
                element.download = "code_input.txt";

                // simulate link click
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
                document.body.removeChild(element);
              }}
              />
            </Stack>
          </Stack>

          {output &&
            <Stack direction="row" justifyContent="flex-end" alignItems="center" width='400px'>
              <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center" margin="0px">
                <Button
                  startIcon={<ContentCopyIcon/>}
                  onClick={() => {
                    console.log(codeboxOutput.props.children.props.value)
                    navigator.clipboard.writeText(codeboxOutput.props.children.props.value)
                  }}
                />
                <Button
                  startIcon={<DownloadIcon/>}
                  onClick={() => {
                    const element = document.createElement("a");
                    element.setAttribute("id", "download-link");
                    const file = new Blob([codeboxOutput.props.children.props.value], { type: "text/plain" });
                    element.href = URL.createObjectURL(file);
                    element.download = "code_output.txt";

                    // simulate link click
                    document.body.appendChild(element); // Required for this to work in FireFox
                    element.click();
                    document.body.removeChild(element);
                  }}
                />
              </Stack>
            </Stack>
          }
        </Stack>

        <Stack direction="row" spacing={4} justifyContent="space-between" alignItems="center" width={output ? '80vw' : '40vw'}>
          {codeboxInput}
          {output && codeboxOutput}
        </Stack>

      </Stack>
      <TranslateBtn/>
    </>
  )
}

export default SubmissionPage;