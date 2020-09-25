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
 * Styles
 */
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        include,
        exclude,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
    ],
  },
});

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:5].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          include,
          exclude,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
              },
            },
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};

const PurgecssPlugin = require('purgecss-webpack-plugin');

exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurgecssPlugin({
      paths,
    }),
  ],
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()],
  },
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

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader?cacheDirectory',
      },
    ],
  },
});

/**
 * Optimizing
 */
const TerserPlugin = require('terser-webpack-plugin');

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
});

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});
