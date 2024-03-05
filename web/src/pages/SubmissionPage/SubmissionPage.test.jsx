import { render, screen, fireEvent } from '@redwoodjs/testing/web';
import SubmissionPage from './SubmissionPage';

// https://redwoodjs.com/docs/testing#testing-pages-layouts

// INITIAL RENDER TESTS
describe('SubmissionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubmissionPage />)
    }).not.toThrow()
  })
})

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
test('renders output Editor when Translate Button clicked successfully', () => {
  render(<SubmissionPage />)
  const button = screen.getByTestId("translateButton");
  fireEvent.click(button);
  expect(screen.getByTestId("outputEditor")).toBeInTheDocument()
})

test('renders output Copy Button when Translate Button clicked successfully', () => {
  render(<SubmissionPage />)
  const button = screen.getByTestId("translateButton");
  fireEvent.click(button);
  expect(screen.getByTestId("outputCopy")).toBeInTheDocument()
})

test('renders output Download Button when Translate Button clicked successfully', () => {
  render(<SubmissionPage />)
  const button = screen.getByTestId("translateButton");
  fireEvent.click(button);
  expect(screen.getByTestId("downloadButton")).toBeInTheDocument()
})

// BUTTON TESTS

// some variables
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

// copy tests variables
const originalClipboard = { ...global.navigator.clipboard };

// const fileContent = "function hello()\n{\tprint(\"Hello World!\");\n}\n\nhello();";

// const readInputFile = jest.fn(() => {
//   const blob = new Blob([fileContent], { type: 'text/javascript' });
//   const file = new File([blob], "testInput.js", { type: 'text/javascript' });
//   const reader = new FileReader();
//   reader.readAsText(file);

//   reader.onload = function(e) {
//     return e.target.result;
//   };
// });

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

test('output copy Button functions correctly', () => {
  render(<SubmissionPage />)
  const translateBtn = screen.getByTestId("translateButton");
  fireEvent.click(translateBtn);
  const outputCopyBtn = screen.getByTestId('outputCopy');
  fireEvent.click(outputCopyBtn);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith("# your new code will be here...");
});

test('input Upload Button functions correctly', () => {
  render(<SubmissionPage defaultReadInputFile={readInputFile}/>);
  const button = screen.getByTestId("uploadButton");
  fireEvent.click(button);
  expect(readInputFile).toHaveBeenCalled();
});

test('output Download Button functions correctly', () => {
  render(<SubmissionPage defaultDownloadTextAsFile={downloadTextAsFile}/>)
  const translateBtn = screen.getByTestId("translateButton");
  fireEvent.click(translateBtn);
  const outputCopyBtn = screen.getByTestId('downloadButton');
  fireEvent.click(outputCopyBtn);
  expect(downloadTextAsFile).toHaveBeenCalled();
});

// test('input copy Button functions correctly', () => {
//   render(<SubmissionPage />)
//   const button = screen.getByTestId("inputCopy");
//   fireEvent.click(button);
//   expect(navigator.clipboard.read()).toEqual("// write some code...");
// })

// test('output copy Button functions correctly', () => {
//   render(<SubmissionPage />)
//   const translateBtn = screen.getByTestId("translateButton");
//   fireEvent.click(translateBtn);
//   const outputCopyBtn = screen.getByTestId('outputCopy');
//   fireEvent.click(outputCopyBtn);
//   expect(navigator.clipboard.read()).toEqual("# your new code will be here...");
// })