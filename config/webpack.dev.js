const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
// const HMR = helpers.hasProcessFlag('hot');
process.env.URL = 'http://' + HOST + ':' + PORT + '/';
// process.env.BASEURL = 'http://localhost:8085/pmp';
const METADATA = {
    host: HOST,
    port: PORT,
    ENV: ENV,
    url: process.env.URL,
    // HMR: HMR
};

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: METADATA.url,
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: { configFile: './tslint.json' }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
