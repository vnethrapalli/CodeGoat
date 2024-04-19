import { faqs, faq, createFaq, updateFaq, deleteFaq } from './faqs'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('faqs', () => {
  scenario('returns all faqs', async (scenario) => {
    const result = await faqs()

    expect(result.length).toEqual(Object.keys(scenario.faq).length)
  })

  scenario('returns a single faq', async (scenario) => {
    const result = await faq({ id: scenario.faq.one.id })

    expect(result).toEqual(scenario.faq.one)
  })

  scenario('creates a faq', async () => {
    const result = await createFaq({
      input: { question: 'String', answer: 'String' },
    })

    expect(result.question).toEqual('String')
    expect(result.answer).toEqual('String')
  })

  scenario('updates a faq', async (scenario) => {
    const original = await faq({ id: scenario.faq.one.id })
    const result = await updateFaq({
      id: original.id,
      input: { question: 'String2' },
    })

    expect(result.question).toEqual('String2')
  })

  scenario('deletes a faq', async (scenario) => {
    const original = await deleteFaq({ id: scenario.faq.one.id })
    const result = await faq({ id: original.id })

    expect(result).toEqual(null)
  })
})
