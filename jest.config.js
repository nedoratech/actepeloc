export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/*.(test|spec).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          types: ["@testing-library/jest-dom"],
        },
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "^@ui/(.*)$": "<rootDir>/src/ui/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/**/index.{ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  projects: [
    {
      displayName: "api",
      testMatch: ["<rootDir>/tests/api/**/*.test.{ts,tsx}"],
      testEnvironment: "node",
      preset: "ts-jest",
      moduleNameMapper: {
        "^@ui/(.*)$": "<rootDir>/src/ui/$1",
        "^@api/(.*)$": "<rootDir>/src/api/$1",
        "^(\\.{1,2}/.*)\\.js$": "$1",
      },
      transform: {
        "^.+\\.(ts|tsx)$": [
          "ts-jest",
          {
            tsconfig: {
              jsx: "react-jsx",
              esModuleInterop: true,
              allowSyntheticDefaultImports: true,
            },
          },
        ],
      },
    },
    {
      displayName: "ui",
      testMatch: ["<rootDir>/tests/ui/**/*.test.{ts,tsx}"],
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
      preset: "ts-jest",
      moduleNameMapper: {
        "^@ui/(.*)$": "<rootDir>/src/ui/$1",
        "^@api/(.*)$": "<rootDir>/src/api/$1",
        "^(\\.{1,2}/.*)\\.js$": "$1",
      },
      transform: {
        "^.+\\.(ts|tsx)$": [
          "ts-jest",
          {
            tsconfig: {
              jsx: "react-jsx",
              esModuleInterop: true,
              allowSyntheticDefaultImports: true,
              types: ["@testing-library/jest-dom"],
            },
          },
        ],
      },
    },
  ],
};
