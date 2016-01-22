var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

config = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: "http://localhost:8080/"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/,loader: 'babel'},
            { test: /\.css$/, loader: 'style!css'},
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery"
        })

    ]
};

module.exports = config;