/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts:
        process.env.MY_APP_MODE === 'mocked'
          ? [...sourceExts, 'mock.ts', 'svg']
          : [...sourceExts, 'svg'],
      resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
    },
  };
})();
