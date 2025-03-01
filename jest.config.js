/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/test/unit"],
  transform: {
    "^.+.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/test/unit/tsconfig.test.json",
      },
    ],
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
