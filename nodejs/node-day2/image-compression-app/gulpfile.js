import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';

gulp.task('compress', function() {
    return gulp.src('uploads/**/*')
    .pipe(imagemin())
    .pipe(rename({ extname: '.jpg' })) 
    .pipe(gulp.dest('compressed'));
});
