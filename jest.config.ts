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
    "!**/nativewind-interop.ts",
    "!**/tailwind.config.js",
    "!**/_layout.tsx",
    "!**/stores/**",
    "!**/services/**",
    "!**/profile.tsx",
    "!**/jest.config.ts",
    "!./app.config.ts",

    // utils
    "!**/createSupabaseClient.ts",
    "!**/handleProfileOperations.ts",
    "!**/handleShirtOperations.ts",
    "!**/handleStatisticsOperations.ts",
    "!**/handleSubmits.ts",
    "!**/setReferenceData.ts",
  ],
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/jest.setup.js'],
  verbose: true
}

export default config;