import { db } from 'src/lib/db'

export const feedbacks = () => {
  return db.feedback.findMany()
}

export const feedback = ({ id }) => {
  return db.feedback.findUnique({
    where: { id },
  })
}

export const createFeedback = ({ input }) => {
  return db.feedback.create({
    data: input,
  })
}

export const updateFeedback = ({ id, input }) => {
  return db.feedback.update({
    data: input,
    where: { id },
  })
}

export const deleteFeedback = ({ id }) => {
  return db.feedback.delete({
    where: { id },
  })
}

export const feedbackStats = async ({ }) => {
  const results = await db.feedback.findMany({ });

  let ct = Object.keys(results).length;
  let avgs = { submissionPage: 0, outputPage: 0, translationAccuracy: 0, gptAvailability: 0, experience: 0 };
  for (const item of results) {
    //console.log(item);
    avgs['submissionPage'] += item['submissionPage'];
    avgs['outputPage'] += item['outputPage'];
    avgs['translationAccuracy'] += item['translationAccuracy'];
    avgs['gptAvailability'] += item['gptAvailability'];
    avgs['experience'] += item['experience'];
  }
  for (var key of Object.keys(avgs)) {
    avgs[key] /= ct;
  }

  return {
    count: ct,
    submissionPageAvg: Math.round(avgs['submissionPage'] / 2 * 100) / 100,
    outputPageAvg: Math.round(avgs['outputPage'] / 2 * 100) / 100,
    translationAccuracyAvg: Math.round(avgs['translationAccuracy'] / 2 * 100) / 100,
    gptAvailabilityAvg: Math.round(avgs['gptAvailability'] / 2 * 100) / 100,
    experienceAvg: Math.round(avgs['experience'] / 2 * 100) / 100
  };
}
