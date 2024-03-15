import { logger } from 'src/lib/logger'

import { getTranslation } from 'src/services/translation'

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
export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: translate function`)

  console.log(event);

  // get the two numbers to divide from the event query string
  const { code, inputLanguage, outputLanguage } = event.queryStringParameters;
  console.log(code);
  console.log(inputLanguage);
  console.log(outputLanguage);
  // get results from api call
  const response = await getTranslation({ code, inLang: inputLanguage, outLang: outputLanguage });

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
