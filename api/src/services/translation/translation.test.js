import { getTranslation } from './translation'

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

describe("testing valid openai api key", () => {
  // const originalCreate = { ...global.openai.chat.completions };
  beforeEach(() => {
    const mockAPIRequest = {
      chat: {
        completions: {
          create: jest.fn().mockImplementation(() => {
            return {
              statusCode: 200,
            };
          }),
        },
      }
    };
    global.openai = mockAPIRequest;
  });

  // afterEach(() => {
  //   jest.resetAllMocks();
  //   global.openai.chat.completions = originalCreate;
  // });

  test("valid openai api key response", async () => {
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toBe(200);
  });
});