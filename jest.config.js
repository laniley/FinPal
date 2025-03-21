/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "modulePaths": [
    "<rootDir>"
  ],
  "testPathIgnorePatterns": ["out", "node_modules"],
  "moduleNameMapper": { "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js" },
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
      },
    ],
  },
  "setupFilesAfterEnv": [
    "<rootDir>/setupTests.ts"
  ]
};