import { db } from 'src/lib/db'
import randomstring from 'randomstring'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

export const generateCode = async ({ user_id }) => {
  const code = randomstring.generate({
    length: 6,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  })

  const hash = await bcrypt.hash(code, 10)

  const user = await db.user.update({
    where: { user_id },
    data: {
      hash
    }
  })

  if (!user) {
    return JSON.stringify({ statusCode: 500, message: "Failed to generate code" })
  } else {

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: 'Your CodeGoat OTP',
      text: `Your One Time Password is ${code}`
    })

    return JSON.stringify({ statusCode: 200, message: "Code generated successfully" })
  }
}

export const verifyCode = async ({ user_id, code }) => {
  const user = await db.user.findUnique({
    where: { user_id }
  })

  if (!user) {
    return JSON.stringify({ statusCode: 404, message: "User not found" })
  }

  if(!user.hash) {
    return JSON.stringify({ statusCode: 400, message: "No code was generated" })
  }

  if(user.created_at < new Date(Date.now() - 300000)) {
    return JSON.stringify({ statusCode: 400, message: "Code expired" })
  }

  const isValid = await bcrypt.compare(code, user.hash)

  if (!isValid) {
    return JSON.stringify({ statusCode: 400, message: "Invalid code" })
  }

  await db.user.update({
    where: { user_id },
    data: {
      hash: null
    }
  })
  return JSON.stringify({ statusCode: 200, message: "Code verified successfully" })
}

export const addUser = async ({ user_id, email }) => {

  const user = await db.user.create({
    data: {
      user_id,
      email
    }
  })

  if (!user) {
    return JSON.stringify({ statusCode: 500, message: "Failed to add user" })
  } else {
    return JSON.stringify({ statusCode: 200, message: "User added successfully" })
  }
}
