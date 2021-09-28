module.exports = {
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/__utils__/'],
  clearMocks: true,
};
