import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    "!src/app/\\(studio\\)",
    "!src/sanity",
    "!src/__tests__/**",
    "!src/*.test.{js,ts,tsx}",
    "!./src/app/\\(site\\)/men/*.{js,ts,tsx}",
    "!./src/app/\\(site\\)/women/*.{js,ts,tsx}",
    "!./src/app/\\(site\\)/children/*.{js,ts,tsx}",
    "./src/app/\\(site\\)/**/*.{js,ts,tsx}",  // Escaped parentheses for site
    "./src/components/*.{js,ts,tsx}",
    "./src/hooks/*.{js,ts,tsx}",
    "./src/lib/*.{js,ts,tsx}",
    
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
    },
},
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
      "^@/(.*)$": ["<rootDir>/src/$1'"]
    },
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)