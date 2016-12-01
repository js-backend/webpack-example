'use strict';

// command:
// set NODE_ENV=production or NODE_ENV=development
// set webpack
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);

module.exports = {
    context: __dirname + '/frontend',
    entry: {
        home: './home',
        about: './about'
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].js',
        library: '[name]'
    },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ],

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }]
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // do not show unreachable variables
                warnings:       false,
                drop_console:   true,
                unsafe:         true
            }
        })
    );
}