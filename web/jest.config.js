// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/web',
}

module.exports = config

process.env = Object.assign(process.env, {
  AES_KEY: "JESTTESTAESKEY"
})
