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
    "!**/handleShirtOperations.ts",
    "!**/stores/**",
    "!**/services/**",
    "!**/profile.tsx",
    "!**/statistics.tsx",
    "!**/jest.config.ts",
    "!./app.config.ts"
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