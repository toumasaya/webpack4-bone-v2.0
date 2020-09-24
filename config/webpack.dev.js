const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const parts = require('./webpack.parts');

const developmentConfig = merge([
  {
    bail: true,
    watchOptions: {
      ignored: /\/node_modules\/.*/,
    },
    plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  },
  parts.devServer({
    host: process.env.HOST,
    port: 1234,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = developmentConfig;
