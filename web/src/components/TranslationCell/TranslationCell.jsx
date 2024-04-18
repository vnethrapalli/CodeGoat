// import Translation from 'src/components/Translation'
import Editor from '@monaco-editor/react';
import { useMutation } from '@redwoodjs/web';
import { Link, routes, navigate, useParams } from '@redwoodjs/router';
import { Box, Button, IconButton, Typography, Rating } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Repeat, Delete } from '@mui/icons-material';
import { useState, useRef } from 'react';

import { QUERY as TranslationQuery } from 'src/components/TranslationsCell'

const DELETE_TRANSLATION = gql`
  mutation DeleteTranslationMutation($id: Int!) {
    deleteTranslation(id: $id) {
      id
    }
  }
`

export const QUERY = gql`
  query FindTranslationQuery($id: Int!) {
    translation: translation(id: $id) {
      id
      uid
      inputLanguage
      outputLanguage
      inputCode
      outputCode
      createdAt
      rating
      status
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ translation, page, uid, inLang, outLang, startDate, endDate, sort, inSort, outSort }) => {
  // return (<Translation translation={translation} />)

  const theme = useTheme();
  const editorRef = useRef(null);
  let currPage = useParams().page;

  if(!page){
    page = 1;
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const [deleteTranslation] = useMutation(DELETE_TRANSLATION, {
    onCompleted: () => {},
    refetchQueries: [{ query: TranslationQuery, variables: { page: Number(page), uid: uid, inLang: inLang, outLang: outLang, startDate: startDate, endDate: endDate, sort: sort, inSort: inSort, outSort: outSort }}],
  })

  const del = () => {
    deleteTranslation({ variables: { id: translation.id }});
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