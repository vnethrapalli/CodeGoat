import OpenAI from "openai";
import hljs from 'highlight.js';

export const getLanguage = (code) => {
    const languages = [
      {dropdownItem: "C++", langCode: "cpp"},
      {dropdownItem: "C#", langCode: "csharp"},
      {dropdownItem: "Java", langCode: "java"},
      {dropdownItem: "JavaScript", langCode: "javascript"},
      {dropdownItem: "Python", langCode: "python"},
      {dropdownItem: "TypeScript", langCode: "typescript"},
    ];

    let langCodes = [];
    for (let i = 0; i < languages.length; i++)
        langCodes.push(languages[i].langCode);

    const { language } = hljs.highlightAuto(code, langCodes);
    return language;
}

export const getTranslation = async ({ code, inLang, outLang }) => {
  const useDummyResponse = 1;
  try {
    // const key = process.env.OPENAI_API_KEY;
    // make sure type string
    // if (typeof key !== 'string') {
    //   throw TypeError("key is of invalid type");
    // }
    // else {
    //   // simple regex check to block some strings
    //   let pattern = /^sk-[0-9a-zA-Z]*$/;
    //   if (!(pattern.test(key)))
    //     throw Error("invalid key");
    // }

    // console.log('hellooooo')

    // character limit because auto detection is screwy with small code snippets

    if (useDummyResponse) {
      return {
        statusCode: 200,
        translation: `// converting '${code}' from ${inLang} to ${outLang}`,
        inputLang: `${inLang}`,
        outputLang: `${outLang}`,
      };
    }
    else {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
        max_tokens: 8
      });

      return {
        statusCode: 200,
        translation: JSON.stringify(completion.choices[0]),
        inputLang: `${inLang}`,
        outputLang: `${outLang}`,
      }
    }
  }
  catch(err) {
    return {
      statusCode: 401,
    };
  }

}