const webpack = require('webpack');
const opn = require('opn');

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

let config = {
    entry: ['./src/main.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        chunkFilename: 'chunk/[name].[chunkhask].js',
        publicPath: 'dist/'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.(png|gif)$/,
                loader: 'url-loader'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
    
            {
                test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader'
                ]
            },
            {
                test: /\.scss/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[path]__[name]__[local]___[hash:base64:5]',
                    'sass-loader?sourceMap'
                ]
            }
        ]
    },
    plugins: [
        // 设置开发环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        }),
        // 设置热更新
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('index.css')
    ],
    devServer: {
        host: '127.0.0.1',
        port: 8083,
        hot: true,
        inline: true,
        proxy:{
            '/server':{
                target: 'http://192.168.1.144:7001',
                changeOrigin: true,
                secure: false,
                pathRewrite:{
                    '^/server': ''
                }
            }
        },
        after() {
            opn('http://localhost:'+ this.port, {app: 'chrome'})
        }
    }
};

module.exports = config;