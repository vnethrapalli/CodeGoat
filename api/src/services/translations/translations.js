import { db } from 'src/lib/db'

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

const POSTS_PER_PAGE = 10

export const translationHistoryPage = ({ page = 1, uid }) => {
  const offset = (page - 1) * POSTS_PER_PAGE

  return {
    translations: db.translation.findMany({
      where: { uid },
      take: POSTS_PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    }),
    count: db.translation.count({
      where: { uid },
    }),
  }
}