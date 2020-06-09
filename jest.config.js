module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json"
    }
  }
};