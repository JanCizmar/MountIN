"use strict";

const webpack            = require('webpack');
const path               = require('path');
const ExtractTextPlugin  = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
    entry: {
        'vendor': ['react','react-dom','react-router-dom'],
        'app': path.resolve(__dirname,'src/index.js')
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'scripts/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-2']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|ico)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            },

        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", minChunks: Infinity,}),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin("styles/app.css")
    ]
};