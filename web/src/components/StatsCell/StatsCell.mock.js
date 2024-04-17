// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  stats: {
    count: 14,
    favPair: ['python', 'cpp'],
    favPairFreq: 4,
    weekDates: ['2023-07-01T00:00:00Z', '2023-07-02T00:00:00Z', '2023-07-03T00:00:00Z', '2023-07-04T00:00:00Z', '2023-07-05T00:00:00Z', '2023-07-06T00:00:00Z', '2023-07-07T00:00:00Z'],
    weekRequests: [0, 0, 0, 2, 3, 0, 1],
    highestRatedPair: ['python', 'cpp'],
    highestAvgRating: 4
  }
})
