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

/**
 * Assets
 */
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        include,
        exclude,
        use: [
          {
            loader: 'url-loader',
            options,
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
});
