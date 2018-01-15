const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const del = require('del');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');

const xPlatform = require('./config/x-platform');

const config = xPlatform.specialEnvList.map(env => env.remark);

const pagePath = 'shared';

gulp.task('clean', (cb) => {
  del.sync(['dist']);
  cb();
});

gulp.task('copyServerCodeToDist', () =>
  gulp.src('./server/**/*')
    .pipe(gulpif(file => file.history[0].endsWith('.js'), babel()))
    .pipe(gulpif(file => file.history[0].endsWith('.js'), uglify()))
    .pipe(gulp.dest('./dist/server'))
);

gulp.task('copyConfigToDist', () =>
  gulp.src('./config/**/*')
    .pipe(gulpif(file => file.history[0].endsWith('.js'), babel()))
    .pipe(gulpif(file => file.history[0].endsWith('.js'), uglify()))
    .pipe(gulp.dest('./dist/config'))
);

gulp.task('copy', ['copyServerCodeToDist', 'copyConfigToDist'], () => {
  const platforms = config.concat('shared');

  const streams = platforms.map(platform =>
    gulp.src(path.join(pagePath, '/**/*'))
      .pipe(gulpif(file => file.history[0].endsWith('.js'), babel()))
      .pipe(gulpif(file => file.history[0].endsWith('.js'), uglify()))
      .pipe(gulp.dest(`./dist/${platform}`))
  );

  return merge(streams);
});

gulp.task('removePlatformSpCode', ['copy'], (cb) => {
  del.sync(['dist/*/pages/**/*.*.js']);
  cb();
});

gulp.task('copySpCode', ['removePlatformSpCode'], () => {
  const platforms = config;

  const streams = platforms.map(platform =>
    gulp.src(`${pagePath}/pages/**/*.${platform}.js`)
      .pipe(rename((file) => {
        file.basename = file.basename.substr(0, file.basename.indexOf('.'));
      }))
      .pipe(gulpif(file => file.history[0].endsWith('.js'), babel()))
      .pipe(gulpif(file => file.history[0].endsWith('.js'), uglify()))
      .pipe(gulp.dest(`./dist/${platform}/pages`))
  );

  return merge(streams);
});

gulp.task('default', ['clean', 'copySpCode']);
