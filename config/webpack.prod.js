const { merge } = require('webpack-merge');
const path = require('path');
const pathConfig = require('../webpack.paths');
const parts = require('./webpack.parts');

const productionConfig = merge([
  {
    bail: false,
    output: {
      chunkFilename: 'js/[name].[chunkhash:5].js',
      filename: 'js/[name].[chunkhash:5].js',
      path: pathConfig.PATHS.build,
      pathinfo: false,
      // Should turn on if upload to GitHub Pages
      // publicPath: '/app-iWatcHome/',
    },
  },
  parts.loadImages({
    options: {
      limit: 1000,
      name: 'images/[name].[hash:5].[ext]',
    },
  }),
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
      runtimeChunk: {
        name: 'manifest',
      },
    },
  },
]);

module.exports = productionConfig;
