const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const context = path.resolve(__dirname, 'src');

module.exports = {
    context: context,
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
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            sourceMap: true,
                            localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'build')
    },
    devtool: "inline-source-map", // inlines SourceMap into original file
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
