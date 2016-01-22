var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var pathToJquery = path.resolve(node_modules_dir, 'jquery/dist/jquery.min.js');

var pkg = '';  //如“pkg/”

var config = {
    entry: {
        app: path.resolve(__dirname, 'app/main.js'),
        commons: ['react']
    },
    output: {
        path: path.resolve(__dirname, 'dist'), //for saving the fonts
        filename: pkg+'[name].[hash:8].js'//// 生成的打包文件名
    },
    resolve: {
        alias: {
            'jquery': path.resolve(node_modules_dir, 'jquery/dist/jquery.min.js'), //这样require('jquery')就直接请求到这个指定的js
        }
    },
    module: {
        loaders: [
            {test: /\.jsx?$/,exclude: [node_modules_dir],loader: 'babel'},
            {test: /\.(jpg|png|gif)$/, loader: "url?limit=2048&name=[path][name].[hash:8].[ext]"},
            {test: /\.scss/,loader: ExtractTextPlugin.extract('css!sass')}
        ]
    },
    //更多插件请看http://webpack.github.io/docs/list-of-plugins.html
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('commons', pkg+'commons.[hash:8].js'),
        new ExtractTextPlugin(pkg+'all.[hash:8].css', {allChunks: true}),
        new webpack.optimize.DedupePlugin(),  //查找相等或近似的模块，避免在最终生成的文件中出现重复的模块。
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),  //按引用频度来排序 ID，以便达到减少文件大小的效果
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        //要不要把jquery打包进去？这里注释掉因为我在index.html里引入了
        //new webpack.ProvidePlugin({
        //    jQuery: "jquery",
        //    $: "jquery"
        //}),
        new HtmlWebpackPlugin({
            filename: 'index.html', //生成的html路径及名称
            template: 'build/index_production.html', //向index.html里面插入entry[key].js and ExtractTextPlugin(all.css)
            inject: 'body'
        })
    ],

    noParse: [pathToJquery]  //需要确定该模块没有新的依赖，webpack 将不再扫描这个文件中的依赖。
};

module.exports = config;

