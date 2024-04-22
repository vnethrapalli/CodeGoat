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
      expect(screen.getByTestId(/releasenotes/i)).toBeInTheDocument()
      expect(screen.getByTestId(/technologies/i)).toBeInTheDocument()
      expect(screen.getByTestId(/downloads/i)).toBeInTheDocument()
      expect(screen.getByTestId(/faqtitle/i)).toBeInTheDocument()
    }).not.toThrow()
  })

  it('renders release notes button successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByTestId("notesButton")).toBeInTheDocument()
  })

  it('renders technologies button successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByTestId("techButton")).toBeInTheDocument()
  })

  it('renders downloadable guides button successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByTestId("downButton")).toBeInTheDocument()
  })

  it('renders FAQ button successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByTestId("faqButton")).toBeInTheDocument()
  })

  it('renders new release notes successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByTestId("new")).toBeInTheDocument()
  })

  it('renders old release notes successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByTestId("old")).toBeInTheDocument()
  })

  it('renders technology icons successfully', () => {
    render(<DocumentationPage />)

    expect(screen.getByAltText("React Icon")).toBeInTheDocument()
    expect(screen.getByAltText("Prisma Icon")).toBeInTheDocument()
    expect(screen.getByAltText("GraphQL Icon")).toBeInTheDocument()
    expect(screen.getByAltText("Storybook Icon")).toBeInTheDocument()
    expect(screen.getByAltText("Jest Icon")).toBeInTheDocument()
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

  it('redirects to React docs', () => {
    render(<DocumentationPage />)

    const link = screen.getByTestId('react');
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://reactjs.org');
  })

  it('redirects to Prisma docs', () => {
    render(<DocumentationPage />)

    const link = screen.getByTestId('prisma');
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://www.prisma.io/');
  })

  it('redirects to GraphQL docs', () => {
    render(<DocumentationPage />)

    const link = screen.getByTestId('graphql');
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://www.graphql.com/');
  })

  it('redirects to Storybook docs', () => {
    render(<DocumentationPage />)

    const link = screen.getByTestId('storybook');
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://storybook.js.org/');
  })

  it('redirects to Jest docs', () => {
    render(<DocumentationPage />)

    const link = screen.getByTestId('jest');
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://jestjs.io/');
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