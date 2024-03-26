import { render, screen, fireEvent, waitFor } from '@redwoodjs/testing/web';
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
    for (let i = 0; i < 100; i++)
      fireEvent.click(translateBtn)

    setTimeout(async () => {
      expect(await screen.getAllByText(/Queued Requests: 2/i)[0]).toBeInTheDocument()
    }, 5000);
    unmount();
    jest.clearAllMocks();
  })

  it('rejects a request to queue when queue is full', async () => {
    const {unmount} = render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    for (let i = 0; i < 100; i++)
      fireEvent.click(translateBtn)

    setTimeout(async () => {
      expect(await screen.getAllByText(/Slow down/i)[0]).toBeInTheDocument()
    }, 5000);
    unmount();
    jest.clearAllMocks();
  })
})