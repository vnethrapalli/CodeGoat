import Editor from '@monaco-editor/react';
import { useMutation} from '@redwoodjs/web';
import { Link, routes, useParams } from '@redwoodjs/router';
import { Box, Button, IconButton, Typography, Rating } from '@mui/material'
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
  let { page } = useParams();
  let userId = translation.uid;

  if(!page){
    page = 1;
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const [deleteTranslation] = useMutation(DELETE_TRANSLATION, {
    onCompleted: () => {},
    refetchQueries: [{ query: TranslationQuery, variables: { page: Number(page), uid: userId, inLang: [], outLang: [], startDate: "1970-01-01T00:00:01Z", endDate: new Date(Date.now()).toISOString(), sort: 1, inSort: 0, outSort: 0 }}],
  })

  const del = () => {
    deleteTranslation({ variables: { id: translation.id}});
  }

  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <Box data-testid="editors" sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
        <Editor
          height='500px'
          width="45%"
          data-testid="inputEditor"
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
          data-testid="outputEditor"
          language={translation.outputLanguage}
          defaultValue="# output code"
          value={translation.outputCode}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          title="outputEditor"
        />
      </Box>

      <Box sx={{ gap: 1, marginTop: '10px', marginBottom: '5px', display: 'flex', alignContent: 'center'}}>

        <Typography data-testid="APIStatus">
          API Status: {translation.status}
        </Typography>

        {
          translation.rating != -1 && <Rating
            data-testid="Rating"
            value={translation.rating}
            readOnly={true}
            />
        }

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
            data-testid="translateAgainButton"
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