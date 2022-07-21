module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    ".(css|less)$": "<rootDir>/tests/mocks/styleMock.ts"
  }
}