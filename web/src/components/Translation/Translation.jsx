import Editor from '@monaco-editor/react';
import { useMutation} from '@redwoodjs/web';
import { Link, routes } from '@redwoodjs/router';
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Repeat, Delete } from '@mui/icons-material';
import { useRef } from 'react';

import { QUERY as TranslationQuery } from 'src/components/TranslationsCell'

const DELETE_TRANSLATION = gql`
  mutation DeleteTranslationMutation($id: Int!) {
    deleteTranslation(id: $id) {
      id
    }
  }
`

const Translation = ({ translation }) => {
  const theme = useTheme();
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const [deleteTranslation] = useMutation(DELETE_TRANSLATION, {
    onCompleted: () => {},
    onError: (err) => {},
    refetchQueries: [{ query: TranslationQuery }],
  })

  const del = () => {
    deleteTranslation({ variables: { id: translation.id}});
  }

  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
        <Editor
          height='500px'
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
          height='500px'
          width="45%"
          language={translation.outputLanguage}
          defaultValue="# input code"
          value={translation.outputCode}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          title="outputEditor"
        />
      </Box>

      <Box sx={{ marginTop: '10px', marginBottom: '5px', display: 'flex', alignContent: 'center'}}>

        <Typography>
          API Status: {translation.status}
        </Typography>

        <IconButton
          variant="text"
          data-testid="deleteButton"
          onClick={del}
          sx={{
            alignSelf: 'flex-end',
            fontSize: '16px',
            height: "30px",
            borderRadius: "4px",
            marginLeft: "auto",
            backgroundColor: '#7A0707',
            color: theme.palette.text.primary,
            '&::hover': {
              backgroundColor: '#7A0707',
              color: theme.palette.text.primary,
            }
          }}
        >
          <Delete sx={{ fill: theme.palette.text.primary, paddingRight: '5px'}} /> Delete
        </IconButton>

        <Link
          to={routes.translate({code: translation.inputCode, inLang: translation.inputLanguage, outLang: translation.outputLanguage})}
        >
          <IconButton
            variant="text"
            data-testid="deleteButton"
            sx={{
              alignSelf: 'flex-end',
              fontSize: '16px',
              height: "30px",
              borderRadius: "4px",
              marginLeft: "10px",
              backgroundColor: '#76AB42',
              color: theme.palette.text.primary,
              '&::hover': {
                backgroundColor: '#76AB42',
                color: theme.palette.text.primary,
              }
            }}
          >
            <Repeat sx={{ fill: theme.palette.text.primary, paddingRight: '5px'}} /> Translate Again
          </IconButton>
        </Link>
      </Box>
    </Box>
  )
}

export default Translation


//TODO
//refetch when deleting
//Move Delete and Translate Again into a separate cell