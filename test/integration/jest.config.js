/** @type {import('jest').Config} */
const jestConfig = {
  setupFilesAfterEnv: ["<rootDir>/test/setup-test.js"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/*.test.js"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};

export default jestConfig;
