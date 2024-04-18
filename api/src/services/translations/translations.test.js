import {
  translationStats,
  translations,
  translation,
  createTranslation,
  updateTranslation,
  deleteTranslation,
  translationHistoryPage,
  deleteTranslations
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
  beforeAll(async () => {
    await createTranslation({
      input: {
        uid: 'qwerty',
        inputLanguage: 'cpp',
        outputLanguage: 'python',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2021-07-02T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })
    await createTranslation({
      input: {
        uid: 'qwerty',
        inputLanguage: 'cpp',
        outputLanguage: 'python',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2021-07-03T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'qwerty',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2022-09-01T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'qwerty',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2022-07-05T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'qwerty',
        inputLanguage: 'javascript',
        outputLanguage: 'python',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2023-07-01T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'qwerty',
        inputLanguage: 'cpp',
        outputLanguage: 'javascript',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2024-01-01T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })
  })

  test('returns a filtered translation inLang', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', inLang: ['python'] });

    record.translations.then(function(value) {
      expect(value).toHaveLength(2);
    });
  })

  test('returns a filtered translation outLang', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', outLang: ['python'] });

    record.translations.then(function(value) {
      expect(value).toHaveLength(3);
    });
  })

  test('returns a filtered translation inLang outLang', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', inLang: ['python'], outLang: ['cpp'] });

    record.translations.then(async function(value) {
      expect(value).toHaveLength(2);
    });
  })

  test('returns a filtered translation date', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', startDate: '2022-07-01T00:00:00Z'});

    record.translations.then(async function(value) {
      expect(value).toHaveLength(4);
    });
  })

  test('returns a filtered translation dates', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', startDate: '2022-07-01T00:00:00Z', endDate: '2023-07-02T00:00:00Z' });

    record.translations.then(async function(value) {
      expect(value).toHaveLength(3);
    });
  })

  test('returns a sorted translation asc', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', sort: 2 });

    record.translations.then(async function(value) {
      expect(value[0].createdAt).toEqual(new Date('2021-07-02T00:00:00Z'));
    });
  })

  test('returns a sorted translation desc', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', sort: 1 });

    record.translations.then(async function(value) {
      expect(value[0].createdAt).toEqual(new Date('2024-01-01T00:00:00Z'));
    });
  })

  test('returns a filtered and sorted translation', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', inLang: ['python'], outLang: ['cpp'], sort: 2});

    record.translations.then(async function(value) {
      expect(value).toHaveLength(2);
      expect(value[0].createdAt).toEqual(new Date('2022-07-05T00:00:00Z'));
    });
  })

  test('returns a filtered and sorted translation 2', async () => {
    const record = await translationHistoryPage({ uid: 'qwerty', inLang: ['cpp'], outLang: ['python'], sort: 1, startDate: '2021-07-01T00:00:00Z', endDate: '2021-07-05T00:00:00Z'});

    record.translations.then(async function(value) {
      expect(value).toHaveLength(2);
      expect(value[0].createdAt).toEqual(new Date('2021-07-03T00:00:00Z'));
    });
  })
})


describe('normal condition stats section testing', () => {
  beforeAll(async () => {
    await createTranslation({
      input: {
        uid: 'notmyid',
        inputLanguage: 'cpp',
        outputLanguage: 'python',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2021-07-02T00:00:00Z',
        rating: 4,
        status: '200 OK'
      }
    })
    await createTranslation({
      input: {
        uid: 'myid',
        inputLanguage: 'cpp',
        outputLanguage: 'python',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2021-07-03T00:00:00Z',
        rating: 4,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'myid',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2022-09-01T00:00:00Z',
        rating: 4,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'myid',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2022-07-05T00:00:00Z',
        rating: 4,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'myid',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2023-07-01T00:00:00Z',
        rating: 4,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'myid',
        inputLanguage: 'cpp',
        outputLanguage: 'javascript',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2024-01-01T00:00:00Z',
        rating: 5,
        status: '200 OK'
      }
    })

    /* add entry for yesterday's date */
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    await createTranslation({
      input: {
        uid: 'myid',
        inputLanguage: 'cpp',
        outputLanguage: 'javascript',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: yesterday.toISOString(),
        rating: 5,
        status: '200 OK'
      }
    })
  });


  it('returns the correct number of translations', async () => {
    const record = await translationStats({ uid: 'myid' });
    expect(record.count).toEqual(6);
  });

  it('returns the correct most frequent translation language pair', async () => {
    const record = await translationStats({ uid: 'myid' });
    expect(record.favPair[0]).toEqual('python');
    expect(record.favPair[1]).toEqual('cpp');
    expect(record.favPairFreq).toEqual(3);
  });

  it('returns the correct highest average rating translation language pair', async () => {
    const record = await translationStats({ uid: 'myid' });
    expect(record.highestRatedPair[0]).toEqual('cpp');
    expect(record.highestRatedPair[1]).toEqual('javascript');
    expect(record.highestAvgRating).toEqual(5);
  });

  it('returns the correct data information and translation counts', async () => {
    const record = await translationStats({ uid: 'myid' });
    const expectedCounts = [0, 0, 0, 0, 0, 1, 0];
    const now = new Date();
    for (var i = 0; i < 7; i++) {
      const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6-i))
      expect(record.weekRequests[i]).toEqual(expectedCounts[i]);
      expect(record.weekDates[i]).toEqual(dt.toString());
    }

  });
});


describe('stats section edge case testing', () => {
  beforeAll(async () => {
    await createTranslation({
      input: {
        uid: 'floatround',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2021-07-02T00:00:00Z',
        rating: 2,
        status: '200 OK'
      }
    })
    await createTranslation({
      input: {
        uid: 'floatround',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2021-07-03T00:00:00Z',
        rating: 2,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'floatround',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2022-09-01T00:00:00Z',
        rating: 3,
        status: '200 OK'
      }
    })

    await createTranslation({
      input: {
        uid: 'noratings',
        inputLanguage: 'python',
        outputLanguage: 'cpp',
        inputCode: 'String',
        outputCode: 'String',
        createdAt: '2022-09-01T00:00:00Z',
        rating: -1,
        status: '200 OK'
      }
    })

  });

  it('returns the correct data for a user who has no translations or no ratings yet', async () => {
    const record = await translationStats({ uid: 'thisidisntreal' });
    expect(record.count).toEqual(0);

    expect(record.favPair[0]).toEqual('');
    expect(record.favPair[1]).toEqual('');
    expect(record.favPairFreq).toEqual(0);

    expect(record.highestRatedPair[0]).toEqual('');
    expect(record.highestRatedPair[1]).toEqual('');
    expect(record.highestAvgRating).toEqual(0);

    const now = new Date();
    for (var i = 0; i < 7; i++) {
      const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6-i))
      expect(record.weekRequests[i]).toEqual(0);
      expect(record.weekDates[i]).toEqual(dt.toString());
    }
  });

  it('returns the correctly truncated float data for the average rating', async () => {
    const record = await translationStats({ uid: 'floatround' });
    expect(record.highestAvgRating).toEqual(2.33);
  });

  it('returns the correct rating data for a user with no ratings yet', async () => {
    const record = await translationStats({ uid: 'noratings' });
    expect(record.count).toEqual(1);

    expect(record.highestRatedPair[0]).toEqual('');
    expect(record.highestRatedPair[1]).toEqual('');
    expect(record.highestAvgRating).toEqual(0);
  });
});