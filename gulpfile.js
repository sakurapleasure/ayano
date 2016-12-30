var gulp = require("gulp")
var ts = require("gulp-typescript")
var rimraf = require('rimraf')

gulp.task("build:typescript",function(){
    gulp.src("src/**/*.ts")
    .pipe(ts({
        module: "commonjs",
        target: "ES6"
    }))
    .pipe(gulp.dest("dest/"))
})
gulp.task("build:copy",function(){
    gulp.src("src/**/*.jade")
    .pipe(gulp.dest("dest/"))
})
gulp.task("clean",function(callback){
    rimraf('dest/',callback)
})
gulp.task("build",["build:typescript","build:copy"])
gulp.task("watch",function(){
    gulp.watch("src/**/*.ts",["build:typescript"])
    gulp.watch("src/**/*.jade",["build:copy"])
})