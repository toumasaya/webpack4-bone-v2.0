const parts = require('./webpack.parts');
const pathConfig = require('../webpack.paths');

const pagesConfig = [
  parts.page({
    title: 'Webpack4 bone v2.0',
    template: `${pathConfig.PATHS.app}/views/index.pug`,
    filename: 'index.html',
    minify: {
      removeScriptTypeAttributes: true,
    },
  }),
];

module.exports = pagesConfig;
