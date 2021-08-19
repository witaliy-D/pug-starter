import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import gulpif from 'gulp-if';
import replace from 'gulp-replace';
import debug from 'gulp-debug';
import yargs from 'yargs';
import pugLinter from 'gulp-pug-linter';
import notify from 'gulp-notify';
import config from '../config';

const dir = config.dir;

const argv = yargs.argv;
const production = !!argv.production;

const prettyOption = {
  // eslint-disable-next-line camelcase
  indent_size: 2,
  // eslint-disable-next-line camelcase
  indent_char: ' ',
  unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br'],
  // eslint-disable-next-line camelcase
  content_unformatted: []
};

gulp.task('pug', () => {
  const onError = function (err) {
    notify.onError({
      title: 'Error in pug task',
      message: 'Error: <%= error.message %>',
      sound: 'Beep'
    })(err);
    this.emit('end');
  };
  return gulp.src(dir.pages)
    .pipe(plumber({errorHandler: onError}))
    .pipe(pug())
    .pipe(prettyHtml(prettyOption))
    .pipe(gulpif(production, replace('.css', '.min.css')))
    .pipe(gulpif(production, replace('.js', '.min.js')))
    .pipe(debug({title: 'pug'}))
    .pipe(gulp.dest(dir.dist));
});

gulp.task('pugFast', () => {
  const onError = function (err) {
    notify.onError({
      title: 'Error in pug task',
      message: 'Error: <%= error.message %>',
      sound: 'Beep'
    })(err);
    this.emit('end');
  };
  return gulp.src(dir.pages, {since: gulp.lastRun('pugFast')})
    .pipe(plumber({errorHandler: onError}))
    .pipe(pug())
    .pipe(prettyHtml(prettyOption))
    .pipe(gulpif(production, replace('.css', '.min.css')))
    .pipe(gulpif(production, replace('.js', '.min.js')))
    .pipe(debug({title: 'pug'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('pugLint', () => (
  gulp
    .src('src/**/*.pug')
    .pipe(pugLinter({reporter: 'default'}))
));
