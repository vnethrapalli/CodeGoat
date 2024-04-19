import { db } from 'src/lib/db'

export const faqs = () => {
  return db.faq.findMany()
}

export const faq = ({ id }) => {
  return db.faq.findUnique({
    where: { id },
  })
}

export const createFaq = ({ input }) => {
  return db.faq.create({
    data: input,
  })
}

export const updateFaq = ({ id, input }) => {
  return db.faq.update({
    data: input,
    where: { id },
  })
}

export const deleteFaq = ({ id }) => {
  return db.faq.delete({
    where: { id },
  })
}
