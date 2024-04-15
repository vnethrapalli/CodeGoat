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
      outputLanguage: true
    }
  });


  /* stores information regarding language translation pairs (ie. frequency, average rating, etc) */
  let data = {}
  for (const pair of results) {
    let key = [pair['inputLanguage'], pair['outputLanguage']].join(',');
    if (data.hasOwnProperty(key)) {
      data[key]['freq'] += 1;
    }
    else {
      data[key] = {};
      data[key]['freq'] = 1;
    }
  }

   // console.log(JSON.stringify(data));
  var mostFreqPair = ['', ''];
  var maxfreq = 0;
  for (const pair in data) {
    if (data[pair]['freq'] > maxfreq) {
      maxfreq = data[pair]['freq'];
      let langs = pair.split(',');
      mostFreqPair[0] = langs[0];
      mostFreqPair[1] = langs[1];
    }
  }

  console.log(maxfreq)

  return {
    count: db.translation.count({ where: { uid } }),
    favPair: mostFreqPair,
    favPairFreq: maxfreq
  }
}

export const translation = ({ id }) => {
  return db.translation.findUnique({
    where: { id },
  })
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

export const deleteTranslations = ({ uid }) => {
  return db.translation.deleteMany({
    where: { uid },
  })
}

const POSTS_PER_PAGE = 10

export const translationHistoryPage = ({ page = 1, uid, inLang = [], outLang = [], startDate = "1970-01-01T00:00:01Z", endDate = new Date(Date.now()).toISOString(), sort, inSort, outSort}) => {
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