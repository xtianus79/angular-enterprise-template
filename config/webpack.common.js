const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const { AotPlugin } = require('@ngtools/webpack');

// const test = require('!style!css!sass!./test.scss');

// console.log('test = ' + test);

// const path = require('path');

// const sassLoaders = [
//   'css-loader',
//   'postcss-loader',
//   'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, '../src')
// ];

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['*', '.ts', '.js', 'scss', 'sass', '.json']
    },

    module: {
        loaders: [
            // {
            //     test: /\.ts$/,
            //     use: ['awesome-typescript-loader', 'angular2-template-loader']
            // },
            
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.(scss|sass)$/,
                include: helpers.root('src/app'),
                exclude: [/\.global\.(scss|sass)$/, 'src'],
                use: ['raw-loader?sourceMap', 'sass-loader?sourceMap']
            },
            {
                test: /\.(scss|sass)$/,
                exclude: helpers.root('src/app'),
                use: ExtractTextPlugin.extract({
                    fallback: 'isomorphic-style-loader',
                    use: 'css-loader?sourceMap!sass-loader?sourceMap'
                })
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src/app'),
                use: ExtractTextPlugin.extract({
                    fallback: 'isomorphic-style-loader',
                    use: 'css-loader?sourceMap' 
                })
            },
            {
                test: /\.css$/,
                include: helpers.root('src/app'),
                use: 'raw-loader'
            },
            {
                test: /\.ts$/,
                use: '@ngtools/webpack',
            }
        ]
    },

    plugins: [
        new CheckerPlugin(),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('src') // location of your src
        ),

        new webpack.EnvironmentPlugin([
            "NODE_ENV",
            "URL",
            "BASEURL"
        ]), 

        new AotPlugin({
            mainPath: 'src/main.ts',
            entryModule: helpers.root('src/app/app.module#AppModule'),
            tsConfigPath: 'tsconfig.json'
        })

    ]
};
