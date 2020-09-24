const { merge } = require('webpack-merge');
const path = require('path');
const parts = require('./config/webpack.parts');
const pagesConfig = require('./config/webpack.pages');
const devConfig = require('./config/webpack.dev');
const prodConfig = require('./config/webpack.prod');
const pathConfig = require('./webpack.paths');

const commonConfig = merge([
  {
    entry: {
      app: [pathConfig.PATHS.app],
    },
    resolve: {
      modules: [
        'node_modules',
        'src', // <-- your images folder contained here
      ],
    },
  },
  parts.loadPug({
    options: {
      pretty: true,
    },
  }),
]);

module.exports = (mode) => {
  console.log(`============= mode => ${mode} =============`);

  const modeConfig = mode === 'production' ? prodConfig : devConfig;
  return pagesConfig.map((page) => merge(commonConfig, modeConfig, page, { mode }));
};
