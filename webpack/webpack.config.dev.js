const host = 'localhost';
const port = '4000';
var webpack = require('webpack')
const path = require('path');
const distPath = path.join(__dirname,'/../','dist' );

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    context: __dirname+ '/..',
    progress: true,
    entry: [
        'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
        "./src/App/App.js"
    ],
    output: {
        path: distPath,
        filename: "bundle.js",
        publicPath: 'http://' + host + ':' + port + "/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {from: './assets', to: distPath}
        ])
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, '../','src')
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};


// {
//     test: /\.scss$/,
//     loader: 'style-loader!raw-loader!sass-loader'
//     + '?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')
//     + '&includePaths[]=' + path.resolve(__dirname, './sass-assets')
//     + '!'+ path.resolve(__dirname, './src/_config/loaders/inject-global-scss.js') + '?env=dev'
// }