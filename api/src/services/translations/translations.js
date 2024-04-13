import { db } from 'src/lib/db'

const langCodes = [ "c", "cpp", "csharp", "java", "javascript", "python", "typescript", "go", "rust", "ruby", "kotlin", "php"];

export const translations = ({ uid }) => {
  return {
    translations: db.translation.findMany({
      where: { uid },
      orderBy: { createdAt: 'desc' },
    })
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