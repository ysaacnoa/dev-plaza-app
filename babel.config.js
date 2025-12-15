module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@modules': './src/modules',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
