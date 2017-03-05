var gulp = require('gulp');
var sass = require('gulp-sass');
var svgSprite = require("gulp-svg-sprites");

gulp.task('default', function(){
    //
});

gulp.task('sass', function () {
    return gulp.src('assets/sass/*.scss')
        .pipe(sass({
            // outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('sprites', function () {
    return gulp.src('./assets/svg/*.svg')
        .pipe(svgSprite({
            preview: false,
            cssFile: './assets/sass/_sprite.scss',
            svg: {
                sprite: './img/sprite.svg'
            },
            svgPath: '../img/sprite.svg',
            selector: 'icon-%f',
        }))
        .pipe(gulp.dest("."));
});

gulp.task('watch', function () {
    gulp.watch('assets/sass/*.scss', ['sass']);
});
