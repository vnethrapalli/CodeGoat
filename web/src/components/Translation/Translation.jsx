import Editor from '@monaco-editor/react';
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';

const Translation = ({ translation }) => {
  const theme = useTheme();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <Box sx={{ color: theme.palette.text.secondary }}>
      {/* <Typography>{translation.id}</Typography> */}
      {/* <Typography>{translation.inputLanguage}</Typography> */}
      {/* <Typography>{translation.outputLanguage}</Typography> */}
      {/* <Typography>Translated at: {translation.createdAt}</Typography> */}

      <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
        <Editor
          height='400px'
          width="45%"
          m='10px'
          language={translation.inputLanguage}
          defaultValue="# input code"
          value={translation.inputCode}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          title="inputEditor"
        />

        <Editor
          height='400px'
          width="45%"
          language={translation.outputLanguage}
          defaultValue="# input code"
          value={translation.outputCode}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          title="outputEditor"
        />
      </Box>
    </Box>
  )
}

export default Translation