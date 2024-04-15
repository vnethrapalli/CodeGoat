import { c, cpp, csharp, go, java, javascript, kotlin, php, python, ruby, rust, typescript } from './codeSnippets';
import { forLoop, _function, object, ifStatement, recursion, _import, countSubstr } from './codeSnippets';
import { getLanguage } from './translation';

const MILLIS_PER_SEC = 1000;

describe("testing GPT for variety of languages", () => {
  const { getTranslation } = require('./translation');

  test('c', async () => {
    const response = await getTranslation({ code: c, inLang: "c", outLang: "python" });
    setTimeout(() => {
      expect(getLanguage(response.body.translation)).toBe("python");
    }, MILLIS_PER_SEC * 20);
  }, MILLIS_PER_SEC * 100);

  // test('cpp', async () => {
  //   const response = await getTranslation({ code: cpp, inLang: "cpp", outLang: "python" });
  //   setTimeout(() => {
  //     expect(getLanguage(response.body.translation)).toBe("python");
  //   }, MILLIS_PER_SEC * 20);
  // }, MILLIS_PER_SEC * 100);

  // test('csharp', async () => {
  //   const response = await getTranslation({ code: csharp, inLang: "csharp", outLang: "python" });
  //   setTimeout(() => {
  //     expect(getLanguage(response.body.translation)).toBe("python");
  //   }, MILLIS_PER_SEC * 20);
  // }, MILLIS_PER_SEC * 100);

  test('go', async () => {
    const response = await getTranslation({ code: go, inLang: "go", outLang: "python" });
    setTimeout(() => {
      expect(getLanguage(response.body.translation)).toBe("python");
    }, MILLIS_PER_SEC * 20);
  }, MILLIS_PER_SEC * 100);

  // test('java', async () => {
  //   const response = await getTranslation({ code: java, inLang: "java", outLang: "python" });
  //   setTimeout(() => {
  //     expect(getLanguage(response.body.translation)).toBe("python");
  //   }, MILLIS_PER_SEC * 20);
  // }, MILLIS_PER_SEC * 100);

  // test('javascript', async () => {
  //   const response = await getTranslation({ code: javascript, inLang: "javascript", outLang: "python" });
  //   setTimeout(() => {
  //     expect(getLanguage(response.body.translation)).toBe("python");
  //   }, MILLIS_PER_SEC * 20);
  // }, MILLIS_PER_SEC * 100);

  test('kotlin', async () => {
    const response = await getTranslation({ code: kotlin, inLang: "kotlin", outLang: "python" });
    setTimeout(() => {
      expect(getLanguage(response.body.translation)).toBe("python");
    }, MILLIS_PER_SEC * 20);
  }, MILLIS_PER_SEC * 100);

  test('php', async () => {
    const response = await getTranslation({ code: php, inLang: "php", outLang: "python" });
    setTimeout(() => {
      expect(getLanguage(response.body.translation)).toBe("python");
    }, MILLIS_PER_SEC * 20);
  }, MILLIS_PER_SEC * 100);

  // test('python', async () => {
  //   const response = await getTranslation({ code: python, inLang: "python", outLang: "javascript" });
  //   setTimeout(() => {
  //     expect(getLanguage(response.body.translation)).toBe("javascript");
  //   }, MILLIS_PER_SEC * 20);
  // }, MILLIS_PER_SEC * 100);

  test('ruby', async () => {
    const response = await getTranslation({ code: ruby, inLang: "ruby", outLang: "python" });
    setTimeout(() => {
      expect(getLanguage(response.body.translation)).toBe("python");
    }, MILLIS_PER_SEC * 20);
  }, MILLIS_PER_SEC * 100);

  test('rust', async () => {
    const response = await getTranslation({ code: rust, inLang: "rust", outLang: "python" });
    setTimeout(() => {
      expect(getLanguage(response.body.translation)).toBe("python");
    }, MILLIS_PER_SEC * 20);
  }, MILLIS_PER_SEC * 100);

  // test('typescript', async () => {
  //   const response = await getTranslation({ code: typescript, inLang: "typescript", outLang: "python" });
  //   setTimeout(() => {
  //     expect(getLanguage(response.body.translation)).toBe("python");
  //   }, MILLIS_PER_SEC * 20);
  // }, MILLIS_PER_SEC * 100);
});

describe("testing GPT for variety of structures", () => {
  const { getTranslation } = require('./translation');

  test('for loop', async () => {
    const response = await getTranslation({ code: forLoop, inLang: "java", outLang: "python" });
    setTimeout(() => {}, MILLIS_PER_SEC * 20);
    expect(response.body.translation.indexOf("for") > -1).toBe(true);
  }, MILLIS_PER_SEC * 100);

  test('function', async () => {
    const response = await getTranslation({ code: _function, inLang: "python", outLang: "go" });
    setTimeout(() => {}, MILLIS_PER_SEC * 20);
    expect(response.body.translation.indexOf("func") > -1).toBe(true);
  }, MILLIS_PER_SEC * 100);

  test('object', async () => {
    const response = await getTranslation({ code: object, inLang: "java", outLang: "python" });
    setTimeout(() => {}, MILLIS_PER_SEC * 20);
    expect(response.body.translation.indexOf("class") > -1).toBe(true);
  }, MILLIS_PER_SEC * 100);

  test('if statement', async () => {
    const response = await getTranslation({ code: ifStatement, inLang: "javascript", outLang: "python" });
    setTimeout(() => {}, MILLIS_PER_SEC * 20);
    expect(response.body.translation.indexOf("if") > -1).toBe(true);
  }, MILLIS_PER_SEC * 100);

  test('recursion', async () => {
    const response = await getTranslation({ code: recursion, inLang: "javascript", outLang: "python" });
    setTimeout(() => {}, MILLIS_PER_SEC * 20);
    expect(countSubstr(response.body.translation, "factorial")).toBe(3);
  }, MILLIS_PER_SEC * 100);

  test('import', async () => {
    const response = await getTranslation({ code: _import, inLang: "python", outLang: "javascript" });
    setTimeout(() => {}, MILLIS_PER_SEC * 20);
    expect(response.body.translation.indexOf("import") > -1).toBe(true);
  }, MILLIS_PER_SEC * 100);
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