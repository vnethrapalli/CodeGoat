import { render } from '@redwoodjs/testing/web'

import Translation from './Translation'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const translation = {
  id: 1,
  uid: "945839",
}

describe('Translation', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Translation translation={translation}/>)
    }).not.toThrow()
  })
})
