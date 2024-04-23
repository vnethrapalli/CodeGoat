import OpenAI from "openai";
import hljs from 'highlight.js';
import { json } from "stream/consumers";

export const getLanguage = (code) => {
  const langCodes = [
    "c",
    "cpp",
    "csharp",
    "go",
    "java",
    "javascript",
    "kotlin",
    "php",
    "python",
    "ruby",
    "rust",
    "typescript"
  ];
  const { language } = hljs.highlightAuto(code, langCodes);
  // console.log(`
  //   language: ${language}
  //   relevance: ${relevance}
  //   secondBest: ${secondBest}
  // `)
  return language;
}

export const getTranslation = async ({ code, inLang, outLang }) => {
  let errorInfo = {
    'invalid_request_error' : {
        'code' : 400,
        'description' : 'Your request was malformed or missing some required parameters.',
    },
    'rate_limit_error' : {
        'code' : 429,
        'description' : 'You have hit your assigned rate limit.',
    },
    'tokens_exceeded_error' : {
        'code' : 403,
        'description' : 'You have exceeded the allowed number of tokens in your request.',
    },
    'authentication_error' : {
        'code' : 401,
        'description' : 'Your API key or token was invalid, expired, or revoked.',
    },
    'not_found_error' : {
        'code' : 404,
        'description' : 'The requested resource was not found.',
    },
    'server_error' : {
        'code' : 500,
        'description' : 'An issue occurred on the OpenAI server side.',
    },
    'permission_error' : {
        'code' : 405,
        'description' : 'Your API key or token lacks the required permissions for the requested action.',
    },
  };

  let langcodeToLang = {
    "c": "C",
    "cpp": "C++",
    "csharp": "C#",
    "go": "Go",
    "java": "Java",
    "javascript": "JavaScript",
    "kotlin": "Kotlin",
    "php": "PHP",
    "python": "Python",
    "ruby": "Ruby",
    "rust": "Rust",
    "typescript": "TypeScript"
  };

  const useDummyResponse = 0;
  // character limit because auto detection is screwy with small code snippets
  if (useDummyResponse) {
    return {
      statusCode: 200,
      body: {
        translation: `// converting '${code}' from ${inLang} to ${outLang}`,
        inputLang: `${inLang}`,
        outputLang: `${outLang}`,
      },
    };
  }
  else {
    try {
      /* toggle for using an example prompt for chatgpt */
      let useExample = 0;

      let messages = [];
      if (useExample) {
        messages.push({
          role: "user",
          content: `
          Please convert following Python code to the C programming language:\n\n
          print('hello')
          `.trim()
        });

        messages.push({
          role: "assistant",
          content: `
          #include <stdio.h>\n

          int main() {
            printf("hello\n");
            return 0;
          }
          `.trim()
        });
      }

      /* construct main message request */
      let msg = `
      Translate the following code from ${langcodeToLang[inLang]} to ${langcodeToLang[outLang]}. Provide no backticks at the beginning or end:\n\n${code}`;

      messages.push({ role : "user", content: msg });
      // console.log(messages);

      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
        max_tokens: 16384,
      });

      // for testing, if bad response throw exception so it is caught
      if (!completion.choices) {
        throw Error(JSON.stringify(completion));
      }

      // console.log("gpt response!");
      console.log(completion);
      // console.log(completion.choices[0]);

      return {
        statusCode: 200,
        body: {
          translation: completion.choices[0].message["content"],
          inputLang: `${inLang}`,
          outputLang: `${outLang}`,
        },
      }
    }
    catch (err) {
      console.log(err)
      if (!err.type) {
        err = JSON.parse(err);
      }
      return {
        statusCode: errorInfo[err.type]['code'],
        body: {
          error: errorInfo[err.type]['description'],
        }
      };
    }
  }
}
