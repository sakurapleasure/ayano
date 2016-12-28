var gulp = require("gulp")
var ts = require("gulp-typescript")
var rimraf = require('rimraf')

gulp.task("build:typescript",["clean"],function(){
    gulp.src("src/**/*.ts")
    .pipe(ts({
        module: "commonjs",
        target: "ES6"
    }))
    .pipe(gulp.dest("dest/"))
})
gulp.task("clean",function(callback){
    rimraf('dest/',callback)
})
gulp.task("build",["clean","build:typescript"]) 