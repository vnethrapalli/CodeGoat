import { addUser, generateCode, verifyCode, verificationInProgress, userExists } from "./user";
import bcrypt from "bcrypt"
import { db } from "src/lib/db";
import { encrypt, decrypt } from "src/lib/encrypt";

jest.mock("nodemailer")
const nodemailer = require("nodemailer")

nodemailer.createTransport.mockReturnValue({
  sendMail: jest.fn().mockResolvedValue({ messageId: "1234" })
})

describe("Create User", () => {
  it("should create a user", async () => {
    const user = await addUser({ user_id: "1234", email: "johndoe@gmail.com" })
    expect(user).toEqual(JSON.stringify({ statusCode: 200, message: "User added successfully" }))
  })

  it("should not create a user if user already exists", async () => {
    const user = await addUser({ user_id: "1234", email: "johndoe@gmail.com" })
    expect(user).toEqual(JSON.stringify({ statusCode: 400, message: "User already exists" }))
  })
})

describe("Generate Two Factor Code", () => {

  beforeEach(async () => {
    await addUser({ user_id: encrypt("1234"), email: encrypt("johndoe@gmail.com")})
    nodemailer.createTransport().sendMail.mockClear()
    nodemailer.createTransport.mockClear()
  })

  afterEach(async () => {
    await db.user.delete({
      where: { uid: "1234" }
    })
  })

  it("should generate a two factor code", async () => {
    const code = await generateCode({ user_id: encrypt("1234") })
    expect(nodemailer.createTransport).toHaveBeenCalled()
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled()
    expect(code).toEqual(JSON.stringify({ statusCode: 200, message: "One Time Password mailed successfully" }))
  })

})

describe("Verify Two Factor Code", () => {

    beforeEach(async () => {
      const hash = await bcrypt.hash("123456", 10)
      await db.user.create({
        data: {
          uid: "1234",
          email: "johndoe@gmail.com",
          hash: hash,
          createdAt: new Date()
        }
      })
    })
    afterEach(async () => {
      await db.user.delete({
        where: { uid: "1234" }
      })
    })

    it("should verify a two factor code", async () => {
      const code = await verifyCode({ user_id: encrypt("1234"), code: encrypt("123456") })
      expect(code).toEqual(JSON.stringify({ statusCode: 200, message: "Two Factor code verified successfully" }))
      expect(await db.user.findUnique({ where: { uid: "1234" }})).toEqual(expect.objectContaining({ hash: "" }))
    })

    it("should not verify a two factor code if user not found", async () => {
      const code = await verifyCode({ user_id: encrypt("12345"), code: encrypt("123456") })
      expect(code).toEqual(JSON.stringify({ statusCode: 404, message: "User not found" }))
    })

    it("should not verify a two factor code if no code was generated", async () => {
      await db.user.update({
        where: { uid: "1234" },
        data: {
          hash: ""
        }
      })
      const code = await verifyCode({ user_id: encrypt("1234"), code: encrypt("123456") })
      expect(code).toEqual(JSON.stringify({ statusCode: 401, message: "No one time password was generated" }))
    })

    it("should not verify a two factor code if code has expired", async () => {
      await db.user.update({
        where: { uid: "1234" },
        data: {
          createdAt: new Date(Date.now() - 600000)
        }
      })
      const code = await verifyCode({ user_id: encrypt("1234"), code: encrypt("123456") })
      expect(code).toEqual(JSON.stringify({ statusCode: 402, message: "One time password has expired" }))
    })
})

describe("User Exists", () => {
  it("should check if user exists", async () => {
    await addUser({ user_id: encrypt("1234"), email: encrypt("johndoe@gmail.com")})

    const user = await userExists({ user_id: encrypt("1234") })

    expect(user).toEqual(true)

    await db.user.delete({
      where: { uid: "1234" }
    })
  })

  it("should check if user does not exist", async () => {
    const user = await userExists({ user_id: encrypt("1234") })

    expect(user).toEqual(false)
  })
})

describe("Verification In Progress", () => {
  it("should check if verification is in progress", async () => {
    await addUser({ user_id: encrypt("1234"), email: encrypt("johndoe@gmail.com")})

    const user = await verificationInProgress({ user_id: encrypt("1234") })

    expect(user).toEqual(false)

    await db.user.delete({
      where: { uid: "1234" }
    })
  })

  it("should check if verification is in progress", async () => {
    const hash = await bcrypt.hash("123456", 10)
    await db.user.create({
      data: {
        uid: "1234",
        email: "johndoe@gmail.com",
        hash: hash,
        createdAt: new Date()
      }
    })

    const user = await verificationInProgress({ user_id: encrypt("1234") })

    expect(user).toEqual(true)

    await db.user.delete({
      where: { uid: "1234" }
    })
  })
})
