const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.ts'),
    module: {
        rules: [
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.ts$/i, use: 'ts-loader' },
          { test: /\.html$/i, use: ["html-loader"] },
          {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[ext]'
            }
        }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js'],
    },
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
      },
      plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' })
      ],
      stats: {children: true},
      devServer: {
        static: {
          directory: path.join(__dirname, './dist'),
        },
        compress: true,
        port: 8080,
      },
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}