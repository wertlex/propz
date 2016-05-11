
const   gulp    = require('gulp'),
        eslint  = require('gulp-eslint'),
        mocha   = require('gulp-mocha');

const   SOURCE      = './src',
        TEST_SOURCE = './test';

gulp.task('lint', function(){
    return gulp
        .src([SOURCE + '/*.js', SOURCE + '/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('lint-test', function(){
    return gulp
        .src([TEST_SOURCE + '/*.js', TEST_SOURCE + '/**/*.js'] )
        .pipe(eslint())
        .pipe(eslint.format());
});