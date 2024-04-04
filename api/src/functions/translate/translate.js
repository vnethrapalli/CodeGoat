import { logger } from 'src/lib/logger'
import { getTranslation, getLanguage } from 'src/services/translation'

import { useRequireAuth } from '@redwoodjs/graphql-server'
import { authDecoder } from '@redwoodjs/auth-auth0-api'
import { getCurrentUser, isAuthenticated } from 'src/lib/auth'


/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
const myHandler = async (event, _context) => {
  let statusCode = 200;
  try {
    const { code, inputLanguage, outputLanguage } = JSON.parse(event.body);

    if (code === undefined || inputLanguage === undefined || outputLanguage === undefined) {
      statusCode = 400;
      throw Error("please provide all three of code, input language, and output language");
    }

    const detectedLanguage = getLanguage(code);

    if (detectedLanguage !== inputLanguage) {
      statusCode = 400;
      throw Error(`${detectedLanguage} was detected but you selected ${inputLanguage}. Please select the right language.`);
    }
    let codeForTranslation = code.trim();

    // get results from api call
    const response = await getTranslation({ code: codeForTranslation, inLang: inputLanguage, outLang: outputLanguage });

    // successful response!
    if (response.statusCode == 200) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: response.body.translation,
        }),
      }
    }
    else {
      return {
        statusCode: response.statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: response.body.error,
        }),
      }
    }
  }
  catch (err) {
    console.log(err);
    return {
      statusCode,
      body: {
        data: err.message,
      },
    }
  }
}

export const handler = useRequireAuth({
  handlerFn: myHandler,
  getCurrentUser,
  authDecoder,
})