const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

// Add support for SVG files
config.transformer = {
...transformer,
babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
...resolver,
assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
sourceExts: [...resolver.sourceExts, 'svg'],
};

// Add src/assets to the asset include patterns
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'webp');
// config.watchFolders = [...(config.watchFolders || []), './src/assets'];

// Firebase compatibility fixes for Expo SDK 53
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

return config;
})();