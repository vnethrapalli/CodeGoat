import { render, screen } from '@redwoodjs/testing/web'
import mediaQuery from "css-mediaquery";
import HomePage from './HomePage'

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

describe('HomePage', () => {
  it('renders HomePage successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  it('renders Title successfully', () => {
    render(<HomePage />)

    expect(screen.getByTestId("title")).toBeInTheDocument()
  })

  it('renders Phrase successfully', () => {
    render(<HomePage />)

    expect(screen.getByTestId("phrase")).toBeInTheDocument()
  })

  it('renders moreInfoButton successfully', () => {
    render(<HomePage />)

    expect(screen.getByTestId("moreInfoButton")).toBeInTheDocument()
  })

  it('renders translateNow successfully', () => {
    render(<HomePage />)

    expect(screen.getByTestId("translateNowButton")).toBeInTheDocument()
  })

  it('renders Description successfully', () => {
    render(<HomePage />)

    expect(screen.getByTestId("description")).toBeInTheDocument()
  })

  it('renders Tutorial successfully', () => {
    render(<HomePage />)

    expect(screen.getByTestId("tutorial")).toBeInTheDocument()
  })

})

describe("Media Test", () => {

  test("Desktop Test", async () => {
    window.matchMedia = createMatchMedia(1500);

    render(<HomePage />);

    expect(screen.getByTestId("title")).toBeInTheDocument()
    expect(screen.getByTestId("phrase")).toBeInTheDocument()
    expect(screen.getByTestId("moreInfoButton")).toBeInTheDocument()
    expect(screen.getByTestId("translateNowButton")).toBeInTheDocument()
    expect(screen.getByTestId("description")).toBeInTheDocument()
    expect(screen.getByTestId("tutorial")).toBeInTheDocument()
  });

  test("Laptop Test", async () => {
    window.matchMedia = createMatchMedia(750);

    render(<HomePage />);

    expect(screen.getByTestId("title")).toBeInTheDocument()
    expect(screen.getByTestId("moreInfoButton")).toBeInTheDocument()
    expect(screen.getByTestId("translateNowButton")).toBeInTheDocument()
    expect(screen.getByTestId("description")).toBeInTheDocument()
    expect(screen.getByTestId("tutorial")).toBeInTheDocument()
  });

  test("Mobile Test", async () => {
    window.matchMedia = createMatchMedia(200);

    render(<HomePage />);

    expect(screen.getByTestId("title")).toBeInTheDocument()
    expect(screen.getByTestId("moreInfoButton")).toBeInTheDocument()
    expect(screen.getByTestId("translateNowButton")).toBeInTheDocument()
    expect(screen.getByTestId("description")).toBeInTheDocument()
    expect(screen.getByTestId("tutorial")).toBeInTheDocument()
  });
});