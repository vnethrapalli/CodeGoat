import { Metadata, useMutation } from '@redwoodjs/web';
import { gql, useLazyQuery } from "@apollo/client";
import { Grid, Paper, Stack, Box, Button, FormControl, InputLabel, Select, MenuItem, Divider, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Editor, { useMonaco } from '@monaco-editor/react';
import { Toaster, toast } from '@redwoodjs/web/toast'
import React, { useEffect, useRef, useState } from 'react';
import { auth0 } from 'src/auth'
import { useParams } from '@redwoodjs/router'
import { ConfirmationNumberOutlined, ConnectingAirportsOutlined, ConstructionOutlined, ContentPasteSearchOutlined, Download, UploadFile, ContentCopy } from '@mui/icons-material';

const CREATE_TRANSLATION = gql`
  mutation CreateTranslationMutation($input: CreateTranslationInput!) {
    createTranslation(input: $input) {
      uid
      inputLanguage
      outputLanguage
      inputCode
      outputCode
      rating
      status
    }
  }
`

const UPDATE_TRANSLATION = gql`
  mutation UpdateTranslationMutation($input: UpdateTranslationInput = {}, $id: Int = 10) {
    updateTranslation(id: $id, input: $input) {
      rating
    }
  }
`

const FETCH_TRANSLATION = gql`
  query Redwood($uid: String = "") {
    translations(uid: $uid) {
      translations {
        id
      }
    }
  }
`

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
const MAXQUEUE = 2;

const SubmissionPage = ({ defaultReadInputFile, defaultDownloadTextAsFile }) => {
  const [inputCodeValue, setInputCodeValue] = React.useState("// write some code...");
  const [outputCodeValue, setOutputCodeValue] = React.useState("Processing...");
  const [inputLanguage, setInputLanguage] = React.useState("javascript");
  const [outputLanguage, setOutputLanguage] = React.useState("python");
  // const [status, setStatus] = React.useState("500 Server Error")
  const [rating, setRating] = React.useState(5);
  const [refreshQuery, setRefreshQuery] = React.useState(true);
  const [output, setOutput] = React.useState(false);
  const [userId, setUserId] = React.useState();
  const [inputMonaco, setInputMonaco] = React.useState();
  const theme = useTheme();

  const { code, inLang, outLang } = useParams();

  useEffect(()=>{
    auth0.getUser().then(user => {
      if(user){
        setUserId(user.sub);
      }
    })

    if(code){
      setInputCodeValue(code);
    }

    if(inLang){
      setInputLanguage(inLang);
    }

    if(outLang){
      setOutputLanguage(outLang);
    }
  },[])

  const CodeBox = ({ codeValue, updateCodeValue, defaultLanguage, language, defaultValue, isInput }) => {
    const monaco = useMonaco();
    const theme = useTheme();

    useEffect(() => {
      if(monaco) {
        // console.log(monaco.editor.tokenize(codeValue, language));
        // console.log(`Code Value: ${codeValue}`);
        setInputMonaco(monaco);
      }
    }, [monaco]);

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;
    }

    // const customTheme = {
    //   base: 'vs',
    //   inherit: true,
    //   rules: [],
    //   colors: {"editor.background": theme.palette.background.default}
    // };

    return (
      <Paper square={false} elevation={6} data-testid={isInput ? "inputEditor" : "outputEditor"} width='100%'>
        <Editor
          height='600px'
          width="100%"
          m='10px'
          defaultLanguage={defaultLanguage}
          language={language}
          defaultValue={defaultValue}
          value={codeValue}
          // theme="myCustomTheme"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={updateCodeValue}
          title={isInput ? "inputEditor" : "outputEditor"}
          // beforeMount={(monaco) => {
          //   monaco.editor.defineTheme('myCustomTheme', customTheme);
          // }}
        />
      </Paper>
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
      <Box>
        <InputLabel>{text}</InputLabel>
        <FormControl size='small'>
          <Select
            style={{ color: theme.palette.text.secondary, minWidth: '100px' }}
            variant="outlined"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            inputProps={{
              MenuProps: {
                MenuListProps: {
                  sx: {
                      backgroundColor: theme.palette.background.default,
                  }
                }
              }
            }}
          >
            {languages.map((lang) => (
              <MenuItem
                style={{
                    color: theme.palette.text.secondary,
                }}
                value={lang.langCode}
                key={lang.langCode}
              >
                  {lang.dropdownItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    )
  }

  const TranslateBtn = () => {
    const [queue, setQueue] = React.useState(Promise.resolve())
    const [createTranslation] = useMutation(CREATE_TRANSLATION, {
      onCompleted: () => {},
      onError: () => {},
    })

    const removeComments = (inCode, inLang) => {
      if (inputMonaco == undefined)
      {
        return;
      }

      let withoutComments = "";
      const tokens = inputMonaco.editor.tokenize(inCode, inLang);
      let start = 0;
      // console.log(tokens);

      for (let i = 0; i < tokens.length; i++)
      {
        for (let j = 0; j < tokens[i].length; j++)
        {
          const tok = tokens[i][j];
          let end;

          if (j != tokens[i].length - 1) // not at last token in a line
          {
            end = start + (tokens[i][j+1].offset - tok.offset);

            if (!tok.type.includes("comment"))
            {
              withoutComments += inCode.substring(start, end);
            }

            // console.log(`start: ${start} end: ${end}`);
            // console.log(inCode.substring(start, end).replaceAll("\n", "&").replaceAll("\r", "|"));
          }
          else if (j == tokens[i].length - 1 && i != tokens.length - 1) // at last token in a line but there are more lines to go
          {
            end = start;

            while (inCode[end] != "\r")
            {
              end++;
            }

            if (!tok.type.includes("comment"))
            {
              withoutComments += inCode.substring(start, end);
            }

            // console.log(`start: ${start} end: ${end}`);
            // console.log(inCode.substring(start, end).replaceAll("\n", "&").replaceAll("\r", "|"));
          }
          else // at last token on last line
          {
            if (!tok.type.includes("comment"))
            {
              withoutComments += inCode.substring(start);
            }

            // console.log(`start: ${start} end: -1`);
            // console.log(inCode.substring(start).replaceAll("\n", "&").replaceAll("\r", "|"));
          }

          start = end;
        }

        if (!(tokens[i].length == 1 && tokens[i][0].type.includes("comment")))
        {
          withoutComments += "\r\n"; // carriage return character and a newline character in between each line
        }

        start += 2;
      }

      return withoutComments;
    }

    const translate = (usId, inLang, outLang, inCode, outCode, stars, stat) => {
      createTranslation({ variables: { input: { "uid": usId, "inputLanguage": inLang, "outputLanguage": outLang, "inputCode": inCode, "outputCode": outCode, "rating": stars, "status": stat }}});
    }

    const translateRequest = (async () => {
      if (queueCount < MAXQUEUE) {
        queueCount++;
        toast.dismiss();
        toast.success("Your request has been sent! \nQueued Requests: " + queueCount.toString(), {duration: 1200, position: 'bottom-right'});
      } else {
        toast.dismiss();
        toast.error("Slow down there! I can't afford all those API calls lmao", {duration: 2500, position: 'bottom-right'});
        return;
      }
      const reqUrl = `http://localhost:8910/.redwood/functions/translate`;
      const translation = await fetch(reqUrl, {
        method: "POST",
        body: JSON.stringify({
          code: removeComments(inputCodeValue, inputLanguage),
          inputLanguage: inputLanguage,
          outputLanguage: outputLanguage
        })
      });

      let response = translation;
      let statusCode = response.status;
      response = await response.json();

      setOutputCodeValue(response.data);
      setOutput(true);
      setRefreshQuery(val => !val);
      queueCount--;

      if(statusCode === 200) {
        toast.success("Code translated successfully! \nQueued Requests: " + queueCount.toString(), { duration: 1500, position: 'bottom-right' });
        setOutputCodeValue(response.data);
      } else {
        switch(statusCode) {
          case 429:
            toast.error("The API has reached its rate limit. Please try again later.", { duration: 2500, position: 'bottom-right' });
            break;
          case 400:
            toast.error("There was an error in the communication between the backend and API. Please try again.", { duration: 2500, position: 'bottom-right' });
            break;
          case 403:
            toast.error("The length of the code is too long. Please shorten the code and try again.", { duration: 2500, position: 'bottom-right' });
            break;
          case 401:
            toast.error("There was an error on the backend. Please try again later.", { duration: 2500, position: 'bottom-right' });
            break;
          case 404:
            toast.error("The GPT API is unavalaible", { duration: 2500, position: 'bottom-right' });
            break;
          case 500:
            toast.error("There was an error on the API side. Please try again.", { duration: 2500, position: 'bottom-right' });
            break;
          case 405:
            toast.error("This action is not permitted by the API. Please try again.", { duration: 2500, position: 'bottom-right' });
            break;
          default:
            toast.error("Error translating code.", { duration: 2500, position: 'bottom-right' });
            break;
        }
      }

      translate(userId, inputLanguage, outputLanguage, inputCodeValue, response.data, -1, translation.status + " " + translation.statusText);
      window.scrollTo(0, 0);
    });

    return (
      <>
        <Box textAlign="center" pt={2}>
          <Button
            variant="contained"
            data-testid="translateButton"
            style={{
              backgroundColor: theme.palette.text.success,
              color: theme.palette.text.primary,
              textTransform: 'none'
            }}
            sx={{
              width: "200px",
              borderRadius: "6px",
              marginBottom: "25px",
            }}
            onClick={async () => {
              setQueue(queue
                .then(() => {
                  translateRequest();
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
          backgroundColor: theme.palette.text.success,
          textTransform: 'none',
          borderTopLeftRadius: '6px',
          borderBottomLeftRadius: '6px',
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
          height: '40px'
        }}
        data-testid={isInput ? "inputCopy" : "outputCopy"}
      >
        <ContentCopy sx={{ fill: theme.palette.text.primary }} />
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
              backgroundColor: theme.palette.text.success,
              textTransform: 'none',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px',
              height: '40px'
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
          backgroundColor: theme.palette.text.success,
          textTransform: 'none',
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
          borderTopRightRadius: '6px',
          borderBottomRightRadius: '6px',
          height: '40px'
        }}
        onClick={() => {
          // console.log(outputLanguage);
          downloadTextAsFile(codeboxOutput.props.children.props.value, 'code_output' + extensions[outputLanguage]);
        }}
        data-testid="downloadButton"
        >
        <Download sx={{ fill: theme.palette.text.primary }} />
      </Button>
    )
  }

  const DropdownAndButtons = ({ input }) => {
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center" width='100%' height="100%">
        <Grid item direction="row" display='flex' justifyContent="flex-start" alignItems="center" xs={9}>
          <Box>
            <LangDropdown text="Source Language" language={inputLanguage} setLanguage={(newLang) => setInputLanguage(newLang)} />
          </Box>
          <Box sx={{ marginLeft: '10px' }}>
            <LangDropdown text="Target Language" language={outputLanguage} setLanguage={(newLang) => setOutputLanguage(newLang)} />
          </Box>
        </Grid>
        <Grid label="hello" item direction="row" spacing={0} sx={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: "flex-end", minHeight: '100%' }} xs={3}>
          <CopyButton editor={codeboxInput} isInput={input}/>
          <Divider orientation="vertical"  style={{ backgroundColor: theme.palette.background.default, width: '0.5%', height: '40px' }}/>
          <UploadButtonInput/>
        </Grid>
      </Grid>
    );
  }

  const NoDropdownAndButtons = ({ input }) => {
    return (
      <Grid container direction="row" justifyContent="center" alignItems="center" width='100%' height="100%">
        <Grid item xs={9} />
        <Grid label="hello" item direction="row" spacing={0} sx={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: "flex-end", minHeight: '100%' }} xs={3}>
          <CopyButton editor={input ? codeboxInput : codeboxOutput} isInput={input} />
          <Divider orientation="vertical" style={{ backgroundColor: theme.palette.background.default, width: '0.5%', height: '40px' }}/>
          <DownloadButton/>
        </Grid>
      </Grid>
    );
  }

  const RatingButton = () => {
    const [updateTranslation] = useMutation(UPDATE_TRANSLATION, {
      onCompleted: () => {},
      onError: (err) => {},
    })

    const [getTranslation, { loading, error, data }] = useLazyQuery(
      FETCH_TRANSLATION,
      {
        variables: { uid: userId }
      }
    );

    useEffect(() => {
      getTranslation();
    }, [rating, refreshQuery]);

    const provideRating = () => {
      getTranslation();
      // console.log(data);
      // console.log(rating);

      if (error)
      {
        toast.error("An Error Occurred", {duration: 2500, position: 'bottom-right'});
      }
      else if (loading)
      {
        toast.loading("Loading...", {duration: 2500, position: 'bottom-right'});
      }
      else
      {
        toast.success("Rating Submitted!", {duration: 2500, position: 'bottom-right'});
        const arr = data.translations.translations;
        const id = arr[0].id;
        updateTranslation({ variables: { id: id, input: { "rating": rating }}});
      }
    }

    return (
      <Button
        variant="contained"
        style={{
          backgroundColor: theme.palette.text.success,
          color: theme.palette.text.primary,
          textTransform: 'none'
        }}
        sx={{
          width: "200px",
          borderRadius: "6px",
          marginBottom: "25px",
        }}
        onClick={() => {
          provideRating();
        }}
        data-testid="ratingButton"
      >
        Rate This Translation
      </Button>
    );
  }

  return (
    <>
      <Metadata title="Translate" description="Translation Page"/>
      <Toaster />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexWrap: 'wrap', width: '100%'}}>
        <Grid
          container
          direction="row"
          spacing={2}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}
          width='100%'
        >
          <Grid item xs />
          <Grid item direction="column" justifyContent="space-between" alignItems="center" width='100%' height='100%' xs={output ? 10 : 5}>
            <Grid container direction="row" width='100%' height='100%' marginBottom='10px' spacing={2}>
              <Grid item xs={output ? 6 : 12}>
                <DropdownAndButtons input={true} />
              </Grid>
              {output &&
              <Grid item xs={6} spacing={0} sx={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: "flex-end", minHeight: '100%' }}>
                <NoDropdownAndButtons input={false} />
              </Grid>
              }
            </Grid>
            <Grid container direction="row" width='100%' height='100%' spacing={2}>
              <Grid item xs={output ? 6 : 12}>
                {codeboxInput}
              </Grid>

              {output &&
                <Grid item xs={6}>
                  {codeboxOutput}
                </Grid>
              }
            </Grid>
          </Grid>
          <Grid item xs />
        </Grid>

        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" width='100%'>
          <TranslateBtn/>
          {output &&
          <>
            <Rating
              defaultValue={5}
              onChange={(event, val) => {
                if (val == null) val = 0;
                setRating(val);
              }}
            />
            <RatingButton/>
          </>}
        </Stack>
      </Box>
    </>
  );
}

export default SubmissionPage;
