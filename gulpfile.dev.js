const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');
const del = require('del');
const rename = require("gulp-rename");
const gulpif = require('gulp-if');
const changed = require('gulp-changed');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const nodemon = require('gulp-nodemon');
// const Pie = require('za-pie');
// const xconfig = require('./config/x-platform');

// const app = new Pie(path.resolve(__dirname, 'dist'), xconfig);

const xPlatform = require('./config/x-platform');
const webpackConfig = require('./webpack/webpack.dev');

const config = xPlatform.specialEnvList.map(env => env.remark);

const pagePath = 'shared';

gulp.task('clean', (cb) => {
  del.sync(['dist']);
  cb();
});

gulp.task('copyServerCodeToDist', () =>
  gulp.src('./server/**/*')
    .pipe(changed('./dist'))
    // .pipe(gulpif(file => file.history[0].endsWith('.js'), babel()))
    // .pipe(gulpif(file => file.history[0].endsWith('.js'), uglify()))
    .pipe(gulp.dest('./dist/server'))
);

gulp.task('copyConfigToDist', () =>
  gulp.src('./config/**/*')
    .pipe(changed('./dist'))
  //   .pipe(gulpif(file => file.history[0].endsWith('.js'), babel()))
  //   .pipe(gulpif(file => file.history[0].endsWith('.js'), uglify()))
    .pipe(gulp.dest('./dist/config'))
);

gulp.task('copy', () => {
  const platforms = config.concat('shared');

  const streams = platforms.map(platform =>
    gulp.src(path.join(pagePath, '/**/*'))
      .pipe(changed('./dist'))
      // .pipe(gulpif(file => file.history[0].endsWith('.js'), babel()))
      // .pipe(gulpif(file => file.history[0].endsWith('.js'), uglify()))
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
      .pipe(changed('./dist'))
      .pipe(rename((file) => {
        file.basename = file.basename.substr(0, file.basename.indexOf('.'));
      }))
      // .pipe(gulpif(file => file.history[0].endsWith('.js'), babel()))
      // .pipe(gulpif(file => file.history[0].endsWith('.js'), uglify()))
      .pipe(gulp.dest(`./dist/${platform}/pages`))
  );

  return merge(streams);
});

gulp.task('webpackDevServer', ['copySpCode'], () => {
  // new WebpackDevServer(webpack(webpackConfig)).listen(8080);
  // const app = require('./dist/server/bin/dev');
  // app.startUp();
  const stream = nodemon({
    script: './dist/server/bin/dev.js',
    watch: ['./dist/server', './dist/config', './webpack']
  });

  stream
    .on('restart', () => {
      console.log('restarted!');
    })
    .on('crash', () => {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10) ; // restart the server in 10 seconds
    });
});

gulp.task('watch', () => {
  gulp.watch('./server/**/*', ['copyServerCodeToDist']);
  gulp.watch('./config/**/*', ['copyConfigToDist']);
  gulp.watch('./shared/**/*', ['copySpCode']);
});

gulp.task('default', ['clean', 'copyServerCodeToDist', 'copyConfigToDist', 'webpackDevServer', 'watch']);
