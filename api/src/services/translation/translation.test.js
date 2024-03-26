import { getTranslation } from './translation'

// const mockCreate = jest.fn().mockResolvedValue({
//   choices: [{ message: { "content" : "This is a sample response!" } }]
// });

const mockCreate = jest.fn().mockImplementationOnce(async () => {
  return {
    choices: [{ message: { "content" : "This is a sample response!" } }]
  }
})
.mockImplementationOnce(async () => {
  const err = { type: 'authentication_error' }
  throw err;
})
.mockImplementationOnce(async () => {
  const err = { type: 'authentication_error' }
  throw err;
})
.mockImplementationOnce(async () => {
  const err = { type: 'invalid_request_error' }
  throw err;
})
.mockImplementationOnce(async () => {
  const err = { type: 'rate_limit_error' }
  throw err;
})
.mockImplementationOnce(async () => {
  const err = { type: 'tokens_exceeded_error' }
  throw err;
})
.mockImplementationOnce(async () => {
  const err = { type: 'not_found_error' }
  throw err;
})
.mockImplementationOnce(async () => {
  const err = { type: 'server_error' }
  throw err;
})
.mockImplementationOnce(async () => {
  const err = { type: 'permission_error' }
  throw err;
});

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: mockCreate
        }
      }
    };
  });
});


describe("testing valid openai api key", () => {
  test("valid openai api key response", async () => {
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toBe(200);
    expect(response.body.translation).toEqual("This is a sample response!");
  });
});

describe("testing invalid openai api key", () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('testing invalid openai api key numeric', async () => {
    process.env.OPENAI_API_KEY = 5;
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(401);
  });

  test('testing invalid openai api key bad string', async () => {
    process.env.OPENAI_API_KEY = 'sk-alkdUalsKdjalLsd';
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(401);
  });
})

describe('testing error openai api error responses', () => {
  test('testing handling for a bad request', async () => {
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(400);
  });

  test('testing handling for a rate limiting error', async () => {
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(429);
  });

  test('testing handling for tokens exceeded error', async () => {
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(403);
  });

  test('testing handling for resource not found error', async () => {
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(404);
  });

  test('testing handling for server error', async () => {
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(500);
  });

  test('testing handling for permission error', async () => {
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(405);
  });

})
