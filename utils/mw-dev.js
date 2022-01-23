const morgan = require('morgan');
const webpack = require('webpack');
const webpackMw = require('webpack-dev-middleware');
const webpackCfg = require('../webpack.config');

module.exports = app => {
    app.use(morgan('dev'));
    app.use(
        webpackMw(webpack(webpackCfg), {
            publicPath: '/assets',
        })
    );
};
