// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  feedbackSummary: {
    count: 4,
    submissionPageAvg: 3,
    outputPageAvg: 3,
    translationAccuracyAvg: 4,
    gptAvailabilityAvg: 5,
    experienceAvg: 4
  },
});

export const single = () => ({
  feedbackSummary: {
    count: 1,
    submissionPageAvg: 3,
    outputPageAvg: 3,
    translationAccuracyAvg: 4,
    gptAvailabilityAvg: 5,
    experienceAvg: 4
  },
});

export const empty = () => ({
  feedbackSummary: {
    count: 0,
    submissionPageAvg: 0,
    outputPageAvg: 0,
    translationAccuracyAvg: 0,
    gptAvailabilityAvg: 0,
    experienceAvg: 0
  },
});
