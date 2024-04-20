import { db } from 'src/lib/db'

const langCodes = [ "c", "cpp", "csharp", "java", "javascript", "python", "typescript", "go", "rust", "ruby", "kotlin", "php"];

export const translationStats = async ({ uid }) => {
  const results = await db.translation.findMany({
    where: { uid: uid },
    orderBy: [
      { inputLanguage: 'asc' },
      { outputLanguage: 'asc'}
    ],
    select: {
      inputLanguage: true,
      outputLanguage: true,
      rating: true
    }
  });

  var now = new Date();
  const recents = await db.translation.findMany({
    where: {
      uid: uid,
      createdAt: {
        gte: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (7-1))
      }
    },
    orderBy: [
      { createdAt: 'asc' }
    ],
    select: {
      createdAt: true
    }
  });


  /* stores information regarding all language translation pairs (ie. frequency, average rating, etc) */
  let data = {};
  let nullRating = 0;
  for (const pair of results) {
    let key = [pair['inputLanguage'], pair['outputLanguage']].join(',');
    let rating = pair['rating'] >= 0 ? pair['rating'] : nullRating;
    if (data.hasOwnProperty(key)) {
      data[key]['freq'] += 1;
      data[key]['rating_freq'] += pair['rating'] >= 0 ? 1 : 0;
      data[key]['avg_rating'] += rating;
    }
    else {
      data[key] = {};
      data[key]['freq'] = 1;
      data[key]['rating_freq'] = pair['rating'] >= 0 ? 1 : 0;
      data[key]['avg_rating'] = rating;
    }
  }
  for (var key of Object.keys(data)) {
    data[key]['avg_rating'] /= data[key]['rating_freq'];
  }

  /* finds most frequent pair of input and output languages for translations */
  var mostFreqPair = ['', ''];
  var maxfreq = 0;
  var highestRatedPair = ['', ''];
  var highestAvgRating = 0;
  for (const pair in data) {
    if (data[pair]['freq'] > maxfreq) {
      maxfreq = data[pair]['freq'];
      let langs = pair.split(',');
      mostFreqPair[0] = langs[0];
      mostFreqPair[1] = langs[1];
    }

    if (data[pair]['avg_rating'] > highestAvgRating) {
      highestAvgRating= data[pair]['avg_rating'];
      let langs = pair.split(',');
      highestRatedPair[0] = langs[0];
      highestRatedPair[1] = langs[1];
    }
  }

  /* counting the number of translation made each day in the past 7 days (including today) */
  let dateFreqs = {};
  for (let i = 6; i >= 0; i--) {
    const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    dateFreqs[dt] = 0;
  }
  for (const pair of recents) {
    let key = new Date(pair['createdAt'].getFullYear(), pair['createdAt'].getMonth(), pair['createdAt'].getDate());
    dateFreqs[key] += 1;
  }


  return {
    count: Object.keys(results).length,
    favPair: mostFreqPair,
    favPairFreq: maxfreq,
    weekDates: Object.keys(dateFreqs),
    weekRequests: Object.values(dateFreqs),
    highestRatedPair: highestRatedPair,
    highestAvgRating: Math.round(highestAvgRating * 100) / 100
  }
}

export const translation = ({ id }) => {
  return db.translation.findUnique({
    where: { id },
  })
}

export const translations = ({ uid }) => {
  return {
    translations: db.translation.findMany({
      where: { uid },
      orderBy: { createdAt: 'desc' },
    })
  }
}

export const createTranslation = ({ input }) => {
  return db.translation.create({
    data: input,
  })
}

export const updateTranslation = ({ id, input }) => {
  return db.translation.update({
    data: input,
    where: { id },
  })
}

export const deleteTranslation = ({ id }) => {
  return db.translation.delete({
    where: { id },
  })
}

export const deleteAllTranslations = ({ uid }) => {
  return db.translation.deleteMany({
    where: { uid },
  })
}

const POSTS_PER_PAGE = 10

export const translationHistoryPage = ({ page = 1, uid, inLang = [], outLang = [], startDate = "1970-01-01T00:00:01Z", endDate = new Date().getFullYear() + 1 + "-01-01T00:00:01Z", sort, inSort, outSort}) => {
  const offset = (page - 1) * POSTS_PER_PAGE

  return {
    translations: db.translation.findMany({
      where: {
        uid,
        inputLanguage: {
          in: inLang.length > 0 ? inLang : langCodes
        },
        outputLanguage: {
          in: outLang.length > 0 ? outLang : langCodes
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      take: POSTS_PER_PAGE,
      skip: offset,
      orderBy: [
        {inputLanguage: inSort%3 == 1 ? 'desc' : inSort%3 == 2 ? 'asc' : undefined},
        {outputLanguage: outSort%3 == 1 ? 'desc' : outSort%3 == 2 ? 'asc' : undefined},
        {createdAt: sort%3 == 1 ? 'desc' : sort%3 == 2 ? 'asc' : undefined},
      ],
    }),
    count: db.translation.count({
      where: {
        uid,
        inputLanguage: {
          in: inLang.length > 0 ? inLang : langCodes
        },
        outputLanguage: {
          in: outLang.length > 0 ? outLang : langCodes
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    }),
  }
}

export const translationCount = ({ }) => {
  return {
    count: db.translation.count()
  }
}