const webpack = require('webpack');
const path = require('path');

/**
 * Server
 */
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: false,
    overlay: false,
    hot: true,
  },
});

/**
 * Views
 */
exports.loadPug = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(pug)$/,
        include,
        exclude,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
          {
            loader: 'pug-html-loader',
            options,
          },
        ],
      },
    ],
  },
});

const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.page = ({
  filename,
  template = require.resolve('./app/views/index.pug'),
  title,
  minify,
  syncScript = '',
  deferScript = '',
} = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      filename,
      template,
      title,
      minify,
    }),
  ],
});
