
const   gulp    = require('gulp'),
        eslint  = require('gulp-eslint'),
        mocha   = require('gulp-mocha');

const SOURCE = './src';

gulp.task('lint', function(){
    return gulp
        .src([SOURCE + '/*.js', SOURCE + '/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});
