import { render, screen, fireEvent, waitFor } from '@redwoodjs/testing/web';
import userEvent from '@testing-library/user-event';
import SubmissionPage from './SubmissionPage';

// https://redwoodjs.com/docs/testing#testing-pages-layouts

const assetsFetchMock = async (url) => {
  return {
    status: 200,
    json: () => Promise.resolve({
      data: "translated code"
    })
  }
}

beforeEach(() => {
  fetchMock = jest.spyOn(global, "fetch")
  .mockImplementation(assetsFetchMock);
});

afterEach(() => {
  jest.restoreAllMocks();
})

const createMatchMedia = (width) => (query) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => {},
  removeListener: () => {}
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// remove comments method specifically for testing with hard coded tokens
const testRemoveComments = (inCode) => {
  let withoutComments = "";
  const tokens = [
    [],
    [
        {
            "offset": 0,
            "type": "comment.java",
            "language": "java"
        }
    ],
    [
        {
            "offset": 0,
            "type": "comment.java",
            "language": "java"
        },
        {
            "offset": 15,
            "type": "",
            "language": "java"
        },
        {
            "offset": 17,
            "type": "keyword.public.java",
            "language": "java"
        },
        {
            "offset": 23,
            "type": "",
            "language": "java"
        },
        {
            "offset": 24,
            "type": "keyword.static.java",
            "language": "java"
        },
        {
            "offset": 30,
            "type": "",
            "language": "java"
        },
        {
            "offset": 31,
            "type": "keyword.void.java",
            "language": "java"
        },
        {
            "offset": 35,
            "type": "",
            "language": "java"
        },
        {
            "offset": 36,
            "type": "identifier.java",
            "language": "java"
        },
        {
            "offset": 40,
            "type": "delimiter.parenthesis.java",
            "language": "java"
        },
        {
            "offset": 41,
            "type": "identifier.java",
            "language": "java"
        },
        {
            "offset": 47,
            "type": "delimiter.square.java",
            "language": "java"
        },
        {
            "offset": 49,
            "type": "",
            "language": "java"
        },
        {
            "offset": 50,
            "type": "identifier.java",
            "language": "java"
        },
        {
            "offset": 54,
            "type": "delimiter.parenthesis.java",
            "language": "java"
        },
        {
            "offset": 55,
            "type": "comment.java",
            "language": "java"
        }
    ],
    [
        {
            "offset": 0,
            "type": "delimiter.curly.java",
            "language": "java"
        }
    ],
    [
        {
            "offset": 0,
            "type": "",
            "language": "java"
        },
        {
            "offset": 1,
            "type": "identifier.java",
            "language": "java"
        },
        {
            "offset": 7,
            "type": "delimiter.java",
            "language": "java"
        },
        {
            "offset": 8,
            "type": "identifier.java",
            "language": "java"
        },
        {
            "offset": 11,
            "type": "delimiter.java",
            "language": "java"
        },
        {
            "offset": 12,
            "type": "identifier.java",
            "language": "java"
        },
        {
            "offset": 19,
            "type": "delimiter.parenthesis.java",
            "language": "java"
        },
        {
            "offset": 20,
            "type": "string.java",
            "language": "java"
        },
        {
            "offset": 34,
            "type": "delimiter.parenthesis.java",
            "language": "java"
        },
        {
            "offset": 35,
            "type": "delimiter.java",
            "language": "java"
        }
    ],
    [
        {
            "offset": 0,
            "type": "delimiter.curly.java",
            "language": "java"
        }
    ],
    [
        {
            "offset": 0,
            "type": "comment.java",
            "language": "java"
        }
    ],
    [],
    []
  ];
  let start = 0;

  for (let i = 0; i < tokens.length; i++)
  {
    for (let j = 0; j < tokens[i].length; j++)
    {
      const tok = tokens[i][j];
      let end;

      if (j != tokens[i].length - 1) // not at last token in a line
      {
        end = start + (tokens[i][j+1].offset - tok.offset);

        if (!tok.type.includes("comment"))
        {
          withoutComments += inCode.substring(start, end);
        }

        // console.log(`start: ${start} end: ${end}`);
        // console.log(inCode.substring(start, end).replaceAll("\n", "&").replaceAll("\r", "|"));
      }
      else if (j == tokens[i].length - 1 && i != tokens.length - 1) // at last token in a line but there are more lines to go
      {
        end = start;

        while (inCode[end] != "\r")
        {
          end++;
        }

        if (!tok.type.includes("comment"))
        {
          withoutComments += inCode.substring(start, end);
        }

        // console.log(`start: ${start} end: ${end}`);
        // console.log(inCode.substring(start, end).replaceAll("\n", "&").replaceAll("\r", "|"));
      }
      else // at last token on last line
      {
        if (!tok.type.includes("comment"))
        {
          withoutComments += inCode.substring(start);
        }

        // console.log(`start: ${start} end: -1`);
        // console.log(inCode.substring(start).replaceAll("\n", "&").replaceAll("\r", "|"));
      }

      start = end;
    }

    if (!(tokens[i].length == 1 && tokens[i][0].type.includes("comment")))
    {
      withoutComments += "\r\n"; // carriage return character and a newline character in between each line
    }

    start += 2;
  }

  return withoutComments;
}

// INITIAL RENDER TESTS
describe('SubmissionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubmissionPage />)
    }).not.toThrow()
  })
})

describe('Render Tests', () => {
  test('renders Translate Button successfully', () => {
    const {unmount} = render(<SubmissionPage />)
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
    unmount();
  })

  test('renders input copy Button successfully', () => {
    const {unmount} = render(<SubmissionPage />)
    expect(screen.getByTestId("inputCopy")).toBeInTheDocument()
    unmount();
  })

  test('renders input Editor successfully', () => {
    const {unmount} = render(<SubmissionPage />)
    expect(screen.getByTestId("inputEditor")).toBeInTheDocument()
    unmount();
  })

  // RENDER TESTS AFTER CLICKING THE TRANSLATE BUTTON
  test('renders output Editor when Translate Button clicked successfully', async() => {
    const {unmount} = render(<SubmissionPage />)
    const button = screen.getByTestId("translateButton");
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByTestId("outputEditor")).toBeInTheDocument())
    unmount();
  })

  test('renders output Copy Button when Translate Button clicked successfully', async() => {
    const {unmount} = render(<SubmissionPage />)
    const button = screen.getByTestId("translateButton");
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByTestId("outputCopy")).toBeInTheDocument())
    unmount();
  })

  test('renders output Download Button when Translate Button clicked successfully', async () => {
    const {unmount} = render(<SubmissionPage />)
    const button = screen.getByTestId("translateButton");
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByTestId("downloadButton")).toBeInTheDocument())
    unmount();
  })

  test('renders output rating Button when Translate Button clicked successfully', async () => {
    const {unmount} = render(<SubmissionPage />)
    const button = screen.getByTestId("translateButton");
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByTestId("ratingButton")).toBeInTheDocument())
    unmount();
  })
})

describe('Button Tests', () => {
  // some variables
  const originalClipboard = { ...global.navigator.clipboard };
  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    jest.resetAllMocks();
    global.navigator.clipboard = originalClipboard;
  });


  // upload test variables
  const readInputFile = jest.fn();

  // download test variables
  const downloadTextAsFile = jest.fn();

  test('input copy Button functions correctly', () => {
    const {unmount} = render(<SubmissionPage/>)
    const button = screen.getByTestId("inputCopy");
    fireEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("// write some code...");
    unmount();
  });

  test('output copy Button functions correctly', async() => {
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));
    await waitFor(() => expect(screen.getByTestId("outputCopy")).toBeInTheDocument());
    const outputCopyBtn = screen.getByTestId('outputCopy');
    fireEvent.click(outputCopyBtn)
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith("translated code"));
    unmount();
  });

  test('input Upload Button functions correctly', async() => {
    const {unmount} = render(<SubmissionPage defaultReadInputFile={readInputFile}/>);
    const button = screen.getByTestId("uploadButton");
    fireEvent.click(button);
    await waitFor(() => expect(readInputFile).toHaveBeenCalled());
    unmount();
  });

  test('output Download Button functions correctly', async() => {
    const {unmount} = render(<SubmissionPage defaultDownloadTextAsFile={downloadTextAsFile}/>)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));
    await waitFor(() => expect(screen.getByTestId("downloadButton")).toBeInTheDocument());
    const outputCopyBtn = screen.getByTestId('downloadButton');
    fireEvent.click(outputCopyBtn);
    await waitFor(() => expect(downloadTextAsFile).toHaveBeenCalled());
    unmount();
  });

  test('scroll to top of page on click', async() => {
    window.scrollTo = jest.fn();
    const {unmount} = render(<SubmissionPage defaultDownloadTextAsFile={downloadTextAsFile}/>)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));
    expect(window.scrollTo).toBeCalledWith(0, 0);
    unmount();
  });
})

describe('Notification Tests', () => {
  test('Successful translation notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 200,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getAllByText(/Code translated successfully/i)[0]).toBeInTheDocument())
    unmount();
    jest.clearAllMocks();
  })

  test('Rate limit notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 429,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getByText(/The API has reached its rate limit. Please try again later/i)).toBeInTheDocument())
    unmount();
    jest.clearAllMocks();
  })

  test('400 notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 400,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));
    await waitFor(() => expect(screen.getByText(/There was an error in the communication between the backend and API. Please try again/i)).toBeInTheDocument())

    unmount();
    jest.clearAllMocks();
  })

  test('403 notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 403,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));
    await waitFor(() => expect(screen.getByText(/The length of the code is too long. Please shorten the code and try again/i)).toBeInTheDocument())

    unmount();
    jest.clearAllMocks();
  })

  test('401 notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 401,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getByText(/There was an error on the backend. Please try again later/i)).toBeInTheDocument())

    unmount();
    jest.clearAllMocks();
  })

  test('404 notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 404,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getByText(/The GPT API is unavalaible/i)).toBeInTheDocument())

    unmount();
    jest.clearAllMocks();
  })

  test('500 notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 500,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getByText(/There was an error on the API side. Please try again/i)).toBeInTheDocument())

    unmount();
    jest.clearAllMocks();
  })

  test('405 notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 405,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getByText(/This action is not permitted by the API. Please try again/i)).toBeInTheDocument())
    unmount();
    jest.clearAllMocks();
  })

  test('Default error notification', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 407,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getByText(/Error translating code/i)).toBeInTheDocument())

    unmount();
    jest.clearAllMocks();
  })
})

describe("Queuing Tests", () => {
  it('sends a message when translation is initially requested and completed, with differing queue sizes', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 200,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getAllByText(/Queued Requests: 1/i)[0]).toBeInTheDocument())
    await waitFor(() => expect(screen.getAllByText(/Queued Requests: 0/i)[0]).toBeInTheDocument())
    unmount();
    jest.clearAllMocks();
  })

  it('adds a request to queue when queue is empty', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 200,
        json: () => Promise.resolve({
          data: "translated code"
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));

    await waitFor(() => expect(screen.getAllByText(/Your request has been sent!/i)[0]).toBeInTheDocument())
    await waitFor(() => expect(screen.getAllByText(/Queued Requests: 1/i)[0]).toBeInTheDocument())
    unmount();
    jest.clearAllMocks();
  })

  it('adds a request to queue when queue is not empty, not full', async () => {
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    const user = userEvent.setup();
    for (let i = 0; i < 100; i++)
      await user.click(translateBtn)

    setTimeout(async () => {
      expect(await screen.getAllByText(/Queued Requests: 2/i)[0]).toBeInTheDocument()
    }, 5000);
    unmount();
    jest.clearAllMocks();
  })

  it('rejects a request to queue when queue is full', async () => {
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    const user = userEvent.setup();
    for (let i = 0; i < 100; i++)
      await user.click(translateBtn)

    setTimeout(async () => {
      expect(await screen.getAllByText(/Slow down/i)[0]).toBeInTheDocument()
    }, 5000);
    unmount();
    jest.clearAllMocks();
  })
})

describe("Code Cleaning", () => {
  it("Removes Comments Successfully", async() => {
    const inCode = "\r\n// comment 1\r\n/* comment 2 */ \tpublic static void main(String[] args)// comment 3\r\n{\r\n\tSystem.out.println(\"hello world!\");\r\n}\r\n// comment 4\r\n\r\n";
    const cleaned = testRemoveComments(inCode);
    expect(cleaned).not.toContain("comment");
  })
})

describe("Auto Detection Mismatch", () => {
  it('User Can Translate Anyway Even if Mismatch Occurs', async() => {
    const assetsFetchMock = async (url) => {
      return {
        status: 400,
        json: () => Promise.resolve({
          data: "Java was detected but you selected Python. Please select the right language."
        })
      }
    }
    fetchMock = jest.spyOn(global, "fetch").mockImplementation(assetsFetchMock);
    const {unmount} = render(<SubmissionPage />);
    const user = userEvent.setup();
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => expect(screen.getByTestId("translateButton").textContent).toBe("Translate"));
    await user.click(translateBtn);
    await waitFor(() => expect(screen.getByTestId("translateButton").textContent).toBe("Translate Anyway"));

    unmount();
    jest.clearAllMocks();
  })
})