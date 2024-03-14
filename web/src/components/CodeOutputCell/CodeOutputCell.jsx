import Editor from '@monaco-editor/react';
import React, { useRef } from 'react';

export const QUERY = gql`
  query GetCodeOutputQuery($code: String!, $inLang: String!, $outLang: String!) {
    codeOutput: getTranslation(code: $code, inLang: $inLang, outLang: $outLang) {
      translation
      inputLang
      outputLang
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ codeOutput }) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  console.log(codeOutput);

  return (
    <div data-testid="outputEditor">
      <Editor
        height='600px'
        width="40vw"
        m='10px'
        language={codeOutput.outputLang}
        value={codeOutput.translation}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        title="outputEditor"
        options={{domReadOnly: true, readOnly: true}}
      />
    </div>
  );
}
