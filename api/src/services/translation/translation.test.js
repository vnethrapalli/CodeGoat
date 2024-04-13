import { c, cpp, csharp, go, java, javascript, kotlin, php, python, ruby, rust, typescript } from './codeSnippets';
import { getLanguage } from './translation';

const MILLIS_PER_SEC = 1000;

describe("testing GPT for variety of structures/languages", () => {
  // test('c', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: c, inLang: "c", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('cpp', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: cpp, inLang: "cpp", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('csharp', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: csharp, inLang: "csharp", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('go', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: go, inLang: "go", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('java', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: java, inLang: "java", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('javascript', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: javascript, inLang: "javascript", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('kotlin', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: kotlin, inLang: "kotlin", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('php', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: php, inLang: "php", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('python', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: python, inLang: "python", outLang: "javascript" });
  //   expect(getLanguage(response.body.translation)).toBe("javascript");
  // }, MILLIS_PER_SEC * 60);

  // test('ruby', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: ruby, inLang: "ruby", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('rust', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: rust, inLang: "rust", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);

  // test('typescript', async () => {
  //   const { getTranslation } = require('./translation');
  //   const response = await getTranslation({ code: typescript, inLang: "typescript", outLang: "python" });
  //   expect(getLanguage(response.body.translation)).toBe("python");
  // }, MILLIS_PER_SEC * 60);
});

describe("testing valid openai api key", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("valid openai api key response", async () => {
    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                return {
                  choices: [{ message: { "content" : "This is a sample response!" } }]
                }
              })
            }
          }
        };
      });
    });
    const { getTranslation } = require('./translation');
    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toBe(200);
    expect(response.body.translation).toEqual("This is a sample response!");
  });
});

describe("testing invalid openai api key", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterEach(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('testing invalid openai api key numeric', async () => {
    process.env.OPENAI_API_KEY = 5;

    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                const err = { type: 'authentication_error' }
                throw err;
              })
            }
          }
        };
      });
    });
    const { getTranslation } = require('./translation');

    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(401);
  });

  test('testing invalid openai api key bad string', async () => {
    process.env.OPENAI_API_KEY = 'sk-alkdUalsKdjalLsd';

    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                const err = { type: 'authentication_error' }
                throw err;
              })
            }
          }
        };
      });
    });
    const { getTranslation  } = require('./translation');

    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(401);
  });
})

describe('testing error openai api error responses', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('testing handling for a bad request', async () => {
    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                const err = { type: 'invalid_request_error' }
                throw err;
              })
            }
          }
        };
      });
    });
    const { getTranslation } = require('./translation');

    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(400);
  });

  test('testing handling for a rate limiting error', async () => {
    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                const err = { type: 'rate_limit_error' }
                throw err;
              })
            }
          }
        };
      });
    });
    const { getTranslation } = require('./translation');

    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(429);
  });

  test('testing handling for tokens exceeded error', async () => {
    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                const err = { type: 'tokens_exceeded_error' }
                throw err;
              })
            }
          }
        };
      });
    });
    const { getTranslation } = require('./translation');

    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(403);
  });

  test('testing handling for resource not found error', async () => {
    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                const err = { type: 'not_found_error' }
                throw err;
              })
            }
          }
        };
      });
    });
    const { getTranslation } = require('./translation');

    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(404);
  });

  test('testing handling for server error', async () => {
    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                const err = { type: 'server_error' }
                throw err;
              })
            }
          }
        };
      });
    });
    const { getTranslation } = require('./translation');

    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(500);
  });

  test('testing handling for permission error', async () => {
    jest.doMock('openai', () => {
      return jest.fn().mockImplementation(() => {
        return {
          chat: {
            completions: {
              create: jest.fn().mockImplementationOnce(async () => {
                const err = { type: 'permission_error' }
                throw err;
              })
            }
          }
        };
      });
    });
    const { getTranslation } = require('./translation');

    const response = await getTranslation({ code: "test", inLang: "python", outLang: "java" });
    expect(response.statusCode).toEqual(405);
  });
})