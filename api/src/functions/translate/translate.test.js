import { mockHttpEvent } from '@redwoodjs/testing/api'
import { handler } from './translate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('code, input, and output is required',  () => {
  it('requires code', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        inputLanguage: 'python',
        outputLanguage: 'javascript',
      },
    })

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(400);
    expect(body.message).toEqual('please provide all three of code, input language, and output language')
  });

  it('requires input language', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        code: "print('hello world!')",
        outputLanguage: 'javascript',
      },
    })

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(400);
    expect(body.message).toEqual('please provide all three of code, input language, and output language')
  });

  it('requires output language', async () => {
    const httpEvent = mockHttpEvent({
      queryStringParameters: {
        code: "print('hello world!')",
        inputLanguage: 'python',
      },
    })

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(400);
    expect(body.message).toEqual('please provide all three of code, input language, and output language')
  });
});
