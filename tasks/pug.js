import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pugItem from 'gulp-pug';
import prettyHtml from 'gulp-pretty-html';
import gulpif from 'gulp-if';
import replace from 'gulp-replace';
import debug from 'gulp-debug';
import pugLinter from 'gulp-pug-linter';
import notify from 'gulp-notify';

import {config}from '../config.js';

const dir = config.dir;

const production = !!process.argv.includes('--production');

const prettyOption = {
  // eslint-disable-next-line camelcase
  indent_size: 2,
  // eslint-disable-next-line camelcase
  indent_char: ' ',
  unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br'],
  // eslint-disable-next-line camelcase
  content_unformatted: []
};

export const pug = () => {
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
    .pipe(pugItem())
    .pipe(prettyHtml(prettyOption))
    .pipe(gulpif(production, replace('.css', '.min.css')))
    .pipe(gulpif(production, replace('.js', '.min.js')))
    .pipe(debug({title: 'pug'}))
    .pipe(gulp.dest(dir.dist));
};

export const pugFast = () => {
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
    .pipe(gulp.dest(dir.dist));
};

export const pugLint = () => (
  gulp.src('src/**/*.pug')
    .pipe(pugLinter({reporter: 'default'}))
);
