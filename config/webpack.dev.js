const { merge } = require('webpack-merge');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const parts = require('./webpack.parts');

const developmentConfig = merge([
  {
    bail: true,
    watchOptions: {
      ignored: /\/node_modules\/.*/,
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new ErrorOverlayPlugin(),
    ],
  },
  parts.setEnvVariables({
    'process.env': {
      NODE_ENV: '"development"',
      styleguideEnabled: true,
    },
  }),
  parts.devServer({
    host: process.env.HOST,
    port: 1234,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = developmentConfig;
