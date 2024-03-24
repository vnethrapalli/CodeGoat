import { render, screen, fireEvent, waitFor, userEvent } from '@redwoodjs/testing/web';
import SubmissionPage from './SubmissionPage';
import { toast } from '@redwoodjs/web/toast'
import { act } from 'react-dom/test-utils';

// https://redwoodjs.com/docs/testing#testing-pages-layouts

// INITIAL RENDER TESTS
describe('SubmissionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubmissionPage />)
    }).not.toThrow()
  })
})

describe('Render tests', () => {
  test('renders Translate Button successfully', () => {
    render(<SubmissionPage />)
    expect(screen.getByTestId("translateButton")).toBeInTheDocument()
  })

  test('renders input copy Button successfully', () => {
    render(<SubmissionPage />)
    expect(screen.getByTestId("inputCopy")).toBeInTheDocument()
  })

  test('renders input Editor successfully', () => {
    render(<SubmissionPage />)
    expect(screen.getByTestId("inputEditor")).toBeInTheDocument()
  })

  // RENDER TESTS AFTER CLICKING THE TRANSLATE BUTTON
  test('renders output Editor when Translate Button clicked successfully', async() => {
    render(<SubmissionPage />)
    const button = screen.getByTestId("translateButton");
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByTestId("outputEditor")).toBeInTheDocument())
  })

  test('renders output Copy Button when Translate Button clicked successfully', async() => {
    render(<SubmissionPage />)
    const button = screen.getByTestId("translateButton");
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByTestId("outputCopy")).toBeInTheDocument())
  })

  test('renders output Download Button when Translate Button clicked successfully', async () => {
    render(<SubmissionPage />)
    const button = screen.getByTestId("translateButton");
    fireEvent.click(button);
    await waitFor(() => expect(screen.getByTestId("downloadButton")).toBeInTheDocument())
  })
})

describe('Button tests', () => {

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
    render(<SubmissionPage/>)
    const button = screen.getByTestId("inputCopy");
    fireEvent.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("// write some code...");
  });

  test('output copy Button functions correctly', async() => {
    render(<SubmissionPage />)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));
    await waitFor(() => expect(screen.getByTestId("outputCopy")).toBeInTheDocument());
    const outputCopyBtn = screen.getByTestId('outputCopy');
    fireEvent.click(outputCopyBtn);
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Processing..."));
  });

  test('input Upload Button functions correctly', async() => {
    render(<SubmissionPage defaultReadInputFile={readInputFile}/>);
    const button = screen.getByTestId("uploadButton");
    fireEvent.click(button);
    await waitFor(() => expect(readInputFile).toHaveBeenCalled());
  });

  test('output Download Button functions correctly', async() => {
    render(<SubmissionPage defaultDownloadTextAsFile={downloadTextAsFile}/>)
    const translateBtn = screen.getByTestId("translateButton");
    await waitFor(() => fireEvent.click(translateBtn));
    await waitFor(() => expect(screen.getByTestId("downloadButton")).toBeInTheDocument());
    const outputCopyBtn = screen.getByTestId('downloadButton');
    fireEvent.click(outputCopyBtn);
    await waitFor(() => expect(downloadTextAsFile).toHaveBeenCalled());
  });
})


describe('Async and Queueing tests', () => {
  const translationRequest = jest.fn();

  it('sends a toast message on submission', async() => {
    render(<SubmissionPage defaultTranslationRequest={translationRequest} />)
    const translateBtn = screen.getByTestId("translateButton");
    fireEvent.click(translateBtn);

    await waitFor(() => expect(translationRequest).toHaveBeenCalled());
  })

  // it('sends a toast message on completion', async() => {
  //   render(<SubmissionPage />)
  //   const translateBtn = screen.getByTestId("translateButton");
  //   await waitFor(() => fireEvent.click(translateBtn));

  //   setTimeout(() => {
  //     expect(screen.getByText('Code translated successfully!')).toBeInTheDocument()
  //   }, 5000);
  // })

  // it('sends a request when queue is empty', async() => {
  //   render(<SubmissionPage />)
  //   const translateBtn = screen.getByTestId("translateButton");
  //   await waitFor(() => fireEvent.click(translateBtn));
  // })

  // it('sends a request when queue is not empty, not full', async() => {
  //   render(<SubmissionPage />)
  //   const translateBtn = screen.getByTestId("translateButton");
  //   await waitFor(() => fireEvent.click(translateBtn));
  // })

  // it('rejects a request when queue is full', async() => {
  //   render(<SubmissionPage />)
  //   const translateBtn = screen.getByTestId("translateButton");
  //   await waitFor(() => fireEvent.click(translateBtn));
  // })
})