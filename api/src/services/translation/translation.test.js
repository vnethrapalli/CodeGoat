import getTranslation from './translation'

describe('translation', () => {
  scenario('returns a single feedback', async (scenario) => {
    const result = await getTranslation({ id: scenario.feedback.one.id })

    expect(result).toEqual(scenario.feedback.one)
  });
});

describe('testing invalid openai api key', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

});