// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/api',
}

process.env = Object.assign(process.env, {
  AES_KEY: "JESTTESTAESKEY"
})

module.exports = config
