import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import DocumentationPage from './DocumentationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DocumentationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DocumentationPage />)
    }).not.toThrow()
  })
})

describe('Rendering Tests', () => {
  it('renders titles successfully', () => {
    expect(() => {
      render(<DocumentationPage />)
      screen.getByRole('heading', {
        name: /Documentation/i
      })
      screen.getByRole('heading', {
        name: /Technologies/i
      })
      screen.getByRole('heading', {
        name: /Downloadable Guides/i
      })
      screen.getByRole('heading', {
        name: /FAQ/i
      })
    }).not.toThrow()
  })

  it('renders "What is GPT" box successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByTestId("whatgpt")).toBeInTheDocument()
  })

  it('renders "How do we use GPT" box successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByTestId("howgpt")).toBeInTheDocument()
  })

  it('renders translation guide successfully', () => {
    render(<DocumentationPage />)
    expect(screen.getByTestId("translate guide")).toBeInTheDocument()
  })

  it('renders gpt guide successfully', () => {
    render(<DocumentationPage />)
    expect(screen.getByTestId("gpt guide")).toBeInTheDocument()
  })

  it('renders about us successfully', () => {
    render(<DocumentationPage />)
    expect(screen.getByTestId("about us")).toBeInTheDocument()
  })

  it('renders search bar successfully', () => {
    render(<DocumentationPage />)
    expect(screen.getByTestId("search")).toBeInTheDocument()
  })

  it('renders search icon successfully', () => {
    render(<DocumentationPage />)
    expect(screen.getByTestId("search icon")).toBeInTheDocument()
  })
})

describe('Link and Download Tests', () => {
  it('redirects to Redwood docs', () => {
    render(<DocumentationPage />)

    const rwlink = screen.getByTestId('redwood link');
    expect(rwlink).toBeInTheDocument()
    expect(rwlink).toHaveAttribute('href', 'https://redwoodjs.com/docs/introduction');
  })

  it('redirects to GPT docs', () => {
    render(<DocumentationPage />)

    const glink = screen.getByTestId('gpt link');
    expect(glink).toBeInTheDocument()
    expect(glink).toHaveAttribute('href', 'https://platform.openai.com/docs/introduction');
  })

  it('downloads the translate guide', () => {
    render(<DocumentationPage />)

    const glink = screen.getByTestId('translate guide');
    expect(glink).toBeInTheDocument()
    expect(glink).toHaveAttribute('href', 'Guides/CodeGoat.pdf');
    expect(glink).toHaveAttribute('download', 'TranslateGuide');
  })

  it('downloads the gpt guide', () => {
    render(<DocumentationPage />)

    const glink = screen.getByTestId('gpt guide');
    expect(glink).toBeInTheDocument()
    expect(glink).toHaveAttribute('href', 'Guides/ChatGPT.pdf');
    expect(glink).toHaveAttribute('download', 'GPTGuide');
  })

  it('downloads the about us', () => {
    render(<DocumentationPage />)

    const glink = screen.getByTestId('about us');
    expect(glink).toBeInTheDocument()
    expect(glink).toHaveAttribute('href', 'Guides/AboutUs.pdf');
    expect(glink).toHaveAttribute('download', 'About Us');
  })
})

// Test the walkthrough download

// Test the GPT download

// Test the about us download

describe('Search Tests', () => {
  it('Works', () => {
    expect(() => {
      render(<DocumentationPage />)
    }).not.toThrow()
  })
})
// Test searching with no input

// Test searching capability

// Test searching with no results
