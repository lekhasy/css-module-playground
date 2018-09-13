const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './Index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader?importLoader=1&modules&localIdentName=src-[path]___[name]__[local]___[hash:base64:5]',
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'build')
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'public'
            }
        ], {}),
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "chunk.css"
        })
    ]
}
