import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/expo-env.d.ts",
    "!**/.expo/**",
    "!**/types/**",
    "!**/eslint.config.js",
    "!**/metro.config.js",
    "!**/nativewind-env.d.ts",
    "!**/tailwind.config.js",
    "!**/_layout.tsx",
    "!**/stores/**",
    "!**/services/**",
    "!**/profile.tsx",
    "!**/statistics.tsx",
    "!**/jest.config.ts",
    "!./app.config.ts",

    // utils
    "!**/handleShirtOperations.ts",
    "!**/handleStatisticsOperations.ts",
    "!**/handleSubmits.ts",
    "!**/setReferenceData.ts"
  ],
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
  preset: 'jest-expo',
  verbose: true
}

export default config;