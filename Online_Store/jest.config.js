module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^.*[.](jpg|JPG|gif|GIF|png|PNG|svg|LESS|css|CSS)$": "<rootDir>/tests/mocks/emptyModule.ts"
  }
}