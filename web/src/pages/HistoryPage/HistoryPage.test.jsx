import { render, waitFor, screen, fireEvent } from '@redwoodjs/testing/web'
import HistoryPage from './HistoryPage'

import { delAll } from './HistoryPage';

jest.mock('./HistoryPage', () => {
  const originalModule = jest.requireActual('./HistoryPage');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    delAll: jest.fn(() => 'mocked delAll'),
  };
});

describe('HistoryPage', () => {

  test('renders successfully', async () => {
    mockCurrentUser({sub: "auth0|12345678901234"});

    await waitFor(() => {
      expect(() => {
        render(<HistoryPage />)
      }).not.toThrow()
    })
  })

  test('renders Title successfully', async () => {
    mockCurrentUser({sub: "auth0|12345678901234"});
    render(<HistoryPage />)

    await waitFor(() => {
      expect(screen.getByTestId("title")).toBeInTheDocument()
    })
  })

  test('renders all Filter and Sort successfully', async () => {
    mockCurrentUser({sub: "auth0|12345678901234"});
    render(<HistoryPage />)

    setTimeout(() => {
      expect(screen.getByTestId("filter")).toBeInTheDocument()
      expect(screen.getByTestId("inputLanguage")).toBeInTheDocument()
      expect(screen.getByTestId("outputLanguage")).toBeInTheDocument()
      expect(screen.getByTestId("start")).toBeInTheDocument()
      expect(screen.getByTestId("end")).toBeInTheDocument()
      expect(screen.getByTestId("sort")).toBeInTheDocument()
      expect(screen.getByTestId("inputSort")).toBeInTheDocument()
      expect(screen.getByTestId("outputSort")).toBeInTheDocument()
      expect(screen.getByTestId("dateSort")).toBeInTheDocument()
      expect(screen.getByTestId("resetButton")).toBeInTheDocument()
      expect(screen.getByTestId("deleteAllButton")).toBeInTheDocument()
    }, 5000);
  })
})


describe('Filter and Sort Values', () => {
  beforeEach(() => {
    mockCurrentUser({sub: "auth0|12345678901234"});
  })

  test('sets input language sort', async () => {
    const setState = jest.fn();
    const setSort = jest.fn();
    const setInSort = jest.fn();
    const setOutSort = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(sort => [sort, setSort])
      .mockImplementationOnce(inSort => [inSort, setInSort])
      .mockImplementationOnce(outSort => [outSort, setOutSort]);

    render(<HistoryPage />)

    const button = screen.getByTestId('inputSort');
    fireEvent.click(button);

    expect(setInSort).toHaveBeenCalledWith(1);
  })

  test('sets output language sort', async () => {
    const setState = jest.fn();
    const setSort = jest.fn();
    const setInSort = jest.fn();
    const setOutSort = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(sort => [sort, setSort])
      .mockImplementationOnce(inSort => [inSort, setInSort])
      .mockImplementationOnce(outSort => [outSort, setOutSort]);

    render(<HistoryPage />)

    const button = screen.getByTestId('outputSort');
    fireEvent.click(button);

    expect(setOutSort).toHaveBeenCalledWith(1);
  })

  test('sets date sort', async () => {
    const setState = jest.fn();
    const setInLang = jest.fn();
    const setOutLang = jest.fn();
    const setSort = jest.fn();
    const setInSort = jest.fn();
    const setOutSort = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(inLang => [inLang, setInLang])
      .mockImplementationOnce(outLang => [outLang, setOutLang])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(sort => [sort, setSort])
      .mockImplementationOnce(inSort => [inSort, setInSort])
      .mockImplementationOnce(outSort => [outSort, setOutSort]);

    render(<HistoryPage />)

    const button = screen.getByTestId('dateSort');
    fireEvent.click(button);

    expect(setSort).toHaveBeenCalledWith(2);
  })

  test('sets input filter', async () => {
    const setState = jest.fn();
    const setInLang = jest.fn();
    const setOutLang = jest.fn();
    const setSort = jest.fn();
    const setInSort = jest.fn();
    const setOutSort = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(inLang => [inLang, setInLang])
      .mockImplementationOnce(outLang => [outLang, setOutLang])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(sort => [sort, setSort])
      .mockImplementationOnce(inSort => [inSort, setInSort])
      .mockImplementationOnce(outSort => [outSort, setOutSort]);

    render(<HistoryPage />)

    const wrapperNode = screen.getByTestId("inputLanguage")

    const selectNode = wrapperNode.childNodes[1];
    fireEvent.change(selectNode, { target: { value: ["java"] } });

    expect(setInLang).toHaveBeenCalledWith(["java"]);
  })

  test('sets output filter', async () => {
    const setState = jest.fn();
    const setInLang = jest.fn();
    const setOutLang = jest.fn();
    const setSort = jest.fn();
    const setInSort = jest.fn();
    const setOutSort = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(inLang => [inLang, setInLang])
      .mockImplementationOnce(outLang => [outLang, setOutLang])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(initState => [initState, setState])
      .mockImplementationOnce(sort => [sort, setSort])
      .mockImplementationOnce(inSort => [inSort, setInSort])
      .mockImplementationOnce(outSort => [outSort, setOutSort]);

    render(<HistoryPage />)

    const wrapperNode = screen.getByTestId("outputLanguage")

    const selectNode = wrapperNode.childNodes[1];
    fireEvent.change(selectNode, { target: { value: ["java"] } });

    expect(setOutLang).toHaveBeenCalledWith(["java"]);

  })

  test('clicks delete all button', async () => {
    render(<HistoryPage />)

    const button = screen.getByTestId('deleteAllButton');
    fireEvent.click(button);

    expect(delAll()).toBe("mocked delAll");
  })
})