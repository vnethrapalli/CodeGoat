import OpenAI from "openai";

export const getTranslation = async ({ code, inLang, outLang }) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  console.log('hello');

  // const completion = await openai.chat.completions.create({
  //   messages: [{ role: "system", content: "You are a helpful assistant." }],
  //   model: "gpt-3.5-turbo",
  //   max_tokens: 8
  // });

  // return {
  //   translation: JSON.stringify(completion.choices[0]),
  //   inputLang: `${inLang}`,
  //   outputLang: `${outLang}`,
  // }

  // console.log(completion.choices[0]);
  return {
    translation: `// converting '${code}' from ${inLang} to ${outLang}`,
    inputLang: `${inLang}`,
    outputLang: `${outLang}`,
  }
}