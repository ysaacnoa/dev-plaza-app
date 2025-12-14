module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-hooks|@react-native-vector-icons)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^react-native-hooks$': '<rootDir>/__mocks__/react-native-hooks.tsx',
    '\\.(ttf)$': '<rootDir>/__mocks__/file-mock.js',
    '^@react-native-vector-icons/common$': '<rootDir>/__mocks__/@react-native-vector-icons/common.js',
    '^@react-native-vector-icons/ionicons$': '<rootDir>/__mocks__/@react-native-vector-icons/ionicons.js',
  },
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
