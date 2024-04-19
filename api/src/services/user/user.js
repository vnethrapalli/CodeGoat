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
    where: { uid: user_id },
    data: {
      hash: hash,
      createdAt: new Date(Date.now()).toISOString()
    }
  })

  if (!user) {
    return JSON.stringify({ statusCode: 500, message: "Failed to generate One Time Password" })
  } else {

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const info = await transporter.sendMail({
      from: {
        name: "CodeGoat",
        address: "codegoat@gmail.com"
      },
      to: user.email,
      subject: 'Your CodeGoat OTP',
      html: `<p>Your One Time Password is: <strong>${code}</strong>.<br>This password will expire in 5 minutes.</p>`
    })

    return JSON.stringify({ statusCode: 200, message: "One Time Password mailed successfully" })
  }
}

export const verifyCode = async ({ user_id, code }) => {
  const user = await db.user.findUnique({
    where: { uid: user_id }
  })

  if (!user) {
    return JSON.stringify({ statusCode: 404, message: "User not found" })
  }

  if(!user.hash || user.hash === "") {
    return JSON.stringify({ statusCode: 401, message: "No one time password was generated" })
  }

  if(user.createdAt < new Date(Date.now() - 300000)) {
    return JSON.stringify({ statusCode: 402, message: "One time password has expired" })
  }

  const isValid = await bcrypt.compare(code, user.hash)

  if (!isValid) {
    return JSON.stringify({ statusCode: 500, message: "Invalid one time password" })
  }

  await db.user.update({
    where: { uid: user_id },
    data: {
      hash: ""
    }
  })
  return JSON.stringify({ statusCode: 200, message: "Two Factor code verified successfully" })
}

export const addUser = async ({ user_id, email }) => {

  const isUser = await db.user.findUnique({
    where: { uid: user_id}
  })

  if (isUser) {
    return JSON.stringify({ statusCode: 400, message: "User already exists" })
  }

  const user = await db.user.create({
    data: {
      uid: user_id,
      email: email
    }
  })

  if (!user) {
    return JSON.stringify({ statusCode: 500, message: "Failed to add user" })
  } else {
    return JSON.stringify({ statusCode: 200, message: "User added successfully" })
  }
}

export const verificationInProgress = async ({ user_id }) => {
  const user = await db.user.findUnique({
    where: { uid: user_id }
  })

  if (!user) {
    return false
  }

  if(!user.hash || user.hash === "") {
    return false
  }

  if(user.hash === "") {
    return true
  }
  return true
}

export const userExists = async ({ user_id }) => {
  const user = await db.user.findUnique({
    where: { uid: user_id }
  })

  if (!user) {
    return false
  }
  return true
}
