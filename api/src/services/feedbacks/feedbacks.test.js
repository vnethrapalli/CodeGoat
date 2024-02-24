import {
  feedbacks,
  feedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from './feedbacks'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('feedbacks', () => {
  scenario('returns all feedbacks', async (scenario) => {
    const result = await feedbacks()

    expect(result.length).toEqual(Object.keys(scenario.feedback).length)
  })

  scenario('returns a single feedback', async (scenario) => {
    const result = await feedback({ id: scenario.feedback.one.id })

    expect(result).toEqual(scenario.feedback.one)
  })

  scenario('creates a feedback', async () => {
    const result = await createFeedback({
      input: {
        submissionPage: 5082338,
        outputPage: 6094546,
        translationAccuracy: 8125259,
        gptAvailability: 6481965,
        experience: 3391018,
        comments: 'String',
      },
    })

    expect(result.submissionPage).toEqual(5082338)
    expect(result.outputPage).toEqual(6094546)
    expect(result.translationAccuracy).toEqual(8125259)
    expect(result.gptAvailability).toEqual(6481965)
    expect(result.experience).toEqual(3391018)
    expect(result.comments).toEqual('String')
  })

  scenario('updates a feedback', async (scenario) => {
    const original = await feedback({
      id: scenario.feedback.one.id,
    })
    const result = await updateFeedback({
      id: original.id,
      input: { submissionPage: 7235162 },
    })

    expect(result.submissionPage).toEqual(7235162)
  })

  scenario('deletes a feedback', async (scenario) => {
    const original = await deleteFeedback({
      id: scenario.feedback.one.id,
    })
    const result = await feedback({ id: original.id })

    expect(result).toEqual(null)
  })
})
