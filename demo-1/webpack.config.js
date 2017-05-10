const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app:'./src/app.js',
        content:'./src/content.js'

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        stats: "errors-only"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Project 101233',
            hash: true,
            excludeChunks:['content'],
            template: './src/index.html',
        }),
         new HtmlWebpackPlugin({
            title: 'Project demo',
            hash: true,
            chunks:['content'],
            filename:'content.html',
            template: './src/content.html',
        }),
        new ExtractTextPlugin("app.css")
    ]
}