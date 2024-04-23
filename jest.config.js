/** @type {import('jest').Config} */
const config = {
  rootDir: '.',
  projects: ['<rootDir>/{*,!(node_modules)/**/}/jest.config.js'],
  // transformIgnorePatterns: [
  //   '/node_modules/(?!@mui/x-charts|@mui/material|@babel/runtime|d3-(color|format|interpolate|scale|shape|time|time-format|path|array)|internmap)',
  // ],
};

module.exports = config;

// This the Redwood root jest config
// Each side, e.g. ./web/ and ./api/ has specific config that references this root
// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

