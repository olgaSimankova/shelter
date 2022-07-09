const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            { test: /\.ts$/i, use: 'ts-loader', exclude: /node_modules/},
        ],
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
    ],
};

// module.exports = ({ mode }) => {
//     const isProductionMode = mode === 'prod';
//     const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

//     return merge(baseConfig, envConfig);
// };