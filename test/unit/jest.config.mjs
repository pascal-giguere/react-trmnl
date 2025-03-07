export default {
  roots: ["<rootDir>", "<rootDir>/../../src"],
  testMatch: ["**/*.test.mts", "**/*.test.tsx"],
  moduleFileExtensions: ["ts", "mts", "tsx", "js", "mjs", "json"],
  extensionsToTreatAsEsm: [".ts", ".tsx", ".mts"],

  transform: {
    "^.+\\.m?tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "test/tsconfig.json",
        diagnostics: false,
      },
    ],
  },
  testEnvironment: "node",
  resolver: "ts-jest-resolver",
};
