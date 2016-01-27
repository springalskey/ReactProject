var gulp = require("gulp");
var gutil = require("gulp-util");
var clean = require('gulp-clean'); //清除
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config");
var gulpWebpack = require('gulp-webpack');
gulp.task("default", ["webpack-dev-server"]);

gulp.task("webpack-dev-server", function(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "source-map";
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig)).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        else gutil.log("[webpack-dev-server]", "http://localhost:8080/build/index.html");
    });

    gulp.watch(["app/**",'build/**'], ['build']);

});


gulp.task("build",function(){
    gulp.src('app/**')
        .pipe(gulpWebpack(require('./webpack.production.config.js') ))
        .pipe(gulp.dest('dist/'));

    gulp.src(["build/*","!build/*.html"])
        .pipe(gulp.dest('dist/'));
});


gulp.task("cleanDist",function(){
    gulp.src("dist",{read: false})
        .pipe(clean());
});





