import {
  translations,
  translation,
  createTranslation,
  updateTranslation,
  deleteTranslation,
} from './translations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('translations', () => {
  scenario('returns all translations', async (scenario) => {
    const result = await translations()

    expect(result.length).toEqual(Object.keys(scenario.translation).length)
  })

  scenario('returns a single translation', async (scenario) => {
    const result = await translation({ id: scenario.translation.one.id })

    expect(result).toEqual(scenario.translation.one)
  })

  scenario('creates a translation', async () => {
    const result = await createTranslation({
      input: {
        uid: 'String',
        inputLanguage: 'String',
        outputLanguage: 'String',
        inputCode: 'String',
        outputCode: 'String',
        rating: 5378466,
      },
    })

    expect(result.uid).toEqual('String')
    expect(result.inputLanguage).toEqual('String')
    expect(result.outputLanguage).toEqual('String')
    expect(result.inputCode).toEqual('String')
    expect(result.outputCode).toEqual('String')
    expect(result.rating).toEqual(5378466)
  })

  scenario('updates a translation', async (scenario) => {
    const original = await translation({
      id: scenario.translation.one.id,
    })
    const result = await updateTranslation({
      id: original.id,
      input: { uid: 'String2' },
    })

    expect(result.uid).toEqual('String2')
  })

  scenario('deletes a translation', async (scenario) => {
    const original = await deleteTranslation({
      id: scenario.translation.one.id,
    })
    const result = await translation({ id: original.id })

    expect(result).toEqual(null)
  })
})
