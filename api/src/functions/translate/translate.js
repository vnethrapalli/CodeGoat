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
  logger.info(`${event.httpMethod} ${event.path}: translate function`)
  // if (isAuthenticated()) {
  let statusCode = 200;

  try {
    const { code, inputLanguage, outputLanguage } = event.queryStringParameters;

    if (code === undefined || inputLanguage === undefined || outputLanguage === undefined) {
      statusCode = 400;
      throw Error("please provide all three of code, input language, and output language");
    }

    code = code.trim();

    // only for code snippets with 500 chars or greater because auto detection is screwy for small code snippets
    if (getLanguage(code) !== inputLanguage && code.length >= 500)
    {
      statusCode = 400;
      throw Error("Please select the right language for your code.");
    }

    code = code.trim();

    // get results from api call
    const response = await getTranslation({ code, inLang: inputLanguage, outLang: outputLanguage });

    if (response.statusCode == 200) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: response.translation,
        }),
      }
    }
    else {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: "error",
        }),
      }
    }
  }
  catch (err) {
    return {
      statusCode,
      body: {
        message: err.message,
      },
    }
  }

  //}
  // else {
  //   console.log("unathenaticated access denied");

  //   return {
  //     statusCode: 401,
  //   }
  // }
}

export const handler = useRequireAuth({
  handlerFn: myHandler,
  getCurrentUser,
  authDecoder,
})