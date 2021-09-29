module.exports = {
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/__utils__/'],
  clearMocks: true,
  transform: {
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '^.+.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};
