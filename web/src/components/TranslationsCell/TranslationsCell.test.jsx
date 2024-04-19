import { render, screen, within, waitFor } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './TranslationsCell'
import { standard } from './TranslationsCell.mock'
import { languages } from './TranslationsCell'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('TranslationsCell', () => {
  test('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  test('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  test('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  test('renders Success successfully', async () => {
    expect(() => {
      render(<Success translationHistoryPage={standard()} />)
    }).not.toThrow()
  })
})


describe('Accordion Information', () => {

  test('renders accordion and information successfully', async () => {
    render(<Success translationHistoryPage={standard()} />)

    const listHistory = screen.getAllByTestId('accordion')
    expect(listHistory).toHaveLength(3)

    listHistory.forEach((item, index) => {
      const { getByTestId } = within(item)

      expect(getByTestId('languageInfo')).toHaveTextContent(languages[standard().translations[index].inputLanguage])
      expect(getByTestId('languageInfo')).toHaveTextContent(languages[standard().translations[index].outputLanguage])
      expect(getByTestId('dateInfo')).toBeInTheDocument()
    })
  })
})