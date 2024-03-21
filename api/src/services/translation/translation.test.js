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