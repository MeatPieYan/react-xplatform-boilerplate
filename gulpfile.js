const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');

gulp.task('default', () => {
  gulp.src('./shared/**/*')
    .pipe(gulpif((file) => (file.history[0].endsWith('.js')), babel()))
    .pipe(gulp.dest('./dist/shared'));

  gulp.src('./server/**/*')
    .pipe(gulpif((file) => (file.history[0].endsWith('.js')), babel()))
    .pipe(gulp.dest('./dist/server'));
});
