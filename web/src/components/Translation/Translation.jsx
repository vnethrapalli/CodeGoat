import Editor from '@monaco-editor/react';
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';

import { languages } from '../../pages/SubmissionPage/SubmissionPage';

const Translation = ({ translation }) => {
  const theme = useTheme();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <translation>
      {/* <Typography>{translation.id}</Typography> */}
      <Typography>{translation.inputLanguage}</Typography>
      <Typography>{translation.outputLanguage}</Typography>
      <Typography>Translated at: {translation.createdAt}</Typography>

      <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
        <Editor
          height='400px'
          width="45%"
          m='10px'
          defaultLanguage="python"
          language={languages[translation.inputLanguage]}
          defaultValue="# input code"
          value={translation.inputCode}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          title="inputEditor"
        />

        <Editor
          height='400px'
          width="45%"
          defaultLanguage="python"
          language={languages[translation.outputLanguage]}
          defaultValue="# input code"
          value={translation.outputCode}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          title="outputEditor"
        />
      </Box>

    </translation>
  )
}

export default Translation