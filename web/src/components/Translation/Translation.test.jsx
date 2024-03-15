import { render } from '@redwoodjs/testing/web'

import Translation from './Translation'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Translation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Translation />)
    }).not.toThrow()
  })
})
