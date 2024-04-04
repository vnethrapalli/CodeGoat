import {
  translations,
  translation,
  createTranslation,
  updateTranslation,
  deleteTranslation,
  translationHistoryPage
} from './translations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('translations', () => {
  scenario('returns all translations', async (scenario) => {
    const result = await translations({ uid: scenario.uid })

    expect(result.length).not.toEqual(Object.keys(scenario.translation).length)
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

describe('filtering and sorting', () => {
  beforeEach(async () => {
    const data = await createTranslation({
      input: {
        uid: 'qwerty',
        inputLanguage: 'cpp',
        outputLanguage: 'python',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2021-07-01T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })

    const data2 = await createTranslation({
      input: {
        uid: 'qwerty',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2021-07-01T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })
  })

  test('returns a filtered translation inLang', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', inLang: ['cpp'] });

    record.translations.then(function(value) {
      // console.log(value);
      expect(value).toHaveLength(1);
    });

  })

  // scenario('returns a filtered translation outLang', async (scenario) => {
  //   const result = await translationHistoryPage({ uid: scenario.uid })

  //   expect(result).toEqual(scenario.translation.one)
  // })

  // scenario('returns a filtered translation inLang outLang', async (scenario) => {
  //   const result = await translationHistoryPage({ uid: scenario.uid })

  //   expect(result).toEqual(scenario.translation.one)
  // })

  // scenario('returns a filtered translation date', async (scenario) => {
  //   const result = await translationHistoryPage({ uid: scenario.uid })

  //   expect(result).toEqual(scenario.translation.one)
  // })

  // scenario('returns a filtered translation dates', async (scenario) => {
  //   const result = await translationHistoryPage({ uid: scenario.uid })

  //   expect(result).toEqual(scenario.translation.one)
  // })

  // scenario('returns a sorted translation asc', async (scenario) => {
  //   const result = await translationHistoryPage({ uid: scenario.uid })

  //   expect(result).toEqual(scenario.translation.one)
  // })

  // scenario('returns a sorted translation desc', async (scenario) => {
  //   const result = await translationHistoryPage({ uid: scenario.uid })

  //   expect(result).toEqual(scenario.translation.one)
  // })
})