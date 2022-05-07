const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/game.js'),
    output:
    {
        hashFunction: 'xxhash64',
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
        [
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../static') }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/game.html'),
                minify: true
            }),
            new MiniCSSExtractPlugin()
        ],
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use:
                        [
                            'html-loader'
                        ]
                },

                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            'babel-loader'
                        ]
                },

                // CSS
                {
                    test: /\.css$/,
                    exclude: /node_modules/, // webpack is aware of the minified, uglified js and knows to grab that file, so we can exclude it here
                    use: ['style-loader', 'css-loader'],
                },

                // Images
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/images/[hash][ext]'
                    }
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/fonts/[hash][ext]'
                    }
                }
            ]
    }
}
